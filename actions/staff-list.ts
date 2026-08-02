"use server";

import prisma from "@/lib/db";

export async function getStaffList(schoolId: string) {
  try {
    const staff = await prisma.staff.findMany({
      where: { schoolId },
      include: {
        user: {
          select: { firstName: true, lastName: true, email: true, role: true, phone: true }
        }
      },
      orderBy: { joiningDate: 'desc' }
    });
    return { success: true, data: staff };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
