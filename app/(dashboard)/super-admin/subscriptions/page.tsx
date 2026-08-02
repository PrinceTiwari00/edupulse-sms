"use client";

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  ShieldCheck, 
  Search,
  Filter,
  Download,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { getSubscriptionAnalytics } from '@/actions/super-admin';

export default function SubscriptionAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSubscriptionAnalytics();
      if (res.success && res.data) setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 font-bold text-slate-400">Fetching billing data...</div>;

  const totalSchools = data?.plansCount?.reduce((acc: number, p: any) => acc + p.count, 0) || 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Revenue & Billing</h1>
          <p className="text-slate-500 font-medium">Track platform monetization and institutional subscriptions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex flex-wrap gap-4 items-center justify-between bg-slate-50/30">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Invoices</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                    <th className="px-8 py-5">Institution</th>
                    <th className="px-8 py-5">Invoice #</th>
                    <th className="px-8 py-5">Amount</th>
                    <th className="px-8 py-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data?.recentInvoices?.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest">No active invoices found</td>
                    </tr>
                  ) : (
                    data?.recentInvoices?.map((bill: any) => (
                      <tr key={bill.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6 font-bold text-slate-900 text-sm tracking-tight">{bill.school.name}</td>
                        <td className="px-8 py-6 font-mono text-xs text-slate-400 font-bold uppercase tracking-widest">{bill.invoiceNumber}</td>
                        <td className="px-8 py-6 font-black text-slate-900 text-sm">${bill.amount}</td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase ${
                            bill.status === 'PAID' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {bill.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl">
            <h4 className="text-xl font-black tracking-tight mb-8">Plan Distribution</h4>
            <div className="space-y-6">
              {data?.plansCount?.map((plan: any) => (
                <div key={plan.name} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                       <p className="text-sm font-black text-white">{plan.name}</p>
                    </div>
                    <p className="text-xs font-black text-indigo-400 uppercase">{plan.count} Schools</p>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full rounded-full" 
                      style={{ width: `${(plan.count / totalSchools) * 100}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
