"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createExam(data: {
  name: string;
  startDate: Date;
  endDate: Date;
  schoolId: string;
}) {
  try {
    const exam = await prisma.exam.create({
      data: {
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        schoolId: data.schoolId,
      },
    });
    revalidatePath("/admin/exams/setup");
    return { success: true, data: exam };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function postMarks(data: {
  examId: string;
  studentId: string;
  subjectId: string;
  marksObtained: number;
  passingMarks: number;
  totalMarks: number;
}) {
  try {
    const mark = await prisma.mark.create({
      data: {
        examId: data.examId,
        studentId: data.studentId,
        subjectId: data.subjectId,
        marksObtained: data.marksObtained,
        passingMarks: data.passingMarks,
        totalMarks: data.totalMarks,
      },
    });
    revalidatePath("/admin/exams/results");
    return { success: true, data: mark };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
