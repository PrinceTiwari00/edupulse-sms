"use client";

import React from 'react';
import { BookOpen, Calendar, ClipboardCheck, GraduationCap } from 'lucide-react';

export default function TeacherDashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Teacher Portal</h1>
        <p className="text-slate-500 font-medium">Review your schedule and manage your students.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Assigned Classes', value: '4', icon: BookOpen, color: 'indigo' },
          { label: 'Total Students', value: '165', icon: GraduationCap, color: 'blue' },
          { label: 'Daily Attendance', value: '98%', icon: ClipboardCheck, color: 'green' },
          { label: 'Exams Active', value: '1', icon: Calendar, color: 'amber' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <div className={`p-4 rounded-2xl bg-${stat.color}-50 w-fit`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
