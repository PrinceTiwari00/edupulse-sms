"use client";

import React from 'react';
import { Calendar, Clock, MapPin, Search, Plus, Filter, Download, ChevronRight } from 'lucide-react';

export default function ExamSchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Exam Date Sheet</h1>
          <p className="text-slate-500 text-sm">Manage examination schedule and hall assignments</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 shadow-sm transition-all">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
            <Plus className="w-4 h-4" />
            Add Schedule
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <select className="w-full border rounded-xl px-4 py-2 text-sm bg-slate-50 text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>First Term Examination 2024</option>
            <option>Mid-Term 2024</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <select className="w-full border rounded-xl px-4 py-2 text-sm bg-slate-50 text-slate-600">
            <option>Grade 10</option>
            <option>Grade 11</option>
          </select>
        </div>
        <button className="p-2 border rounded-xl hover:bg-slate-50"><Filter className="w-5 h-5 text-slate-400" /></button>
      </div>

      {/* Schedule Timeline */}
      <div className="space-y-4">
        {[
          { date: '15 Oct, 2024', day: 'Monday', exams: [
            { subject: 'Mathematics', time: '09:00 AM - 12:00 PM', hall: 'Hall A', students: 45 },
            { subject: 'History', time: '01:30 PM - 04:30 PM', hall: 'Hall B', students: 30 },
          ]},
          { date: '16 Oct, 2024', day: 'Tuesday', exams: [
            { subject: 'Physics', time: '09:00 AM - 12:00 PM', hall: 'Lab 1', students: 42 },
          ]},
          { date: '18 Oct, 2024', day: 'Thursday', exams: [
            { subject: 'English', time: '09:00 AM - 12:00 PM', hall: 'Hall A', students: 50 },
          ]},
        ].map((day, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{day.date}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{day.day}</p>
                </div>
              </div>
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded uppercase">
                {day.exams.length} Papers
              </span>
            </div>
            <div className="divide-y">
              {day.exams.map((ex, i) => (
                <div key={i} className="p-6 flex flex-wrap items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-2 h-10 bg-indigo-500 rounded-full"></div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{ex.subject}</h4>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> {ex.time}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {ex.hall}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                     <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invigilator</p>
                        <p className="text-sm font-bold text-slate-700">Dr. Sarah Wilson</p>
                     </div>
                     <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
