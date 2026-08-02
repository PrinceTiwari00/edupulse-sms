"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";

export async function createGlobalNotice(data: {
  title: string;
  content: string;
  targetRoles: UserRole[];
}) {
  try {
    const notice = await prisma.notice.create({
      data: {
        title: data.title,
        content: data.content,
        targetRoles: data.targetRoles,
        isGlobal: true,
      },
    });

    revalidatePath("/super-admin/notices");
    return { success: true, data: notice };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getGlobalNotices() {
  try {
    const notices = await prisma.notice.findMany({
      where: { isGlobal: true },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: notices };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteNotice(id: string) {
  try {
    await prisma.notice.delete({
      where: { id }
    });
    revalidatePath("/super-admin/notices");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
