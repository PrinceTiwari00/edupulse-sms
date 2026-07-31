"use client";

import React from 'react';
import { Settings, Plus, BookOpen, Layers, Trash2, Edit2, Percent } from 'lucide-react';

export default function MarkSetupPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mark Distribution Setup</h1>
          <p className="text-slate-500 text-sm">Configure components (Theory, Practical, Viva) for each subject</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg transition-all">
          <Plus className="w-4 h-4" />
          Add Mark Distribution
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribution Templates */}
        <div className="lg:col-span-2 space-y-6">
          {[
            { 
              name: 'Science Subject Template', 
              subjects: ['Physics', 'Chemistry', 'Biology'],
              distribution: [
                { label: 'Theory', marks: 70, passing: 23 },
                { label: 'Practical', marks: 20, passing: 7 },
                { label: 'Viva/Internal', marks: 10, passing: 3 },
              ]
            },
            { 
              name: 'Theory Only Template', 
              subjects: ['English', 'History', 'Geography'],
              distribution: [
                { label: 'Theory', marks: 80, passing: 26 },
                { label: 'Internal Assessment', marks: 20, passing: 7 },
              ]
            }
          ].map((template, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b bg-slate-50/50 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-500" />
                    {template.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Applied to: {template.subjects.join(', ')}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg bg-white border shadow-sm"><Edit2 className="w-4 h-4" /></button>
                  <button className="p-2 text-slate-400 hover:text-red-600 rounded-lg bg-white border shadow-sm"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {template.distribution.map((dist, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-indigo-50 bg-indigo-50/30">
                      <p className="text-xs font-bold text-indigo-900 uppercase tracking-widest">{dist.label}</p>
                      <div className="mt-2 flex justify-between items-end">
                        <div>
                          <p className="text-2xl font-black text-slate-900">{dist.marks}</p>
                          <p className="text-[10px] text-slate-500 font-medium">Max Marks</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-indigo-600">{dist.passing}</p>
                          <p className="text-[10px] text-slate-500 font-medium">Pass Marks</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Result Setup Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Percent className="w-5 h-5 text-indigo-400" />
              Result Weightage
            </h3>
            <div className="space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed">Define how much each term contributes to the final annual result.</p>
              {[
                { term: 'First Term', weight: '20%' },
                { term: 'Mid Term', weight: '30%' },
                { term: 'Final Term', weight: '50%' },
              ].map((item) => (
                <div key={item.term} className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="text-sm font-medium">{item.term}</span>
                  <input 
                    type="text" 
                    defaultValue={item.weight} 
                    className="w-16 bg-transparent border-b border-indigo-500 text-center font-bold focus:outline-none"
                  />
                </div>
              ))}
              <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-2xl font-bold text-sm transition-all">
                Save Final Calculation Setup
              </button>
            </div>
          </div>

          <div className="bg-white border rounded-3xl p-6 shadow-sm">
             <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-slate-400" />
                Exam Type Setup
             </h4>
             <div className="space-y-2">
                {['Theory Exam', 'Practical Exam', 'Viva Voce', 'Internal Assessment', 'Project Work'].map(type => (
                  <div key={type} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg">
                    <span className="text-xs font-medium text-slate-700">{type}</span>
                    <button className="text-[10px] text-red-400 hover:text-red-600 font-bold uppercase">Remove</button>
                  </div>
                ))}
                <button className="w-full mt-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline">+ Add Exam Type</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
