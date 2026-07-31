"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createSubject(data: {
  name: string;
  code: string;
  schoolId: string;
}) {
  try {
    const subject = await prisma.subject.create({
      data: {
        name: data.name,
        code: data.code,
        schoolId: data.schoolId,
      },
    });
    revalidatePath("/admin/academics/subjects");
    return { success: true, data: subject };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function mapSubjectToClass(subjectId: string, classId: string) {
  try {
    await prisma.class.update({
      where: { id: classId },
      data: {
        subjects: {
          connect: { id: subjectId }
        }
      }
    });
    revalidatePath("/admin/academics/subjects");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
