"use server";

import prisma from "@/lib/db";

export async function getPlatformStats() {
  try {
    const [totalSchools, totalStudents, totalStaff, activeTenants, walletResult] = await Promise.all([
      prisma.school.count(),
      prisma.student.count(),
      prisma.staff.count(),
      prisma.school.count({ where: { isActive: true } }),
      prisma.school.aggregate({
        _sum: { walletBalance: true }
      })
    ]);

    // Calculate revenue (sum of paid invoices)
    const revenueResult = await prisma.invoice.aggregate({
      where: { status: "PAID" },
      _sum: { amount: true },
    });

    return {
      success: true,
      data: {
        totalSchools,
        totalStudents,
        totalStaff,
        activeTenants,
        totalRevenue: Number(revenueResult._sum.amount || 0),
        totalWalletBalance: Number(walletResult._sum.walletBalance || 0)
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSubscriptionAnalytics() {
  try {
    const plansCount = await prisma.school.groupBy({
      by: ['plan'],
      _count: { _all: true },
    });

    const recentInvoices = await prisma.invoice.findMany({
      take: 10,
      include: {
        school: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return {
      success: true,
      data: {
        plansCount: plansCount.map(p => ({ name: p.plan, count: p._count._all })),
        recentInvoices
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getAuditLogs(limit = 50) {
  try {
    const logs = await prisma.auditLog.findMany({
      take: limit,
      include: {
        user: {
          select: { username: true, role: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: logs };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
