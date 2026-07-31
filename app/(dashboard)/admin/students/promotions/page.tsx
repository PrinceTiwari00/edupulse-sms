"use client";

import React from 'react';
import { GraduationCap, ArrowRight, CheckCircle2, AlertTriangle, Users } from 'lucide-react';

export default function StudentPromotions() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Promotions</h1>
          <p className="text-slate-500 text-sm">Bulk promote students to the next academic session</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Source (Current)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Current Class</label>
                <select className="w-full border rounded-lg px-3 py-2 text-sm bg-slate-50">
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Current Section</label>
                <select className="w-full border rounded-lg px-3 py-2 text-sm bg-slate-50">
                  <option>Section A</option>
                  <option>Section B</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center pb-2 hidden lg:flex">
            <div className="bg-indigo-100 p-2 rounded-full">
              <ArrowRight className="w-6 h-6 text-indigo-600" />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Target (Promotion)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Promote To Class</label>
                <select className="w-full border border-indigo-200 rounded-lg px-3 py-2 text-sm bg-indigo-50/30">
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Target Section</label>
                <select className="w-full border border-indigo-200 rounded-lg px-3 py-2 text-sm bg-indigo-50/30">
                  <option>Section A</option>
                  <option>Section B</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-700">Found 32 Students in Grade 9-A</span>
          </div>
          <div className="flex gap-2">
            <button className="text-xs font-bold text-slate-500 px-3 py-1.5 hover:bg-slate-100 rounded">Select All</button>
            <button className="text-xs font-bold text-slate-500 px-3 py-1.5 hover:bg-slate-100 rounded">Deselect All</button>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-bold text-slate-400 uppercase border-b">
              <th className="px-6 py-3 w-12">Select</th>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Roll No</th>
              <th className="px-6 py-3 text-center">Current Result</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {[
              { id: 1, name: 'Alice Johnson', roll: '901', result: 'Pass (8.4 GPA)', status: 'Eligible' },
              { id: 2, name: 'Bob Smith', roll: '902', result: 'Pass (7.2 GPA)', status: 'Eligible' },
              { id: 3, name: 'Charlie Brown', roll: '903', result: 'Fail', status: 'Ineligible' },
            ].map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 text-center">
                  <input type="checkbox" defaultChecked={s.status === 'Eligible'} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                </td>
                <td className="px-6 py-4 font-semibold text-slate-900">{s.name}</td>
                <td className="px-6 py-4 font-mono text-slate-500">{s.roll}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-xs font-bold ${s.result === 'Fail' ? 'text-red-600' : 'text-green-600'}`}>
                    {s.result}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {s.status === 'Eligible' ? (
                    <div className="flex items-center gap-1.5 text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-[10px] font-bold w-fit uppercase border border-green-100">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-red-700 bg-red-50 px-2 py-0.5 rounded-full text-[10px] font-bold w-fit uppercase border border-red-100">
                      <AlertTriangle className="w-3 h-3" /> Failed
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-6 bg-slate-50 border-t flex justify-end">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Promote Selected Students
          </button>
        </div>
      </div>
    </div>
  );
}
