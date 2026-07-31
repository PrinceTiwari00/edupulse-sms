"use client";

import React from 'react';
import { BarChart3, TrendingUp, Users, Trophy, Download, Search, ChevronRight, Award, AlertCircle } from 'lucide-react';

export default function ExamResultsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Result Analytics</h1>
          <p className="text-slate-500 text-sm">Monitor student performance and school-wide results</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 shadow-xl transition-all">
          <Download className="w-4 h-4" />
          Bulk Report Card Export
        </button>
      </div>

      {/* Global Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Pass Percentage', value: '88%', trend: '+4%', icon: TrendingUp, color: 'indigo' },
          { label: 'Avg. School GPA', value: '3.42', trend: '+0.12', icon: Award, color: 'amber' },
          { label: 'Top Scorer', value: 'Alice J.', trend: '98.4%', icon: Trophy, color: 'green' },
          { label: 'Need Attention', value: '14', trend: 'Students', icon: AlertCircle, color: 'red' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl bg-${stat.color}-50`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded">
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class-wise Performance */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              Class Performance Index
            </h3>
            <div className="flex gap-2">
               <button className="text-xs font-bold text-indigo-600 border border-indigo-100 bg-white px-3 py-1.5 rounded-lg">View All</button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {[
              { class: 'Grade 10', avg: 84, highest: 98, passRate: 92 },
              { class: 'Grade 11', avg: 76, highest: 95, passRate: 85 },
              { class: 'Grade 12', avg: 89, highest: 99, passRate: 96 },
              { class: 'Grade 9', avg: 68, highest: 92, passRate: 74 },
            ].map((item) => (
              <div key={item.class} className="flex items-center gap-6 group cursor-pointer">
                <div className="w-20">
                  <p className="text-sm font-bold text-slate-900">{item.class}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.passRate}% Pass</p>
                </div>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden flex">
                   <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${item.avg}%` }}></div>
                </div>
                <div className="w-12 text-right">
                   <span className="text-sm font-black text-slate-900">{item.avg}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Toppers & Search */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
             <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-amber-400" />
                School Toppers
             </h3>
             <div className="space-y-4">
                {[
                  { name: 'Alice Johnson', class: 'Grade 10', score: '98.4%' },
                  { name: 'Ethan Hunt', class: 'Grade 12', score: '97.2%' },
                  { name: 'Bella Thorne', class: 'Grade 11', score: '95.8%' },
                ].map((top, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                     <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-[10px] font-black">{i+1}</span>
                        <div>
                           <p className="text-sm font-bold">{top.name}</p>
                           <p className="text-[10px] text-slate-400">{top.class}</p>
                        </div>
                     </div>
                     <span className="text-sm font-black text-indigo-400">{top.score}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-white border rounded-3xl p-6 shadow-sm">
             <h4 className="text-sm font-bold text-slate-900 mb-4">Search Student Result</h4>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Student ID or Name..." 
                  className="w-full pl-10 pr-4 py-3 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                />
             </div>
             <button className="w-full mt-4 bg-slate-50 hover:bg-slate-100 py-3 rounded-2xl text-xs font-bold text-slate-600 flex items-center justify-center gap-2 transition-all">
                Generate Individual Report <ChevronRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
