"use client";

import React from 'react';
import { Calendar, GraduationCap, CreditCard, Clock } from 'lucide-react';

export default function StudentDashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Student Portal</h1>
        <p className="text-slate-500 font-medium">Your academic journey, all in one place.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Attendance', value: '94%', icon: Clock, color: 'indigo' },
          { label: 'Current GPA', value: '3.8', icon: GraduationCap, color: 'blue' },
          { label: 'Upcoming Class', value: 'MATH-101', icon: Calendar, color: 'green' },
          { label: 'Fee Status', value: 'Paid', icon: CreditCard, color: 'amber' },
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
