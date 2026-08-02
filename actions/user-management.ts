"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";

export async function getSchoolUsers(schoolId: string) {
  try {
    const users = await prisma.user.findMany({
      where: { schoolId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: users };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createSchoolUser(data: {
  schoolId: string;
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}) {
  try {
    // 1. Check if username or email already exists
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { username: data.username },
          { email: data.email }
        ]
      }
    });

    if (existing) {
      throw new Error("Username or Email already in use.");
    }

    // 2. Hash password (default to 'password123' if not provided)
    const hashedPassword = await bcrypt.hash(data.password || "password123", 10);

    // 3. Create user
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        schoolId: data.schoolId,
      }
    });

    revalidatePath("/super-admin/schools");
    return { success: true, data: user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateSchoolUser(id: string, data: {
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
}) {
  try {
    const updateData: any = { ...data };
    
    // Hash new password if provided
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData
    });

    revalidatePath("/super-admin/schools");
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteSchoolUser(id: string) {
  try {
    // Do not allow deleting super admins from here for safety
    const user = await prisma.user.findUnique({ where: { id } });
    if (user?.role === "SUPER_ADMIN") {
      throw new Error("Cannot delete Super Admin from institutional manager.");
    }

    await prisma.user.delete({ where: { id } });
    revalidatePath("/super-admin/schools");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
