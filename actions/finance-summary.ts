"use server";

import prisma from "@/lib/db";

export async function getFinanceSummary(schoolId: string) {
  try {
    const [totalCollectedResult, pendingFeesResult, recentCollections, feeGroups] = await Promise.all([
      prisma.invoice.aggregate({
        where: { schoolId, status: "PAID" },
        _sum: { amount: true },
      }),
      prisma.invoice.aggregate({
        where: { schoolId, status: "UNPAID" },
        _sum: { amount: true },
      }),
      prisma.invoice.findMany({
        where: { schoolId, status: "PAID" },
        take: 5,
        include: { student: { include: { user: { select: { firstName: true, lastName: true } } } } },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.feeGroup.findMany({
        where: { schoolId },
        include: { _count: { select: { invoices: true } } }
      })
    ]);

    return {
      success: true,
      data: {
        totalCollected: Number(totalCollectedResult._sum.amount || 0),
        pendingFees: Number(pendingFeesResult._sum.amount || 0),
        recentCollections,
        feeGroups: feeGroups.map(fg => ({
          name: fg.name,
          amount: fg.amount,
          count: fg._count.invoices
        }))
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
