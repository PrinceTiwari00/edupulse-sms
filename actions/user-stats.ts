"use server";

import prisma from "@/lib/db";

export async function getTeacherStats(userId: string) {
  try {
    const staff = await prisma.staff.findUnique({
      where: { userId },
    });

    if (!staff) throw new Error("Staff profile not found");

    const [classesCount, studentsCount] = await Promise.all([
      prisma.timetable.count({ where: { teacherId: staff.id } }),
      prisma.student.count({ 
        where: { 
          class: { 
            sections: { 
              some: { teacherId: staff.id } 
            } 
          } 
        } 
      }),
    ]);

    return {
      success: true,
      data: {
        assignedClasses: classesCount,
        totalStudents: studentsCount,
        attendanceRate: "98%", // Example placeholder until attendance logic is deeper
        activeExams: 1
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getStudentStats(userId: string) {
  try {
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) throw new Error("Student profile not found");

    const [attendanceCount, totalAttendance, examsCount] = await Promise.all([
      prisma.attendance.count({ where: { studentId: student.id, status: "PRESENT" } }),
      prisma.attendance.count({ where: { studentId: student.id } }),
      prisma.mark.count({ where: { studentId: student.id } }),
    ]);

    const attendanceRate = totalAttendance > 0 
      ? `${Math.round((attendanceCount / totalAttendance) * 100)}%` 
      : "0%";

    return {
      success: true,
      data: {
        attendanceRate,
        gpa: "3.8", // Placeholder for complex GPA calculation
        activeExams: examsCount,
        feeStatus: "Paid" // Placeholder for invoice check
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
