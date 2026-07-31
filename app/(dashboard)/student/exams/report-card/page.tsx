"use client";

import React from 'react';
import { Download, Printer, GraduationCap, Award, BookOpen, Clock, School, Trophy } from 'lucide-react';

export default function StudentReportCardPage() {
  const resultData = {
    student: 'Alice Johnson',
    rollNo: '101',
    class: 'Grade 10 - A',
    exam: 'First Term Examination 2024',
    subjects: [
      { name: 'Mathematics', max: 100, passing: 33, obtained: 92, grade: 'A+', gp: 4.0 },
      { name: 'Physics', max: 100, passing: 33, obtained: 88, grade: 'A', gp: 3.7 },
      { name: 'Chemistry', max: 100, passing: 33, obtained: 95, grade: 'A+', gp: 4.0 },
      { name: 'English', max: 100, passing: 33, obtained: 78, grade: 'B+', gp: 3.3 },
      { name: 'History', max: 100, passing: 33, obtained: 84, grade: 'A', gp: 3.7 },
    ],
    summary: {
      totalObtained: 437,
      totalMax: 500,
      percentage: '87.4%',
      gpa: '3.74',
      rank: '2nd',
      attendance: '96%',
      result: 'PASS',
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center no-print">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Academic Report Card</h1>
          <p className="text-slate-500 text-sm">Download or print your official term performance</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 shadow-sm transition-all" onClick={() => window.print()}>
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Official Report Card UI */}
      <div className="bg-white rounded-[40px] border-4 border-slate-900 shadow-2xl p-12 relative overflow-hidden print:border-0 print:shadow-none print:p-4">
        {/* School Header */}
        <div className="flex justify-between items-center border-b-2 border-slate-100 pb-10">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-white">
                <School className="w-12 h-12" />
             </div>
             <div>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">EduPulse International School</h2>
                <p className="text-slate-500 font-bold tracking-widest text-xs uppercase mt-1">Excellence in Education since 2010</p>
                <p className="text-slate-400 text-[10px] mt-2 font-medium">123 Academic Way, New York, NY 10001 • info@edupulse.edu</p>
             </div>
          </div>
          <div className="text-right">
             <div className="bg-slate-900 text-white px-6 py-2 rounded-2xl inline-block font-black text-xs uppercase tracking-widest">
                Official Report Card
             </div>
             <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">Academic Year: 2024 - 2025</p>
          </div>
        </div>

        {/* Student Profile Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 bg-slate-50/50 my-8 rounded-3xl px-8">
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</p>
              <p className="text-lg font-black text-slate-900 mt-1">{resultData.student}</p>
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admission No</p>
              <p className="text-lg font-black text-slate-900 mt-1">{resultData.rollNo}</p>
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Class & Section</p>
              <p className="text-lg font-black text-slate-900 mt-1">{resultData.class}</p>
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Examination</p>
              <p className="text-lg font-black text-indigo-600 mt-1">{resultData.exam}</p>
           </div>
        </div>

        {/* Marks Table */}
        <div className="overflow-hidden border-2 border-slate-900 rounded-3xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-4">Subject Name</th>
                <th className="px-6 py-4 text-center">Max Marks</th>
                <th className="px-6 py-4 text-center">Passing</th>
                <th className="px-6 py-4 text-center">Obtained</th>
                <th className="px-6 py-4 text-center">Grade</th>
                <th className="px-6 py-4 text-center">GP</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100 font-bold">
              {resultData.subjects.map((sub, i) => (
                <tr key={i} className="text-slate-700 text-sm">
                  <td className="px-6 py-5 flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    {sub.name}
                  </td>
                  <td className="px-6 py-5 text-center">{sub.max}</td>
                  <td className="px-6 py-5 text-center text-slate-400">{sub.passing}</td>
                  <td className="px-6 py-5 text-center text-lg font-black text-slate-900">{sub.obtained}</td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-black">{sub.grade}</span>
                  </td>
                  <td className="px-6 py-5 text-center text-indigo-600">{sub.gp.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-900 text-white font-black">
                <td className="px-6 py-6 text-lg uppercase tracking-widest">Grand Total</td>
                <td className="px-6 py-6 text-center text-lg">{resultData.summary.totalMax}</td>
                <td className="px-6 py-6 border-l border-white/10"></td>
                <td className="px-6 py-6 text-center text-2xl text-indigo-400">{resultData.summary.totalObtained}</td>
                <td className="px-6 py-6 text-center" colSpan={2}>
                   <div className="flex items-center justify-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      RESULT: {resultData.summary.result}
                   </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Summary Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
           {[
             { label: 'Percentage', value: resultData.summary.percentage, icon: GraduationCap },
             { label: 'Weighted GPA', value: resultData.summary.gpa, icon: Award },
             { label: 'Class Rank', value: resultData.summary.rank, icon: Trophy },
             { label: 'Attendance', value: resultData.summary.attendance, icon: Clock },
           ].map((s) => (
             <div key={s.label} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-black text-slate-900 mt-2">{s.value}</p>
             </div>
           ))}
        </div>

        {/* Signatures */}
        <div className="flex justify-between items-end mt-16 px-6">
           <div className="text-center w-48">
              <div className="h-0.5 bg-slate-200 w-full mb-4"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Class Teacher</p>
           </div>
           <div className="text-center w-48">
              <div className="h-0.5 bg-slate-900 w-full mb-4"></div>
              <p className="text-[10px] font-black text-slate-900 uppercase">Principal</p>
           </div>
           <div className="text-center w-48">
              <div className="h-0.5 bg-slate-200 w-full mb-4"></div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Parent Signature</p>
           </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50 rounded-full -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-50 rounded-full -z-10"></div>
      </div>
    </div>
  );
}
