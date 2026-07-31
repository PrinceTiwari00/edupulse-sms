"use client";

import React from 'react';
import { Plus, Edit2, Trash2, Tag, Percent, AlertCircle, Link as LinkIcon, Wallet } from 'lucide-react';

export default function FeeSetupPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fee Configuration</h1>
          <p className="text-slate-500 text-sm">Manage fee items, discounts, and fine rules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Items */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-500" />
              Fee Items
            </h3>
            <button className="text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors">
              + Add Item
            </button>
          </div>
          <div className="divide-y">
            {[
              { name: 'Tuition Fee', category: 'Academic', amount: '$2,400', type: 'Annual' },
              { name: 'Transport Fee', category: 'Services', amount: '$500', type: 'Monthly' },
              { name: 'Library Fee', category: 'Academic', amount: '$100', type: 'Annual' },
              { name: 'Registration Fee', category: 'Admission', amount: '$250', type: 'One-time' },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{item.category} • {item.type}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-slate-900">{item.amount}</span>
                  <div className="flex gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-md"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discounts & Fines */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Percent className="w-4 h-4 text-green-500" />
                Discounts & Waivers
              </h3>
              <button className="text-xs font-bold text-indigo-600 hover:underline">New Setup</button>
            </div>
            <div className="p-4 space-y-3">
              {[
                { name: 'Sibling Discount', value: '15%', type: 'Percentage' },
                { name: 'Scholarship (Merit)', value: '50%', type: 'Percentage' },
                { name: 'Staff Child', value: '$200', type: 'Fixed' },
              ].map((d, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-sm font-bold text-slate-700">{d.name}</span>
                  <span className="px-2 py-1 bg-white border rounded-lg text-xs font-black text-indigo-600">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                Fine Rules (Late Payment)
              </h3>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <Wallet className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-red-900">Standard Late Fine</p>
                  <p className="text-xs text-red-700">$5.00 per day after 10th of every month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Mapping */}
        <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
           <div className="flex justify-between items-center mb-8">
             <div>
               <h3 className="text-xl font-bold flex items-center gap-2">
                 <LinkIcon className="w-5 h-5 text-indigo-400" />
                 Fee Mapping (Class-wise)
               </h3>
               <p className="text-slate-400 text-sm mt-1">Map specific fee items to classes for auto-billing</p>
             </div>
             <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl text-sm font-bold transition-all">
               Assign Fees
             </button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Grade 10', 'Grade 11', 'Grade 12'].map(cls => (
                <div key={cls} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-lg font-bold">{cls}</span>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded uppercase font-black">Active</span>
                  </div>
                  <div className="space-y-2">
                    {['Tuition Fee', 'Library Fee', 'Lab Fee'].map(f => (
                      <div key={f} className="flex justify-between items-center text-xs text-slate-400">
                        <span>{f}</span>
                        <span className="text-white font-medium">$120</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Total</span>
                    <span className="text-lg font-black text-white">$450</span>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
