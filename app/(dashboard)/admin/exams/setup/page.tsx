"use client";

import React from 'react';
import { Plus, Trophy, GraduationCap, Settings2, Trash2, Edit, CheckCircle2, ListFilter } from 'lucide-react';

export default function ExamSetupPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Examination Setup</h1>
          <p className="text-slate-500 text-sm">Define exam terms and configure grading systems</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
          <Plus className="w-4 h-4" />
          Create New Exam
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Exams List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                Active Examinations
              </h3>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Year 2024-25</span>
            </div>
            <div className="divide-y">
              {[
                { name: 'First Term Examination', dates: 'Oct 15 - Oct 25', status: 'In Progress', classes: 'Grades 1-12' },
                { name: 'Mid-Sessional Assessment', dates: 'Dec 05 - Dec 12', status: 'Scheduled', classes: 'Grades 6-12' },
                { name: 'Final Annual Examination', dates: 'Mar 10 - Mar 25', status: 'Draft', classes: 'All Grades' },
              ].map((exam, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {exam.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{exam.name}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {exam.classes}</span>
                        <span className="text-slate-300">|</span>
                        <span>{exam.dates}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      exam.status === 'In Progress' ? 'bg-green-100 text-green-700' :
                      exam.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {exam.status}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grading Schema */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-6 border-b bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-indigo-500" />
                  Grading Scale (GPA)
                </h3>
                <button className="text-xs font-bold text-indigo-600 hover:underline">Customize Scale</button>
             </div>
             <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { grade: 'A+', range: '91-100', point: '4.0' },
                  { grade: 'A', range: '81-90', point: '3.7' },
                  { grade: 'B+', range: '71-80', point: '3.3' },
                  { grade: 'B', range: '61-70', point: '3.0' },
                  { grade: 'C+', range: '51-60', point: '2.7' },
                  { grade: 'F', range: '0-32', point: '0.0' },
                ].map((g) => (
                  <div key={g.grade} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all">
                    <p className="text-xl font-black text-slate-900">{g.grade}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{g.range}%</p>
                    <p className="text-xs font-black text-indigo-600 mt-1">GP {g.point}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Exam Rules & Passing Criteria */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
             <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                Passing Criteria
             </h3>
             <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                   <span className="text-sm font-medium text-slate-300">Min. Passing %</span>
                   <span className="text-lg font-black text-white">33%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                   <span className="text-sm font-medium text-slate-300">Grace Marks Limit</span>
                   <span className="text-lg font-black text-white">5</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                   <span className="text-sm font-medium text-slate-300">Attendance Required</span>
                   <span className="text-lg font-black text-white">75%</span>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-2xl font-bold text-sm transition-all">
                   Update Global Rules
                </button>
             </div>
          </div>

          <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-600 rounded-xl">
                   <ListFilter className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-indigo-900">Result Auto-Process</h4>
             </div>
             <p className="text-xs text-indigo-700 leading-relaxed">
               System will automatically calculate GPA and Ranks once marks for all subjects are posted by teachers.
             </p>
             <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-indigo-900 uppercase">Engine Ready</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
