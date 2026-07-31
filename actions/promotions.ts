"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function promoteStudents(data: {
  studentIds: string[];
  targetClassId: string;
  targetSectionId: string;
  targetAcademicYearId: string;
  schoolId: string;
}) {
  try {
    // We use a transaction to ensure all students are updated or none
    const result = await prisma.$transaction(
      data.studentIds.map((studentId) =>
        prisma.student.update({
          where: { 
            id: studentId,
            schoolId: data.schoolId // Multi-tenant safety
          },
          data: {
            classId: data.targetClassId,
            sectionId: data.targetSectionId,
            academicYearId: data.targetAcademicYearId,
          },
        })
      )
    );

    revalidatePath("/admin/students");
    return { success: true, count: result.length };
  } catch (error: any) {
    console.error("Promotion failed:", error);
    return { success: false, error: error.message };
  }
}
