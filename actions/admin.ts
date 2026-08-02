"use server";

import prisma from "@/lib/db";

export async function getSchoolStats(schoolId: string) {
  try {
    const [totalStudents, totalStaff, totalClasses, revenueResult] = await Promise.all([
      prisma.student.count({ where: { schoolId } }),
      prisma.staff.count({ where: { schoolId } }),
      prisma.class.count({ where: { schoolId } }),
      prisma.invoice.aggregate({
        where: { schoolId, status: "PAID" },
        _sum: { amount: true },
      }),
    ]);

    const upcomingEvents = await prisma.notice.findMany({
      where: { schoolId, isGlobal: false },
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    return {
      success: true,
      data: {
        totalStudents,
        totalStaff,
        totalClasses,
        totalRevenue: Number(revenueResult._sum.amount || 0),
        upcomingEvents
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
