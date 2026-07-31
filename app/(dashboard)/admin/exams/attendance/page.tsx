"use client";

import React from 'react';
import { CheckCircle, XCircle, Search, Calendar, MapPin, Users, Save } from 'lucide-react';

export default function ExamAttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Exam Attendance</h1>
          <p className="text-slate-500 text-sm">Mark student presence for scheduled examinations</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 shadow-xl transition-all">
          <Save className="w-4 h-4" />
          Submit Attendance
        </button>
      </div>

      {/* Filter Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Exam</label>
          <select className="w-full border rounded-xl px-4 py-2 text-sm bg-slate-50">
            <option>First Term 2024</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject</label>
          <select className="w-full border rounded-xl px-4 py-2 text-sm bg-slate-50">
            <option>Mathematics (MATH101)</option>
            <option>Physics (PHY102)</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grade/Section</label>
          <select className="w-full border rounded-xl px-4 py-2 text-sm bg-slate-50">
            <option>Grade 10 - A</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Exam Center</label>
          <div className="flex items-center gap-2 border rounded-xl px-4 py-2 text-sm bg-slate-100 text-slate-500 font-bold">
            <MapPin className="w-4 h-4" /> Hall A
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                <Users className="w-3.5 h-3.5" /> 45 Students
             </div>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input type="text" placeholder="Search roll no..." className="pl-9 pr-4 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500" />
             </div>
          </div>
          <div className="flex gap-2">
             <button className="text-[10px] font-black uppercase text-indigo-600 px-3 py-1.5 hover:bg-indigo-50 rounded-lg transition-colors">Mark All Present</button>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">
              <th className="px-6 py-4">Roll No</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Admission No</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {[
              { roll: '101', name: 'Aaron Smith', adm: 'ADM202401', status: 'Present' },
              { roll: '102', name: 'Bella Thorne', adm: 'ADM202402', status: 'Absent' },
              { roll: '103', name: 'Chris Evans', adm: 'ADM202403', status: 'Present' },
              { roll: '104', name: 'Daisy Ridley', adm: 'ADM202404', status: 'Present' },
            ].map((s) => (
              <tr key={s.roll} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-slate-500">{s.roll}</td>
                <td className="px-6 py-4 font-bold text-slate-900">{s.name}</td>
                <td className="px-6 py-4 text-slate-500">{s.adm}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button className={`p-2 rounded-xl border transition-all ${s.status === 'Present' ? 'bg-green-600 border-green-600 text-white shadow-lg' : 'bg-white text-slate-300 hover:border-green-200 hover:text-green-500'}`}>
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button className={`p-2 rounded-xl border transition-all ${s.status === 'Absent' ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-white text-slate-300 hover:border-red-200 hover:text-red-500'}`}>
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <input type="text" placeholder="e.g. Late by 10 mins" className="w-full px-3 py-1.5 border rounded-lg text-xs bg-slate-50" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
