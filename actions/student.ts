"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Gender } from "@prisma/client";

export async function createStudent(data: {
  schoolId: string;
  firstName: string;
  lastName: string;
  email?: string;
  username: string;
  admissionNumber: string;
  classId: string;
  sectionId: string;
  academicYearId: string;
  dateOfBirth: Date;
  gender: Gender;
}) {
  try {
    // 1. Create User account for student
    const studentUser = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: "DefaultPassword123", // Should be hashed and changeable
        role: "STUDENT",
        schoolId: data.schoolId,
        studentProfile: {
          create: {
            admissionNumber: data.admissionNumber,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            schoolId: data.schoolId,
            classId: data.classId,
            sectionId: data.sectionId,
            academicYearId: data.academicYearId,
          },
        },
      },
    });

    revalidatePath("/admin/students");
    return { success: true, data: studentUser };
  } catch (error: any) {
    console.error("Error creating student:", error);
    return { success: false, error: error.message };
  }
}
