"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { SubscriptionPlan, SchoolStatus } from "@prisma/client";

export async function createSchoolRequest(data: {
  name: string;
  subdomain: string;
  email: string;
  phone: string;
}) {
  try {
    const school = await prisma.school.create({
      data: {
        name: data.name,
        subdomain: data.subdomain.toLowerCase(),
        email: data.email,
        phone: data.phone,
        status: "PENDING",
        isActive: false,
      },
    });

    revalidatePath("/super-admin/requests");
    return { success: true, data: school };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, error: "Subdomain or Email already exists." };
    }
    return { success: false, error: error.message };
  }
}

export async function approveSchoolRequest(id: string) {
  try {
    await prisma.school.update({
      where: { id },
      data: { 
        status: "APPROVED",
        isActive: true,
      },
    });
    
    revalidatePath("/super-admin/requests");
    revalidatePath("/super-admin/schools");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function rejectSchoolRequest(id: string) {
  try {
    await prisma.school.update({
      where: { id },
      data: { status: "REJECTED" },
    });
    revalidatePath("/super-admin/requests");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getPendingRequests() {
  try {
    const requests = await prisma.school.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: requests };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSchools() {
  try {
    const schools = await prisma.school.findMany({
      include: {
        _count: {
          select: {
            students: true,
            staff: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, data: schools };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createSchool(data: {
  name: string;
  subdomain: string;
  email: string;
  address?: string;
  plan?: SubscriptionPlan;
}) {
  try {
    const school = await prisma.school.create({
      data: {
        name: data.name,
        subdomain: data.subdomain.toLowerCase(),
        email: data.email,
        address: data.address,
        plan: data.plan || "FREE",
        status: "APPROVED",
        isActive: true,
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

export async function updateSchoolPlan(id: string, plan: SubscriptionPlan) {
  try {
    await prisma.school.update({
      where: { id },
      data: { plan },
    });
    revalidatePath("/super-admin/schools");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateSchool(id: string, data: {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
}) {
  try {
    const updated = await prisma.school.update({
      where: { id },
      data,
    });
    revalidatePath("/super-admin/schools");
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function bulkToggleStatus(ids: string[], isActive: boolean) {
  try {
    await prisma.school.updateMany({
      where: { id: { in: ids } },
      data: { isActive },
    });
    revalidatePath("/super-admin/schools");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteSchool(id: string) {
  try {
    await prisma.$transaction([
      prisma.notice.deleteMany({ where: { schoolId: id } }),
      prisma.staff.deleteMany({ where: { schoolId: id } }),
      prisma.student.deleteMany({ where: { schoolId: id } }),
      prisma.subscriptionInvoice.deleteMany({ where: { schoolId: id } }),
      prisma.user.deleteMany({ where: { schoolId: id } }),
      prisma.school.delete({ where: { id } })
    ]);
    revalidatePath("/super-admin/schools");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function bulkDeleteSchools(ids: string[]) {
  try {
    await prisma.$transaction([
      prisma.notice.deleteMany({ where: { schoolId: { in: ids } } }),
      prisma.staff.deleteMany({ where: { schoolId: { in: ids } } }),
      prisma.student.deleteMany({ where: { schoolId: { in: ids } } }),
      prisma.subscriptionInvoice.deleteMany({ where: { schoolId: { in: ids } } }),
      prisma.user.deleteMany({ where: { schoolId: { in: ids } } }),
      prisma.school.deleteMany({ where: { id: { in: ids } } })
    ]);
    revalidatePath("/super-admin/schools");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
