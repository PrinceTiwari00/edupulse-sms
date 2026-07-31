"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createFeeGroup(data: {
  name: string;
  amount: number;
  schoolId: string;
}) {
  try {
    const feeGroup = await prisma.feeGroup.create({
      data: {
        name: data.name,
        amount: data.amount,
        schoolId: data.schoolId,
      },
    });
    revalidatePath("/admin/finance/setup");
    return { success: true, data: feeGroup };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function generateBulkInvoices(data: {
  classId: string;
  feeGroupId: string;
  dueDate: Date;
  schoolId: string;
}) {
  try {
    const students = await prisma.student.findMany({
      where: { classId: data.classId, schoolId: data.schoolId },
    });

    const feeGroup = await prisma.feeGroup.findUnique({
      where: { id: data.feeGroupId }
    });

    if (!feeGroup) throw new Error("Fee group not found");

    const invoices = await prisma.$transaction(
      students.map(student => prisma.invoice.create({
        data: {
          invoiceNumber: `INV-${Date.now()}-${student.id.slice(-4)}`,
          studentId: student.id,
          feeGroupId: data.feeGroupId,
          schoolId: data.schoolId,
          amount: feeGroup.amount,
          dueDate: data.dueDate,
          status: "UNPAID",
        }
      }))
    );

    revalidatePath("/admin/finance/billing");
    return { success: true, count: invoices.length };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
