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
  CheckCircle2,
  Printer,
  History,
  TrendingUp,
  Banknote,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { getSubscriptionAnalytics } from '@/actions/super-admin';

export default function SubscriptionAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments'>('invoices');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSubscriptionAnalytics();
      if (res.success && res.data) setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 font-black text-slate-400 uppercase animate-pulse">Synchronizing platform revenue data...</div>;

  const totalSchools = data?.plansCount?.reduce((acc: number, p: any) => acc + p.count, 0) || 0;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Revenue & Billing</h1>
          <p className="text-slate-500 font-medium">Track platform monetization and institutional subscriptions.</p>
        </div>
        <div className="flex gap-3 no-print">
            <button className="flex items-center gap-2 bg-white border border-slate-100 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                <Download className="w-4 h-4" />
                Export Ledger
            </button>
            <Link href="/super-admin/billing" className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
                <Zap className="w-4 h-4 text-indigo-400" />
                Billing Terminal
            </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="p-3 bg-indigo-50 rounded-2xl w-fit mb-4">
               <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Rate</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">+12.4%</h3>
            <p className="text-[9px] text-green-600 font-bold mt-1 uppercase">↑ from previous month</p>
         </div>
         <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="p-3 bg-green-50 rounded-2xl w-fit mb-4">
               <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Licenses</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalSchools}</h3>
            <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase">Schools Managed</p>
         </div>
         <div className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
            <div className="relative z-10">
               <p className="text-[11px] font-black text-indigo-100 uppercase tracking-[0.3em] mb-6">Realized Platform Revenue</p>
               <h3 className="text-4xl font-black tracking-tighter leading-none">NPR {data?.recentPayments?.reduce((acc: number, p: any) => acc + Number(p.amount), 0).toLocaleString()}</h3>
               <div className="flex items-center gap-2 mt-4 text-white font-black text-[10px] uppercase tracking-widest bg-white/20 w-fit px-3 py-1 rounded-lg backdrop-blur-md">
                  <TrendingUp className="w-3.5 h-3.5" /> Growth Stable
               </div>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
         </div>
         <div className="bg-indigo-600 p-6 rounded-[32px] text-white shadow-xl">
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-4">Average LTV</p>
            <h3 className="text-3xl font-black tracking-tighter">रू {(totalSchools > 0 ? (data?.recentPayments?.reduce((acc: number, p: any) => acc + Number(p.amount), 0) / totalSchools) : 0).toLocaleString()}</h3>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex gap-8">
                  <button 
                    onClick={() => setActiveTab('invoices')}
                    className={`text-sm font-black uppercase tracking-widest pb-2 transition-all border-b-2 ${activeTab === 'invoices' ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                  >
                    Recent Invoices
                  </button>
                  <button 
                    onClick={() => setActiveTab('payments')}
                    className={`text-sm font-black uppercase tracking-widest pb-2 transition-all border-b-2 ${activeTab === 'payments' ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                  >
                    Payment Logs
                  </button>
              </div>
              <div className="relative w-48 no-print">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input type="text" placeholder="Search logs..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              {activeTab === 'invoices' ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                      <th className="px-8 py-5">Institution</th>
                      <th className="px-8 py-5">Invoice #</th>
                      <th className="px-8 py-5 text-right">Net Amount</th>
                      <th className="px-8 py-5 text-center">Status</th>
                      <th className="px-8 py-5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data?.recentInvoices?.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest italic">No subscription invoices generated yet.</td>
                      </tr>
                    ) : (
                      data?.recentInvoices?.map((bill: any) => (
                        <tr key={bill.id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                             <p className="font-black text-slate-900 text-sm tracking-tight">{bill.school.name}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase">{bill.school.subdomain}.edupulse.io</p>
                          </td>
                          <td className="px-8 py-6 font-mono text-[10px] text-indigo-600 font-black uppercase tracking-widest">{bill.invoiceNumber}</td>
                          <td className="px-8 py-6 font-black text-slate-900 text-sm text-right">रू {Number(bill.totalAmount).toLocaleString()}</td>
                          <td className="px-8 py-6 text-center">
                            <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                              bill.status === 'PAID' ? 'bg-green-50 text-green-600' : 
                              bill.status === 'PARTIAL' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                            }`}>
                              {bill.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <Link href={`/super-admin/billing/invoice/${bill.id}`} className="p-2 hover:bg-slate-100 rounded-xl transition-all inline-block">
                                <Printer className="w-4 h-4 text-slate-400" />
                             </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                      <th className="px-8 py-5">Institution</th>
                      <th className="px-8 py-5">Receipt #</th>
                      <th className="px-8 py-5 text-right">Amount</th>
                      <th className="px-8 py-5 text-center">Date</th>
                      <th className="px-8 py-5">Mode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data?.recentPayments?.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest italic">No payments recorded in history.</td>
                      </tr>
                    ) : (
                      data?.recentPayments?.map((payment: any) => (
                        <tr key={payment.id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6 font-black text-slate-900 text-sm tracking-tight">{payment.invoice.school.name}</td>
                          <td className="px-8 py-6 font-mono text-[10px] text-indigo-600 font-black uppercase tracking-widest">{payment.receiptNumber}</td>
                          <td className="px-8 py-6 font-black text-green-600 text-sm text-right">रू {Number(payment.amount).toLocaleString()}</td>
                          <td className="px-8 py-6 text-center text-xs font-bold text-slate-500">
                             {new Date(payment.date).toLocaleDateString('en-GB')}
                          </td>
                          <td className="px-8 py-6 font-black text-slate-400 text-[9px] uppercase tracking-widest">{payment.mode}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0f172a] rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="flex justify-between items-center mb-10 relative z-10">
                <h4 className="text-2xl font-black tracking-tighter uppercase leading-none">Plan <br/>Allocation</h4>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <Zap className="w-6 h-6 text-indigo-400" />
                </div>
            </div>
            <div className="space-y-8 relative z-10">
              {data?.plansCount?.map((plan: any) => (
                <div key={plan.name} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                       <p className="text-xs font-black text-indigo-300 uppercase tracking-[0.2em] mb-1">{plan.name}</p>
                    </div>
                    <p className="text-sm font-black text-white uppercase">{plan.count} Institutions</p>
                  </div>
                  <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(79,70,229,0.5)]" 
                      style={{ width: `${totalSchools > 0 ? (plan.count / totalSchools) * 100 : 0}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>
          </div>

          <div className="bg-indigo-50 p-8 rounded-[40px] border border-indigo-100">
             <div className="flex items-center gap-3 mb-6">
                <History className="w-5 h-5 text-indigo-600" />
                <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest">Platform Insights</h4>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-indigo-700 uppercase">
                   <span>Avg. Payment Value</span>
                   <span className="font-black">रू {(data?.recentPayments?.length > 0 ? (data.recentPayments.reduce((acc: any, p: any) => acc + Number(p.amount), 0) / data.recentPayments.length) : 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-indigo-700 uppercase">
                   <span>Paid Invoices</span>
                   <span className="font-black">{data?.recentInvoices?.filter((i: any) => i.status === 'PAID').length} Invoices</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
