"use client";

import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Download, 
  Printer, 
  Search, 
  History 
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

  if (loading) return <div className="p-10 font-black text-slate-400 uppercase animate-pulse text-center">Synchronizing platform revenue data...</div>;

  const totalSchools = data?.plansCount?.reduce((acc: number, p: any) => acc + p.count, 0) || 0;
  const realizedRevenue = data?.recentPayments?.reduce((acc: number, p: any) => acc + Number(p.amount), 0) || 0;

  return (
    <div className="space-y-6 lg:space-y-12 pb-20 px-0 md:px-4">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Revenue & Billing</h1>
          <p className="text-slate-500 font-bold text-sm md:text-lg max-w-xl">Track platform monetization and institutional subscriptions.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full lg:w-auto no-print">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border-2 border-slate-100 px-6 py-4 rounded-[20px] font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                <Download className="w-4 h-4" />
                Export Ledger
            </button>
            <Link href="/super-admin/billing" className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-[20px] font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
                <Zap className="w-4 h-4 text-indigo-400" />
                Billing Terminal
            </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
         <div className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-200 shadow-sm">
            <div className="p-4 bg-indigo-50 rounded-2xl w-fit mb-6">
               <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
            <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">Growth Rate</p>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">+12.4%</h3>
            <p className="text-[10px] text-green-600 font-bold mt-2 uppercase tracking-tighter">↑ from previous month</p>
         </div>
         <div className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-200 shadow-sm">
            <div className="p-4 bg-green-50 rounded-2xl w-fit mb-6">
               <ShieldCheck className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">Active Licenses</p>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">{totalSchools}</h3>
            <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tighter">Schools Managed</p>
         </div>
         <div className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border-2 border-indigo-600 text-slate-900 shadow-2xl shadow-indigo-100 relative overflow-hidden group">
            <div className="relative z-10">
               <p className="text-[10px] md:text-xs font-black text-indigo-400 uppercase tracking-widest mb-4 md:mb-6 leading-none">Realized Platform Revenue</p>
               <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-none text-slate-900 uppercase">रू {realizedRevenue.toLocaleString()}</h3>
               <div className="flex items-center gap-2 mt-4 md:mt-6 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 w-fit px-3 py-1 rounded-lg border border-indigo-100">
                  <TrendingUp className="w-3.5 h-3.5" /> Stable
               </div>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-all duration-700"></div>
         </div>
         <div className="bg-indigo-600 p-6 md:p-8 rounded-[32px] md:rounded-[40px] text-white shadow-xl flex flex-col justify-between">
            <p className="text-[10px] md:text-xs font-black text-indigo-100 uppercase tracking-widest mb-4">Average LTV</p>
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-none">रू {(totalSchools > 0 ? (realizedRevenue / totalSchools) : 0).toLocaleString()}</h3>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] md:rounded-[48px] border border-slate-200 shadow-sm overflow-hidden">
            {/* Tabs Header */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/40 gap-6">
              <div className="flex gap-6 md:gap-10 border-b md:border-b-0 border-slate-100 pb-2 md:pb-0">
                  <button 
                    onClick={() => setActiveTab('invoices')}
                    className={`text-xs md:text-sm font-black uppercase tracking-widest pb-2 transition-all border-b-2 ${activeTab === 'invoices' ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                  >
                    Recent Invoices
                  </button>
                  <button 
                    onClick={() => setActiveTab('payments')}
                    className={`text-xs md:text-sm font-black uppercase tracking-widest pb-2 transition-all border-b-2 ${activeTab === 'payments' ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                  >
                    Payment Logs
                  </button>
              </div>
              <div className="relative w-full md:w-64 no-print">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input type="text" placeholder="Search logs..." className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase focus:ring-4 focus:ring-indigo-500/10 outline-none" />
              </div>
            </div>
            
            <div className="overflow-x-auto overflow-y-hidden">
              {activeTab === 'invoices' ? (
                <table className="w-full text-left min-w-[700px]">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                      <th className="px-8 py-5">Institution</th>
                      <th className="px-8 py-5">Invoice #</th>
                      <th className="px-8 py-5 text-right">Net Amount</th>
                      <th className="px-8 py-5 text-center">Status</th>
                      <th className="px-8 py-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data?.recentInvoices?.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest italic text-sm">No subscription invoices generated yet.</td>
                      </tr>
                    ) : (
                      data?.recentInvoices?.map((bill: any) => (
                        <tr key={bill.id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                             <p className="font-black text-slate-900 text-sm tracking-tight mb-1">{bill.school.name}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{bill.school.subdomain}.edupulse.io</p>
                          </td>
                          <td className="px-8 py-6 font-mono text-[11px] text-indigo-600 font-black uppercase tracking-tighter leading-none">{bill.invoiceNumber}</td>
                          <td className="px-8 py-6 font-black text-slate-900 text-sm text-right leading-none">रू {Number(bill.totalAmount).toLocaleString()}</td>
                          <td className="px-8 py-6 text-center">
                            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                              bill.status === 'PAID' ? 'bg-green-50 text-green-700 border-green-200' : 
                              bill.status === 'PARTIAL' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-red-50 text-red-600 border-red-200'
                            }`}>
                              {bill.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <Link href={`/super-admin/billing/invoice/${bill.id}`} className="p-3 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all inline-flex items-center justify-center border border-slate-100">
                                <Printer className="w-4 h-4" />
                             </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left min-w-[700px]">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
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
                        <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest italic text-sm">No payments recorded in history.</td>
                      </tr>
                    ) : (
                      data?.recentPayments?.map((payment: any) => (
                        <tr key={payment.id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6 font-black text-slate-900 text-sm tracking-tight">{payment.invoice.school.name}</td>
                          <td className="px-8 py-6 font-mono text-[11px] text-indigo-600 font-black uppercase tracking-tighter leading-none">{payment.receiptNumber}</td>
                          <td className="px-8 py-6 font-black text-green-600 text-sm text-right leading-none">रू {Number(payment.amount).toLocaleString()}</td>
                          <td className="px-8 py-6 text-center text-[10px] md:text-xs font-bold text-slate-500 uppercase">
                             {new Date(payment.date).toLocaleDateString('en-GB')}
                          </td>
                          <td className="px-8 py-6 font-black text-slate-400 text-[10px] uppercase tracking-widest leading-none bg-slate-50/50">{payment.mode}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar Stats */}
        <div className="space-y-8">
          <div className="bg-white rounded-[40px] md:rounded-[48px] border border-slate-200 p-8 md:p-10 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-center mb-10 relative z-10">
                <h4 className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none text-slate-900">Plan <br/>Allocation</h4>
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <Zap className="w-6 h-6 text-indigo-600" />
                </div>
            </div>
            <div className="space-y-8 relative z-10">
              {data?.plansCount?.map((plan: any) => (
                <div key={plan.name} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 leading-none">{plan.name}</p>
                    </div>
                    <p className="text-xs md:text-sm font-black text-slate-900 uppercase leading-none">{plan.count} Institutions</p>
                  </div>
                  <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden shadow-inner border border-slate-100">
                    <div 
                      className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(79,70,229,0.3)]" 
                      style={{ width: `${totalSchools > 0 ? (plan.count / totalSchools) * 100 : 0}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/[0.03] to-transparent pointer-events-none"></div>
          </div>

          <div className="bg-indigo-50 p-8 rounded-[40px] border border-indigo-100 shadow-sm">
             <div className="flex items-center gap-4 mb-8">
                <History className="w-6 h-6 text-indigo-600" />
                <h4 className="text-xs md:text-sm font-black text-indigo-950 uppercase tracking-widest leading-none">Platform Insight Node</h4>
             </div>
             <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] md:text-xs font-black text-indigo-700 uppercase tracking-tighter">
                   <span>Avg. Payment Value</span>
                   <span className="font-black text-slate-900">रू {(data?.recentPayments?.length > 0 ? (realizedRevenue / data.recentPayments.length) : 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] md:text-xs font-black text-indigo-700 uppercase tracking-tighter">
                   <span>Paid Statement Count</span>
                   <span className="font-black text-slate-900">{data?.recentInvoices?.filter((i: any) => i.status === 'PAID').length} Records</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
