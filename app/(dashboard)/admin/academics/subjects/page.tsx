"use client";

import React from 'react';
import { Plus, Search, Book, Edit, Trash2, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export default function SubjectSetupPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subject Repository</h1>
          <p className="text-slate-500 text-sm">Define subjects and map them to appropriate classes</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Add New Subject</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search subjects..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select className="border rounded-lg px-3 py-2 text-sm bg-white text-slate-600">
              <option>All Types</option>
              <option>Theory</option>
              <option>Practical</option>
            </select>
          </div>

          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Subject Name</th>
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {[
                  { name: 'Mathematics', code: 'MATH101', type: 'Theory' },
                  { name: 'Physics', code: 'PHY102', type: 'Theory + Practical' },
                  { name: 'Computer Science', code: 'CS105', type: 'Practical' },
                  { name: 'English Literature', code: 'ENG103', type: 'Theory' },
                ].map((subject) => (
                  <tr key={subject.code} className="hover:bg-slate-50/50 group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                          {subject.name[0]}
                        </div>
                        <span className="font-semibold text-slate-900">{subject.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-500">{subject.code}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                        {subject.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600"><Edit className="w-4 h-4" /></button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subject Mapping Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-indigo-400" />
              Quick Mapping
            </h3>
            <p className="text-slate-400 text-xs mt-2">Assign subjects to classes in bulk.</p>
            
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Class</label>
                <select className="w-full mt-1.5 bg-slate-800 border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200">
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                </select>
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Subjects</label>
                <div className="mt-2 space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History'].map(sub => (
                    <label key={sub} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors">
                      <input type="checkbox" className="rounded border-slate-700 bg-slate-800 text-indigo-500" />
                      <span className="text-sm text-slate-300">{sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-900/20">
                Update Mapping
              </button>
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-5 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 mb-4">Current Mapping Status</h4>
            <div className="space-y-3">
              {[
                { class: 'Grade 10', count: 8, status: 'Complete' },
                { class: 'Grade 11', count: 5, status: 'Pending' },
              ].map(item => (
                <div key={item.class} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.class}</p>
                    <p className="text-[10px] text-slate-500">{item.count} Subjects Assigned</p>
                  </div>
                  {item.status === 'Complete' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
