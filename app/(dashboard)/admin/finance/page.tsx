"use client";

import React from 'react';
import { CreditCard, ArrowUpRight, ArrowDownRight, Clock, Plus, FileText } from 'lucide-react';

export default function FinanceDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Management</h1>
          <p className="text-slate-500 text-sm">Monitor collections, invoices, and school expenses</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Create Fee Type</span>
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <FileText className="w-4 h-4" />
            <span>Bulk Invoice Generation</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-green-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <span className="flex items-center text-green-600 text-xs font-bold">
              <ArrowUpRight className="w-3 h-3" /> +12%
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium mt-4">Total Collected</p>
          <p className="text-2xl font-bold text-slate-900">$45,200</p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-red-50 rounded-lg">
              <Clock className="w-5 h-5 text-red-600" />
            </div>
            <span className="flex items-center text-red-600 text-xs font-bold">
              <ArrowDownRight className="w-3 h-3" /> -5%
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium mt-4">Pending Fees</p>
          <p className="text-2xl font-bold text-slate-900">$12,850</p>
        </div>

        {/* ... More cards ... */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Recent Collections</h3>
            <button className="text-indigo-600 text-sm font-medium">View All</button>
          </div>
          <div className="divide-y">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Student Payment - #INV-2024-00{i}</p>
                    <p className="text-xs text-slate-500">John Doe • 24 Oct 2024</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">$250.00</p>
                  <p className="text-xs text-green-600 font-medium">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Groups List */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-bold text-slate-800">Active Fee Groups</h3>
          </div>
          <div className="p-4 space-y-4">
            {[
              { name: 'Monthly Tuition', amount: '$200', count: '450 Students' },
              { name: 'Transport - Zone A', amount: '$50', count: '120 Students' },
              { name: 'Library Annual', amount: '$30', count: '570 Students' },
            ].map((fee) => (
              <div key={fee.name} className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold text-slate-900">{fee.name}</p>
                  <p className="text-xs text-slate-500">{fee.count}</p>
                </div>
                <p className="font-bold text-indigo-600">{fee.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
