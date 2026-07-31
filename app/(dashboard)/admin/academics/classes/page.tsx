"use client";

import React from 'react';
import { Plus, Edit2, Trash2, Layers, BookOpen, CheckSquare } from 'lucide-react';

export default function ClassSetupPage() {
  const classes = [
    { id: '1', name: 'Grade 10', sections: [{ id: '1', name: 'A', capacity: 40 }], _count: { subjects: 8, students: 120 } },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Class Management</h1>
          <p className="text-slate-500 text-sm">Create and organize school classes and sections</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Create New Class</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {classes.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:border-indigo-300 transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{item.name}</h3>
                    <div className="flex gap-3 mt-1">
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {item._count.subjects} Subjects
                      </span>
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <CheckSquare className="w-3 h-3" /> {item._count.students} Students
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Sections & Capacity</p>
                <div className="flex flex-wrap gap-3">
                  {item.sections.map(section => (
                    <div key={section.id} className="flex items-center gap-3 px-3 py-2 bg-slate-50 border rounded-lg group">
                      <span className="font-bold text-slate-700">Section {section.name}</span>
                      <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border text-slate-400">{section.capacity || 0} Seats</span>
                      <button className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button className="flex items-center gap-1.5 px-3 py-2 border border-dashed border-indigo-300 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-50 transition-colors">
                    <Plus className="w-3 h-3" /> Add Section
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
