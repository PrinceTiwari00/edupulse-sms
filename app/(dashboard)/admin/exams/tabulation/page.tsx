"use client";

import React from 'react';
import { Download, Table as TableIcon, Search, Filter, FileSpreadsheet, Printer, ChevronRight } from 'lucide-react';

export default function TabulationSheetPage() {
  const subjects = ['MATH', 'PHYS', 'CHEM', 'ENG', 'HIST', 'COMP'];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tabulation Sheet</h1>
          <p className="text-slate-500 text-sm">Detailed consolidated marks report for a class</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 shadow-sm transition-all">
            <FileSpreadsheet className="w-4 h-4" />
            Excel
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg transition-all">
            <Printer className="w-4 h-4" />
            Print Sheet
          </button>
        </div>
      </div>

      {/* Selector Bar */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        <div className="space-y-2">
           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Examination</label>
           <select className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-400">
              <option className="text-slate-900">First Term 2024</option>
           </select>
        </div>
        <div className="space-y-2">
           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grade</label>
           <select className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-400">
              <option className="text-slate-900">Grade 10</option>
           </select>
        </div>
        <div className="space-y-2">
           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Section</label>
           <select className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-400">
              <option className="text-slate-900">Section A</option>
           </select>
        </div>
        <button className="w-full bg-indigo-600 hover:bg-indigo-500 py-2.5 rounded-xl font-black text-sm transition-all">
           Generate Sheet
        </button>
      </div>

      {/* Tabulation Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-4 sticky left-0 bg-slate-900 border-r border-white/10">Student Profile</th>
                {subjects.map(sub => (
                  <th key={sub} className="px-4 py-4 text-center border-r border-white/10">{sub}</th>
                ))}
                <th className="px-6 py-4 text-center bg-indigo-600">Total</th>
                <th className="px-6 py-4 text-center bg-indigo-700">%</th>
                <th className="px-6 py-4 text-center bg-indigo-800">Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs">
              {[
                { roll: '101', name: 'Alice Johnson', marks: [92, 88, 95, 78, 84, 90], total: 527, percent: '87.8', rank: '1' },
                { roll: '102', name: 'Bob Smith', marks: [74, 65, 80, 55, 60, 72], total: 406, percent: '67.6', rank: '8' },
                { roll: '103', name: 'Charlie Brown', marks: [45, 33, 50, 40, 42, 48], total: 258, percent: '43.0', rank: '15' },
                { roll: '104', name: 'Daisy Ridley', marks: [88, 92, 90, 85, 82, 94], total: 531, percent: '88.5', rank: '2' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 sticky left-0 bg-white group-hover:bg-slate-50 border-r font-bold">
                    <div className="flex flex-col">
                       <span className="text-slate-900">{row.name}</span>
                       <span className="text-[10px] text-slate-400 font-mono">Roll: {row.roll}</span>
                    </div>
                  </td>
                  {row.marks.map((m, idx) => (
                    <td key={idx} className={`px-4 py-4 text-center border-r font-medium ${m < 33 ? 'text-red-500 bg-red-50 font-black' : 'text-slate-600'}`}>
                      {m}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-center font-black text-slate-900 bg-indigo-50/30">{row.total}</td>
                  <td className="px-6 py-4 text-center font-black text-indigo-600 bg-indigo-100/30">{row.percent}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${row.rank === '1' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
                      {row.rank}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
