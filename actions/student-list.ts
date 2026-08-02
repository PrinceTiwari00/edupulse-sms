"use server";

import prisma from "@/lib/db";

export async function getStudents(schoolId: string) {
  try {
    const students = await prisma.student.findMany({
      where: { schoolId },
      include: {
        user: {
          select: { firstName: true, lastName: true, email: true }
        },
        class: {
          select: { name: true }
        },
        section: {
          select: { name: true }
        },
        parent: {
          include: {
            user: {
              select: { firstName: true, lastName: true }
            }
          }
        }
      },
      orderBy: { admissionNumber: 'asc' }
    });
    return { success: true, data: students };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
