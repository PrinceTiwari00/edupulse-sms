"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { SubscriptionPlan, PaymentMode } from "@prisma/client";

// --- PLAN MANAGEMENT ---

export async function getSaaSPlans() {
  try {
    const plans = await prisma.saaSPlan.findMany({
      orderBy: { price: 'asc' }
    });
    return { success: true, data: plans };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateSaaSPlanPrice(plan: SubscriptionPlan, price: number) {
  try {
    const updated = await prisma.saaSPlan.upsert({
      where: { name: plan },
      update: { price },
      create: { name: plan, price }
    });
    revalidatePath("/super-admin/billing");
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- PROMO CODES ---

export async function createPromoCode(data: {
  code: string;
  discount: number;
  isPercent: boolean;
}) {
  try {
    const promo = await prisma.promoCode.create({
      data: {
        code: data.code.toUpperCase(),
        discount: data.discount,
        isPercent: data.isPercent,
      }
    });
    revalidatePath("/super-admin/billing");
    return { success: true, data: promo };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getPromoCodes() {
  return await prisma.promoCode.findMany({ where: { isActive: true } });
}

export async function togglePromoStatus(id: string, isActive: boolean) {
  try {
    await prisma.promoCode.update({
      where: { id },
      data: { isActive }
    });
    revalidatePath("/super-admin/billing");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePromoCode(id: string) {
  try {
    await prisma.promoCode.delete({ where: { id } });
    revalidatePath("/super-admin/billing");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- INVOICING ---

export async function generateSaaSInvoice(data: {
  schoolId: string;
  planName: SubscriptionPlan;
  promoCode?: string;
  dueDate: Date;
}) {
  try {
    const plan = await prisma.saaSPlan.findUnique({ where: { name: data.planName } });
    const school = await prisma.school.findUnique({ where: { id: data.schoolId } });

    if (!plan) throw new Error("Plan pricing not configured.");
    if (!school) throw new Error("School not found.");

    let discount = 0;
    if (data.promoCode) {
      const promo = await prisma.promoCode.findUnique({ where: { code: data.promoCode.toUpperCase(), isActive: true } });
      if (promo) {
        discount = promo.isPercent ? (Number(plan.price) * Number(promo.discount)) / 100 : Number(promo.discount);
      }
    }

    // --- WALLET LOGIC ---
    // Automatically apply available wallet balance as credit
    const walletCredit = Math.min(Number(school.walletBalance), Number(plan.price) - discount);
    const finalPayable = Math.max(0, Number(plan.price) - discount - walletCredit);

    const invoice = await prisma.subscriptionInvoice.create({
      data: {
        invoiceNumber: `SAAS-INV-${Date.now()}`,
        schoolId: data.schoolId,
        amount: plan.price,
        discount: discount + walletCredit, // Total discount includes wallet credit used
        totalAmount: finalPayable,
        dueDate: data.dueDate,
        status: finalPayable === 0 ? "PAID" : "UNPAID",
        billingItems: [
          { name: `${data.planName} Annual Subscription`, price: Number(plan.price) },
          { name: "Wallet Credit Applied", price: -walletCredit }
        ]
      }
    });

    if (walletCredit > 0) {
      await prisma.school.update({
        where: { id: data.schoolId },
        data: { walletBalance: Number(school.walletBalance) - walletCredit }
      });
    }

    revalidatePath("/super-admin/billing");
    return { success: true, data: invoice };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function collectSubscriptionPayment(data: {
  invoiceId: string;
  amount: number;
  mode: PaymentMode;
  reference?: string;
  manualDiscount?: number;
}) {
  try {
    const payment = await prisma.$transaction(async (tx) => {
      // 1. Apply manual discount if provided
      if (data.manualDiscount && data.manualDiscount > 0) {
        const inv = await tx.subscriptionInvoice.findUnique({ where: { id: data.invoiceId } });
        if (inv) {
          await tx.subscriptionInvoice.update({
            where: { id: data.invoiceId },
            data: {
              discount: Number(inv.discount) + data.manualDiscount,
              totalAmount: Math.max(0, Number(inv.totalAmount) - data.manualDiscount)
            }
          });
        }
      }

      // 2. Fetch the invoice to calculate current state
      const invoice = await tx.subscriptionInvoice.findUnique({
        where: { id: data.invoiceId },
        include: { payments: true }
      });

      if (!invoice) throw new Error("Invoice not found");

      const totalPaidAlready = invoice.payments.reduce((acc, curr) => acc + Number(curr.amount), 0);
      const remainingDuesBeforeThis = Number(invoice.totalAmount) - totalPaidAlready;

      // 3. Create the payment record with the FULL amount provided
      const p = await tx.subscriptionPayment.create({
        data: {
          invoiceId: data.invoiceId,
          amount: data.amount, // Record the full amount received
          mode: data.mode,
          reference: data.reference,
          receiptNumber: `SAAS-RCP-${Date.now()}`,
        }
      });

      // 4. Handle Surplus (Advance)
      if (data.amount > remainingDuesBeforeThis) {
        const surplus = data.amount - remainingDuesBeforeThis;
        await tx.school.update({
          where: { id: invoice.schoolId },
          data: { walletBalance: { increment: surplus } }
        });
      }

      // 5. Update Invoice Status
      const finalPaidTotal = totalPaidAlready + data.amount;
      if (finalPaidTotal >= Number(invoice.totalAmount)) {
        await tx.subscriptionInvoice.update({
          where: { id: data.invoiceId },
          data: { status: "PAID" }
        });
        
        await tx.school.update({
          where: { id: invoice.schoolId },
          data: { 
            plan: invoice.plan,
            subscriptionExpiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            isActive: true 
          }
        });
      } else if (finalPaidTotal > 0) {
        await tx.subscriptionInvoice.update({
          where: { id: data.invoiceId },
          data: { status: "PARTIAL" }
        });
      }

      return p;
    });

    revalidatePath("/super-admin/billing");
    return { success: true, data: payment };
  } catch (error: any) {
    console.error("Payment Collection Error:", error);
    return { success: false, error: error.message };
  }
}

// --- ANALYTICS ---

export async function getPlatformRevenueNPR() {
  try {
    const [payments, invoices] = await Promise.all([
      prisma.subscriptionPayment.aggregate({
        _sum: { amount: true }
      }),
      prisma.subscriptionInvoice.aggregate({
        _sum: { totalAmount: true }
      })
    ]);
    
    const totalCollected = Number(payments._sum.amount || 0);
    const totalPayable = Number(invoices._sum.totalAmount || 0);
    
    return {
      totalCollected,
      totalPending: Math.max(0, totalPayable - totalCollected)
    };
  } catch (error) {
    return { totalCollected: 0, totalPending: 0 };
  }
}

export async function getSaaSInvoices() {
  try {
    const invoices = await prisma.subscriptionInvoice.findMany({
      include: {
        school: { select: { name: true, address: true, email: true, phone: true } },
        payments: true,
        promoCode: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: invoices };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSaaSInvoiceById(id: string) {
  try {
    const invoice = await prisma.subscriptionInvoice.findUnique({
      where: { id },
      include: {
        school: { select: { name: true, address: true, email: true, phone: true, subdomain: true, panNumber: true, vatNumber: true } },
        payments: true,
        promoCode: true
      }
    });
    return { success: true, data: invoice };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteSaaSInvoice(id: string) {
  try {
    // Delete payments associated with the invoice first or use transaction
    await prisma.$transaction([
      prisma.subscriptionPayment.deleteMany({ where: { invoiceId: id } }),
      prisma.subscriptionInvoice.delete({ where: { id } })
    ]);
    revalidatePath("/super-admin/billing");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSubscriptionReceipts() {
  try {
    const payments = await prisma.subscriptionPayment.findMany({
      include: {
        invoice: {
          include: { school: { select: { name: true } } }
        }
      },
      orderBy: { date: 'desc' }
    });
    return { success: true, data: payments };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
