"use client";

import React from 'react';
import { BarChart3, PieChart, FileText, Download, TrendingUp, Users, Calendar, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';

export default function FinanceReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Reports</h1>
          <p className="text-slate-500 text-sm">Analyze collections, dues, and revenue trends</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 shadow-sm transition-all">
            <Download className="w-4 h-4" />
            Export Monthly Report
          </button>
        </div>
      </div>

      {/* High Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$124,500', trend: '+12%', icon: TrendingUp, color: 'indigo' },
          { label: 'Outstanding Dues', value: '$18,200', trend: '-4%', icon: FileText, color: 'red' },
          { label: 'Total Collections', value: '$106,300', trend: '+8%', icon: BarChart3, color: 'green' },
          { label: 'Fee Defaulters', value: '42', trend: '+2', icon: Users, color: 'amber' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl bg-${stat.color}-50`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className={`flex items-center text-[10px] font-black ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class-wise Collection Summary */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-500" />
              Fee Collection Summary (By Class)
            </h3>
            <select className="text-xs font-bold border rounded-lg px-2 py-1 bg-white">
              <option>Current Session</option>
              <option>Last Session</option>
            </select>
          </div>
          <div className="p-6">
            <div className="space-y-6">
               {[
                 { class: 'Grade 10', collected: 85000, total: 95000, percentage: 89 },
                 { class: 'Grade 11', collected: 62000, total: 80000, percentage: 77 },
                 { class: 'Grade 12', collected: 45000, total: 48000, percentage: 93 },
               ].map((item) => (
                 <div key={item.class} className="space-y-2">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-sm font-bold text-slate-900">{item.class}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${item.collected.toLocaleString()} / ${item.total.toLocaleString()}</p>
                       </div>
                       <span className="text-sm font-black text-indigo-600">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                       <div 
                         className="bg-indigo-600 h-full rounded-full" 
                         style={{ width: `${item.percentage}%` }}
                       />
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Individual Student Statement Search */}
        <div className="lg:col-span-1 bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between">
           <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                Student Statement
              </h3>
              <p className="text-slate-400 text-sm mt-2">Generate a detailed ledger of all invoices and payments for a specific student.</p>
              
              <div className="mt-8 space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Student</label>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <input 
                         type="text" 
                         placeholder="Name or Admission No..." 
                         className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                       />
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">From</label>
                       <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs focus:outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">To</label>
                       <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-xs focus:outline-none" />
                    </div>
                 </div>
              </div>
           </div>

           <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-indigo-900/20 mt-8 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Statement
           </button>
        </div>
      </div>
    </div>
  );
}
