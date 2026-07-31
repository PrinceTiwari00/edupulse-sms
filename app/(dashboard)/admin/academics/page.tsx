"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming shadcn
import { Plus, Trash2, Edit3, BookOpen } from 'lucide-react';

export default function AcademicSetup() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Academic Setup</h1>
        <p className="text-slate-500 text-sm">Configure your school's academic structure</p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {/* Simple Tab Header Mock */}
        <div className="flex border-b">
          <button className="px-6 py-4 text-sm font-semibold border-b-2 border-indigo-600 text-indigo-600">Classes & Sections</button>
          <button className="px-6 py-4 text-sm font-semibold text-slate-500 hover:text-slate-800">Academic Years</button>
          <button className="px-6 py-4 text-sm font-semibold text-slate-500 hover:text-slate-800">Subjects</button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Classes & Sections</h3>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-indigo-700">
              <Plus className="w-4 h-4" /> Add Class
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Grade 10', 'Grade 11', 'Grade 12'].map((className) => (
              <div key={className} className="border rounded-xl p-4 hover:border-indigo-200 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-indigo-50 p-2 rounded-lg">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-md">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <h4 className="font-bold text-slate-900 text-lg">{className}</h4>
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sections</p>
                  <div className="flex flex-wrap gap-2">
                    {['A', 'B', 'C'].map(section => (
                      <span key={section} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-sm font-medium border">
                        Section {section}
                      </span>
                    ))}
                    <button className="px-2.5 py-1 text-indigo-600 hover:bg-indigo-50 border border-dashed border-indigo-300 rounded-md text-sm font-medium">
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
