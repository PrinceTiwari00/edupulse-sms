"use client";

import React from 'react';
import { BookOpen, Trophy, Info, Save, ChevronRight } from 'lucide-react';

export default function MarksEntry() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Marks Entry</h1>
          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
            <span>First Term Examination 2024</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold text-indigo-600">Mathematics</span>
            <ChevronRight className="w-4 h-4" />
            <span>Grade 10-A</span>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all font-semibold">
          <Save className="w-4 h-4" />
          <span>Post Marks</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Max Marks</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">100</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Passing Marks</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">33</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Average Score</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">74.2</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Roll No</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Obtained Marks (out of 100)</th>
              <th className="px-6 py-4">Grade</th>
              <th className="px-6 py-4">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {[
              { roll: '101', name: 'Aaron Smith', marks: 85 },
              { roll: '102', name: 'Bella Thorne', marks: 92 },
              { roll: '103', name: 'Chris Evans', marks: 45 },
              { roll: '104', name: 'Daisy Ridley', marks: 78 },
              { roll: '105', name: 'Ethan Hawke', marks: 28 },
            ].map((s) => (
              <tr key={s.roll} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-mono text-slate-500">{s.roll}</td>
                <td className="px-6 py-4 font-semibold text-slate-900">{s.name}</td>
                <td className="px-6 py-4">
                  <input 
                    type="number" 
                    defaultValue={s.marks}
                    className={`w-24 px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 ${
                      s.marks < 33 ? 'border-red-200 bg-red-50 text-red-700' : 'focus:ring-indigo-500'
                    }`}
                  />
                </td>
                <td className="px-6 py-4 font-bold text-slate-700">
                  {s.marks >= 90 ? 'A+' : s.marks >= 80 ? 'A' : s.marks >= 60 ? 'B' : s.marks >= 33 ? 'C' : 'F'}
                </td>
                <td className="px-6 py-4">
                  <input 
                    type="text" 
                    placeholder="Enter remark..."
                    className="w-full px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-300"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
