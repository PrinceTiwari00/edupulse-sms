"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createClass(data: {
  name: string;
  schoolId: string;
  academicYearId: string;
}) {
  try {
    const newClass = await prisma.class.create({
      data: {
        name: data.name,
        schoolId: data.schoolId,
        academicYearId: data.academicYearId,
      },
    });
    revalidatePath("/admin/academics/classes");
    return { success: true, data: newClass };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createSection(data: {
  name: string;
  capacity: number;
  classId: string;
}) {
  try {
    const section = await prisma.section.create({
      data: {
        name: data.name,
        capacity: data.capacity,
        classId: data.classId,
      },
    });
    revalidatePath("/admin/academics/classes");
    return { success: true, data: section };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteClass(id: string, schoolId: string) {
  try {
    await prisma.class.delete({
      where: { id, schoolId },
    });
    revalidatePath("/admin/academics/classes");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
