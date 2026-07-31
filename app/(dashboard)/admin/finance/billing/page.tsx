"use client";

import React from 'react';
import { Play, Printer, FileText, Search, Plus, Filter, Send, Download } from 'lucide-react';

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Billing & Invoicing</h1>
          <p className="text-slate-500 text-sm">Generate and manage student fee invoices</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 shadow-sm transition-all">
            <Plus className="w-4 h-4" />
            Manual Bill
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
            <Play className="w-4 h-4" />
            Bulk Generate
          </button>
        </div>
      </div>

      {/* Generation Wizard (Simplified UI) */}
      <div className="bg-indigo-900 rounded-3xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div className="md:col-span-1 space-y-2">
            <label className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Select Class</label>
            <select className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option className="text-slate-900">All Classes</option>
              <option className="text-slate-900">Grade 10</option>
              <option className="text-slate-900">Grade 11</option>
            </select>
          </div>
          <div className="md:col-span-1 space-y-2">
            <label className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Month / Term</label>
            <select className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option className="text-slate-900">October 2024</option>
              <option className="text-slate-900">November 2024</option>
            </select>
          </div>
          <div className="md:col-span-1 space-y-2">
            <label className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Due Date</label>
            <input type="date" className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div className="md:col-span-1">
             <button className="w-full bg-white text-indigo-900 py-2.5 rounded-xl font-black text-sm hover:bg-indigo-50 transition-colors shadow-lg">
               Preview & Generate
             </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50/50 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Invoice # or Student Name..." 
              className="w-full pl-10 pr-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-2 border rounded-xl hover:bg-slate-100"><Filter className="w-4 h-4 text-slate-500" /></button>
            <button className="p-2 border rounded-xl hover:bg-slate-100"><Download className="w-4 h-4 text-slate-500" /></button>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">
              <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded" /></th>
              <th className="px-6 py-4">Invoice #</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {[
              { id: 'INV-2024-101', student: 'Alice Johnson', amount: '$450.00', date: '15 Oct 2024', status: 'Unpaid' },
              { id: 'INV-2024-102', student: 'Bob Smith', amount: '$450.00', date: '15 Oct 2024', status: 'Partial' },
              { id: 'INV-2024-103', student: 'Charlie Brown', amount: '$450.00', date: '15 Oct 2024', status: 'Paid' },
            ].map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50/50 group transition-colors">
                <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                <td className="px-6 py-4 font-mono font-bold text-slate-600">{inv.id}</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900">{inv.student}</p>
                  <p className="text-[10px] text-slate-500">Grade 10-A</p>
                </td>
                <td className="px-6 py-4 font-black text-slate-900">{inv.amount}</td>
                <td className="px-6 py-4 text-slate-500 font-medium">{inv.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    inv.status === 'Paid' ? 'bg-green-100 text-green-700' :
                    inv.status === 'Partial' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Printer className="w-4 h-4" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg"><Send className="w-4 h-4" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg"><FileText className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
