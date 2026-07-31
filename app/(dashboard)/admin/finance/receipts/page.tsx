"use client";

import React from 'react';
import { CreditCard, Wallet, Search, ArrowRight, Printer, CheckCircle2, History, Banknote } from 'lucide-react';

export default function ReceiptManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fee Collection</h1>
          <p className="text-slate-500 text-sm">Record payments and manage fee receipts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Collection Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden sticky top-6">
            <div className="p-6 border-b bg-indigo-600 text-white">
              <h3 className="font-bold flex items-center gap-2">
                <Banknote className="w-5 h-5" />
                Quick Collection
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Search Student / Invoice</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Enter Student ID or Invoice #" 
                    className="w-full pl-10 pr-4 py-3 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                  />
                </div>
              </div>

              {/* Mock result found */}
              <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-3">
                 <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-indigo-900">Alice Johnson</p>
                      <p className="text-[10px] text-indigo-700">ADM-2024-001 | Grade 10-A</p>
                    </div>
                    <span className="text-lg font-black text-indigo-900">$450.00</span>
                 </div>
                 <div className="pt-2 border-t border-indigo-200 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">Pending Invoices</span>
                    <span className="px-2 py-0.5 bg-white rounded-full text-[10px] font-bold text-indigo-600">2 Invoices</span>
                 </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount to Pay</label>
                  <input type="number" placeholder="0.00" className="w-full px-4 py-3 border rounded-2xl text-lg font-black focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Cash', 'Cheque', 'Online'].map(mode => (
                      <button key={mode} className={`py-2 rounded-xl text-xs font-bold border transition-all ${mode === 'Cash' ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mt-4">
                  Collect Payment & Print <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Collections List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-500" />
                Recent Collections
              </h3>
              <div className="flex gap-2">
                <button className="p-2 border rounded-xl hover:bg-slate-100"><Printer className="w-4 h-4 text-slate-500" /></button>
              </div>
            </div>
            
            <div className="divide-y">
               {[
                 { id: 'RCP-8801', student: 'Ethan Hunt', amount: '$250.00', mode: 'Cash', date: 'Today, 10:45 AM' },
                 { id: 'RCP-8802', student: 'Sarah Connor', amount: '$1,200.00', mode: 'Online', date: 'Today, 09:20 AM' },
                 { id: 'RCP-8799', student: 'John Wick', amount: '$450.00', mode: 'Bank Transfer', date: 'Yesterday' },
                 { id: 'RCP-8798', student: 'Peter Parker', amount: '$30.00', mode: 'Cash', date: 'Yesterday' },
               ].map((rcp) => (
                 <div key={rcp.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                          <CreditCard className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-900">{rcp.student}</p>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-xs font-mono font-bold text-indigo-600">{rcp.id}</span>
                             <span className="text-slate-300">|</span>
                             <span className="text-[10px] text-slate-400 font-bold uppercase">{rcp.mode}</span>
                          </div>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-lg font-black text-slate-900">{rcp.amount}</p>
                       <div className="flex items-center gap-1.5 justify-end mt-1">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          <span className="text-[10px] text-slate-400 font-medium">{rcp.date}</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="p-4 bg-slate-50 border-t text-center">
               <button className="text-xs font-bold text-indigo-600 hover:underline">View All Collections</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
