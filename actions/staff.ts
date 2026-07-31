"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createStaff(data: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  schoolId: string;
  designation: string;
  role: "TEACHER" | "ACCOUNTANT" | "SCHOOL_ADMIN";
}) {
  try {
    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: "hashed_password_here", // Placeholder
        role: data.role,
        schoolId: data.schoolId,
        staffProfile: {
          create: {
            designation: data.designation,
            schoolId: data.schoolId,
          }
        }
      }
    });
    revalidatePath("/admin/staff");
    return { success: true, data: user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
