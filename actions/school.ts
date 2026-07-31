"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createSchool(data: {
  name: string;
  subdomain: string;
  email: string;
  address?: string;
}) {
  try {
    const school = await prisma.school.create({
      data: {
        name: data.name,
        subdomain: data.subdomain.toLowerCase(),
        email: data.email,
        address: data.address,
      },
    });

    revalidatePath("/super-admin/schools");
    return { success: true, data: school };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleSchoolStatus(id: string, isActive: boolean) {
  try {
    await prisma.school.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/super-admin/schools");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
