"use client";

import React, { useEffect, useState } from 'react';
import { CreditCard, ArrowUpRight, ArrowDownRight, Clock, Plus, FileText } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { getFinanceSummary } from '@/actions/finance-summary';

export default function FinanceDashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.schoolId) {
      const fetchData = async () => {
        const res = await getFinanceSummary(session.user.schoolId as string);
        if (res.success) setData(res.data);
        setLoading(false);
      };
      fetchData();
    }
  }, [session]);

  if (loading) return <div className="p-10 font-bold text-slate-400 uppercase tracking-widest animate-pulse">Calculating institutional balances...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Financial Management</h1>
          <p className="text-slate-500 text-sm">Monitor collections, invoices, and school expenses</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-bold text-xs uppercase shadow-lg shadow-indigo-100">
            <FileText className="w-4 h-4" />
            <span>Bulk Invoice Generation</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-green-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <span className="flex items-center text-green-600 text-[10px] font-black uppercase">
              Collected
            </span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-4">Total Revenue</p>
          <p className="text-2xl font-black text-slate-900">${data?.totalCollected?.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-red-50 rounded-lg">
              <Clock className="w-5 h-5 text-red-600" />
            </div>
            <span className="flex items-center text-red-600 text-[10px] font-black uppercase">
              Outstanding
            </span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-4">Pending Fees</p>
          <p className="text-2xl font-black text-slate-900">${data?.pendingFees?.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm">Recent Collections</h3>
          </div>
          <div className="divide-y">
            {data?.recentCollections?.length === 0 ? (
               <div className="p-10 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">No payments recorded recently.</div>
            ) : (
              data.recentCollections.map((bill: any) => (
                <div key={bill.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm tracking-tight">{bill.student.user.firstName} {bill.student.user.lastName}</p>
                      <p className="text-[10px] text-slate-400 font-mono font-bold">{bill.invoiceNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900 text-sm">${bill.amount}</p>
                    <p className="text-[9px] text-green-600 font-black uppercase">PAID</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-slate-50/50">
            <h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm">Active Fee Groups</h3>
          </div>
          <div className="p-4 space-y-4">
            {data?.feeGroups?.length === 0 ? (
               <div className="text-center py-10 text-slate-400 font-bold text-xs uppercase tracking-widest">No fee items configured.</div>
            ) : (
              data.feeGroups.map((fee: any) => (
                <div key={fee.name} className="p-3 border rounded-lg flex justify-between items-center bg-slate-50/30">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{fee.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{fee.count} Invoices</p>
                  </div>
                  <p className="font-black text-indigo-600 text-sm">${fee.amount}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
