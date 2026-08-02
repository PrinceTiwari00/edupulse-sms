"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Printer, 
  ArrowRight,
  History,
  Tag,
  Settings,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Banknote,
  Trash2,
  X,
  Search,
  Zap,
  TrendingUp,
  FileText
} from 'lucide-react';
import { 
  getSaaSInvoices, 
  getSaaSPlans, 
  updateSaaSPlanPrice, 
  generateSaaSInvoice,
  collectSubscriptionPayment,
  getPlatformRevenueNPR,
  createPromoCode,
  getPromoCodes,
  togglePromoStatus,
  deletePromoCode,
  deleteSaaSInvoice,
  getSubscriptionReceipts
} from '@/actions/subscription';
import { getSchools } from '@/actions/school';
import { SubscriptionPlan, PaymentMode } from '@prisma/client';
import Link from 'next/link';

export default function SaaSInstitutionalBilling() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [schools, setSchools] = useState<any[]>([]);
  const [promos, setPromos] = useState<any[]>([]);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [financials, setFinancials] = useState({ totalCollected: 0, totalPending: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [formError, setFormError] = useState('');

  // Modals state
  const [showInvoicer, setShowInvoicer] = useState(false);
  const [showPlanEditor, setShowPlanEditor] = useState(false);
  const [showPromoSetup, setShowPromoSetup] = useState(false);
  const [showCollector, setShowCollector] = useState(false);
  const [showHistory, setShowHistory] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    const [invRes, planRes, schRes, revRes, promoRes, rcpRes] = await Promise.all([
      getSaaSInvoices(),
      getSaaSPlans(),
      getSchools(),
      getPlatformRevenueNPR(),
      getPromoCodes(),
      getSubscriptionReceipts()
    ]);

    if (invRes.success && invRes.data) setInvoices(invRes.data);
    if (planRes.success && planRes.data) setPlans(planRes.data);
    if (schRes.success && schRes.data) setSchools(schRes.data);
    if (promoRes) setPromos(promoRes);
    if (rcpRes.success && rcpRes.data) setReceipts(rcpRes.data);
    setFinancials(revRes);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Handlers ---
  const handleGenerateInvoice = async (e: any) => {
    e.preventDefault();
    setFormError('');
    const formData = new FormData(e.target);
    const res = await generateSaaSInvoice({
      schoolId: formData.get('schoolId') as string,
      planName: formData.get('plan') as SubscriptionPlan,
      promoCode: formData.get('promo') as string,
      dueDate: new Date(formData.get('dueDate') as string),
    });
    if (res.success) {
      setShowInvoicer(false);
      fetchData();
    } else {
      setFormError(res.error);
    }
  };

  const handleUpdatePrice = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await updateSaaSPlanPrice(
      formData.get('plan') as SubscriptionPlan,
      Number(formData.get('price'))
    );
    if (res.success) fetchData();
  };

  const handleCollect = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await collectSubscriptionPayment({
      invoiceId: selectedInvoice.id,
      amount: Number(formData.get('amount')),
      manualDiscount: Number(formData.get('manualDiscount') || 0),
      mode: formData.get('mode') as PaymentMode,
      reference: formData.get('ref') as string,
    });
    if (res.success) {
      setShowCollector(false);
      fetchData();
    }
  };

  const handleCreatePromo = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await createPromoCode({
      code: formData.get('code') as string,
      discount: Number(formData.get('discount')),
      isPercent: formData.get('isPercent') === 'true'
    });
    if (res.success) {
      setShowPromoSetup(false);
      fetchData();
    }
  };

  const handleDeletePromo = async (id: string) => {
    if (confirm('Delete this promo code?')) {
      await deletePromoCode(id);
      fetchData();
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    if (confirm('Are you sure you want to delete this invoice? This will also remove any associated payment records.')) {
      const res = await deleteSaaSInvoice(id);
      if (res.success) {
        fetchData();
      } else {
        alert(res.error);
      }
    }
  };

  if (loading) return <div className="p-10 font-black text-slate-300 uppercase animate-pulse text-xl tracking-[0.2em]">Synchronizing Billing Engine...</div>;

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Billing Terminal</h1>
          <p className="text-slate-500 font-bold text-lg">Manage NPR revenue, tiered plans, and institutional payment lifecycles.</p>
        </div>
        <div className="flex gap-4 no-print">
          <button onClick={() => setShowPlanEditor(true)} className="p-5 bg-white border-2 border-slate-100 rounded-3xl hover:bg-slate-50 shadow-sm transition-all"><Settings className="w-6 h-6 text-slate-400" /></button>
          <button 
            onClick={() => setShowInvoicer(true)}
            className="flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-[24px] font-black text-sm hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all uppercase tracking-widest active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Issue New Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
         <div className="bg-slate-950 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
               <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-6">Total Realized Revenue</p>
               <h2 className="text-5xl font-black tracking-tighter leading-none">रू {financials.totalCollected.toLocaleString()}</h2>
               <div className="flex items-center gap-2 mt-4 text-green-400 font-black text-xs uppercase tracking-widest bg-green-400/10 w-fit px-3 py-1 rounded-lg border border-green-400/20">
                  <TrendingUp className="w-3.5 h-3.5" /> +12% Growth
               </div>
            </div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] group-hover:bg-indigo-600/20 transition-all duration-700"></div>
         </div>
         
         <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm flex items-center gap-10 group hover:shadow-xl transition-all">
            <div className="p-6 bg-amber-50 rounded-[32px] group-hover:scale-110 transition-transform shadow-sm">
               <History className="w-10 h-10 text-amber-600" />
            </div>
            <div>
               <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-3">Accounts Receivable</p>
               <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">रू {financials.totalPending.toLocaleString()}</p>
            </div>
         </div>

         <div className="bg-indigo-50 p-10 rounded-[48px] border border-indigo-100 flex items-center gap-10 cursor-pointer hover:bg-indigo-100 transition-all group" onClick={() => setShowPromoSetup(true)}>
            <div className="p-6 bg-indigo-600 rounded-[32px] shadow-2xl shadow-indigo-200 group-hover:scale-110 transition-transform">
               <Tag className="w-10 h-10 text-white" />
            </div>
            <div>
               <p className="text-xs font-black text-indigo-900 uppercase tracking-[0.2em] leading-none mb-3">Promo Center</p>
               <p className="text-sm font-black text-indigo-600 mt-2 uppercase tracking-widest bg-white/50 px-4 py-2 rounded-xl border border-indigo-200">Issue Discount Code</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-[56px] border border-slate-100 shadow-xl overflow-hidden">
               <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">SaaS Ledger</h3>
                  <div className="relative w-80 no-print">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search Invoice # or School..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 bg-white border-2 border-slate-50 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 shadow-sm transition-all"
                    />
                  </div>
               </div>
               
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                           <th className="px-10 py-6">Invoice #</th>
                           <th className="px-10 py-6">School Profile</th>
                           <th className="px-10 py-6 text-right">Net Payable</th>
                           <th className="px-10 py-6 text-right">Outstanding</th>
                           <th className="px-10 py-6 text-center">Status</th>
                           <th className="px-10 py-6"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {filteredInvoices.length === 0 ? (
                           <tr><td colSpan={6} className="px-10 py-32 text-center text-slate-300 font-black uppercase tracking-widest text-lg italic">No active billing records found.</td></tr>
                        ) : filteredInvoices.map((inv) => {
                           const paidAmount = inv.payments.reduce((acc: number, p: any) => acc + Number(p.amount), 0);
                           const dues = Math.max(0, Number(inv.totalAmount) - paidAmount);
                           
                           return (
                             <tr key={inv.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                                <td className="px-10 py-8 font-mono font-black text-xs text-indigo-600 uppercase tracking-tighter">{inv.invoiceNumber}</td>
                                <td className="px-10 py-8">
                                   <p className="font-black text-slate-900 text-lg tracking-tight leading-none mb-1">{inv.school.name}</p>
                                   {Number(inv.school.walletBalance) > 0 && (
                                      <span className="text-[9px] text-indigo-600 font-black uppercase bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                                         Wallet: रू {Number(inv.school.walletBalance).toLocaleString()}
                                      </span>
                                   )}
                                </td>
                                <td className="px-10 py-8 font-black text-slate-900 text-lg text-right tracking-tighter leading-none">रू {Number(inv.totalAmount).toLocaleString()}</td>
                                <td className={`px-10 py-8 font-black text-lg text-right tracking-tighter leading-none ${dues > 0 ? 'text-red-600' : 'text-slate-300'}`}>
                                   रू {dues.toLocaleString()}
                                </td>
                                <td className="px-10 py-8 text-center">
                                   <span className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm border-2 ${
                                      inv.status === 'PAID' ? 'bg-green-50 text-green-700 border-green-200' :
                                      inv.status === 'PARTIAL' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-red-50 text-red-600 border-red-200'
                                   }`}>
                                      {inv.status}
                                   </span>
                                </td>
                                <td className="px-10 py-8 text-right">
                                   <div className="flex justify-end gap-3">
                                     {inv.status !== 'PAID' && (
                                       <button 
                                          onClick={() => { setSelectedInvoice(inv); setShowCollector(true); }}
                                          className="bg-slate-950 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
                                       >
                                          Collect
                                       </button>
                                     )}
                                     <button 
                                        onClick={() => setShowHistory(inv)}
                                        className="p-3 bg-white text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-100 rounded-xl transition-all shadow-sm"
                                        title="Payment History"
                                     >
                                        <History className="w-5 h-5" />
                                     </button>
                                     <button onClick={() => handleDeleteInvoice(inv.id)} className="p-3 bg-white text-slate-200 hover:text-red-500 border border-slate-100 rounded-xl transition-all shadow-sm">
                                        <Trash2 className="w-5 h-5" />
                                     </button>
                                     <Link href={`/super-admin/billing/invoice/${inv.id}`} className="p-3 bg-white hover:bg-slate-100 rounded-xl transition-all inline-block border border-slate-100 shadow-sm">
                                        <Printer className="w-5 h-5 text-indigo-500" />
                                     </Link>
                                   </div>
                                </td>
                             </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Payment Record Section */}
            <div className="bg-white rounded-[56px] border border-slate-100 shadow-xl overflow-hidden">
               <div className="p-10 border-b border-slate-50 bg-slate-50/20 flex justify-between items-center">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Recent Receipts</h3>
                  <button className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] bg-indigo-50 px-6 py-3 rounded-xl hover:bg-indigo-100 transition-all">Download Audit Ledger</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                           <th className="px-10 py-6">Receipt ID</th>
                           <th className="px-10 py-6">Institution</th>
                           <th className="px-10 py-6 text-center">Settled Date</th>
                           <th className="px-10 py-6">Mode</th>
                           <th className="px-10 py-6 text-right">Settled Amount</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {receipts.length === 0 ? (
                           <tr><td colSpan={5} className="px-10 py-32 text-center text-slate-300 font-black uppercase tracking-widest text-lg italic">No payment records finalized.</td></tr>
                        ) : receipts.map((rcp) => (
                           <tr key={rcp.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-10 py-8 font-mono text-xs text-indigo-600 font-black uppercase tracking-tighter">{rcp.receiptNumber}</td>
                              <td className="px-10 py-8 font-black text-slate-900 text-lg tracking-tight leading-none">{rcp.invoice.school.name}</td>
                              <td className="px-10 py-8 text-center text-sm font-bold text-slate-500 uppercase">{new Date(rcp.date).toLocaleDateString('en-GB')}</td>
                              <td className="px-10 py-8 font-black text-slate-400 text-[10px] uppercase tracking-widest bg-slate-50/50 rounded-lg">{rcp.mode}</td>
                              <td className="px-10 py-8 font-black text-green-600 text-lg text-right tracking-tighter">रू {Number(rcp.amount).toLocaleString()}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div className="space-y-10">
            <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden">
               <div className="p-10 border-b border-slate-50 bg-slate-50/20">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Active Promos</h4>
               </div>
               <div className="divide-y divide-slate-50">
                  {promos.length === 0 ? (
                    <div className="p-10 text-center text-[11px] font-black text-slate-300 uppercase tracking-widest italic">No discount codes configured.</div>
                  ) : promos.map(promo => (
                    <div key={promo.id} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-all">
                       <div>
                          <p className="font-black text-indigo-600 text-lg uppercase tracking-widest leading-none mb-1">{promo.code}</p>
                          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Reduction: {promo.discount}{promo.isPercent ? '%' : ' NPR'}</p>
                       </div>
                       <button onClick={() => handleDeletePromo(promo.id)} className="p-4 bg-white text-slate-200 hover:text-red-500 border border-slate-100 rounded-2xl transition-all shadow-sm">
                          <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-indigo-600 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="flex justify-between items-center mb-10 relative z-10">
                    <h4 className="text-2xl font-black tracking-tighter uppercase leading-none">Subscription <br/>Tiers</h4>
                    <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
               </div>
               <div className="space-y-6 relative z-10">
                  {plans.filter(p => p.name !== 'FREE').map((plan) => (
                     <div key={plan.id} className="p-6 bg-white/10 rounded-[28px] border border-white/10 flex justify-between items-center group/item hover:bg-white/20 transition-all cursor-default shadow-lg shadow-indigo-950/20">
                        <div>
                           <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">{plan.name}</p>
                           <p className="text-3xl font-black mt-1 text-white tracking-tighter leading-none">रू {Number(plan.price).toLocaleString()}</p>
                        </div>
                        <CheckCircle2 className="w-8 h-8 text-indigo-300 group-hover/item:scale-110 transition-transform" />
                     </div>
                  ))}
                  {plans.length === 0 && (
                    <div className="text-xs font-black uppercase text-indigo-200 tracking-widest italic">Go to Pricing Manager to initialize institutional tiers.</div>
                  )}
               </div>
               <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-[80px] group-hover:bg-white/20 transition-all duration-700"></div>
            </div>
         </div>
      </div>

      {/* --- MODALS (Optimized for High Fidelity) --- */}

      {/* 1. Invoicer Modal */}
      {showInvoicer && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl">
            <div className="bg-white rounded-[56px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
               <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/40">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">Institutional Invoicer</h2>
                    <p className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] mt-2">Generate formal SaaS Billing Statements</p>
                  </div>
                  <button onClick={() => { setShowInvoicer(false); setFormError(''); }} className="p-4 bg-slate-50 text-slate-300 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all">✕</button>
               </div>
               <form onSubmit={handleGenerateInvoice} className="p-12 space-y-8">
                  {formError && (
                    <div className="p-6 bg-red-50 border-2 border-red-100 text-red-600 text-xs font-black uppercase tracking-[0.1em] rounded-3xl flex items-center gap-3 shadow-lg shadow-red-100">
                       <AlertCircle className="w-5 h-5" /> {formError}
                    </div>
                  )}
                  <div className="space-y-3">
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Target Institution</label>
                     <select name="schoolId" required className="w-full px-8 py-6 border-2 border-slate-50 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg font-bold transition-all appearance-none cursor-pointer">
                        <option value="">Select School...</option>
                        {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                     </select>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Subscription Tier</label>
                        <select name="plan" required className="w-full px-8 py-6 border-2 border-slate-50 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg font-bold transition-all appearance-none cursor-pointer">
                           <option value="BASIC">BASIC</option>
                           <option value="PRO">PRO</option>
                           <option value="ENTERPRISE">ENTERPRISE</option>
                        </select>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Promotion Code</label>
                        <input name="promo" type="text" placeholder="OPTIONAL" className="w-full px-8 py-6 border-2 border-slate-50 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg font-bold transition-all uppercase tracking-widest placeholder:text-slate-300" />
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Statement Due Date</label>
                     <input 
                        name="dueDate" 
                        type="date" 
                        required 
                        defaultValue={new Date().toLocaleDateString('en-CA')}
                        className="w-full px-8 py-6 border-2 border-slate-50 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg font-bold transition-all" 
                     />
                  </div>
                  <button type="submit" className="w-full bg-slate-950 text-white py-6 rounded-[32px] font-black text-sm shadow-2xl hover:bg-indigo-600 transition-all uppercase tracking-[0.3em] active:scale-95">
                     Issue SaaS Bill
                  </button>
               </form>
            </div>
         </div>
      )}

      {/* 2. Plan Editor */}
      {showPlanEditor && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl">
            <div className="bg-white rounded-[56px] w-full max-w-xl shadow-2xl overflow-hidden">
               <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/40">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Pricing Manager</h2>
                  <button onClick={() => setShowPlanEditor(false)} className="p-4 bg-slate-50 text-slate-300 hover:text-slate-900 rounded-2xl transition-all">✕</button>
               </div>
               <form onSubmit={handleUpdatePrice} className="p-12 space-y-10">
                  <div className="space-y-3">
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Select Tier to Modify</label>
                     <select name="plan" className="w-full px-8 py-6 border-2 border-slate-50 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg font-bold transition-all cursor-pointer">
                        <option value="BASIC">BASIC</option>
                        <option value="PRO">PRO</option>
                        <option value="ENTERPRISE">ENTERPRISE</option>
                     </select>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">New Subscription Price (NPR)</label>
                     <input name="price" type="number" required placeholder="0.00" className="w-full px-8 py-6 border-2 border-slate-50 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg font-bold transition-all" />
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 text-white py-6 rounded-[32px] font-black text-sm shadow-2xl hover:bg-indigo-700 transition-all uppercase tracking-[0.3em] active:scale-95">Update License Cost</button>
               </form>
            </div>
         </div>
      )}

      {/* 3. Collector Modal */}
      {showCollector && selectedInvoice && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl">
            <div className="bg-white rounded-[56px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
               <div className="p-12 border-b border-slate-50 bg-green-600 text-white shadow-xl shadow-green-100">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-60 mb-4 leading-none">Payment Settle Terminal</p>
                  <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">{selectedInvoice.school.name}</h2>
                  {(() => {
                      const paidAmount = selectedInvoice.payments.reduce((acc: number, p: any) => acc + Number(p.amount), 0);
                      const dues = Math.max(0, Number(selectedInvoice.totalAmount) - paidAmount);
                      return <p className="text-xl font-bold mt-4 uppercase tracking-widest text-green-100">Outstanding: रू {dues.toLocaleString()}</p>
                  })()}
               </div>
               <form onSubmit={handleCollect} className="p-12 space-y-10">
                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-3 text-center">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Amount Recieved</label>
                        <input name="amount" type="number" required className="w-full px-8 py-6 border-2 border-slate-50 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-2xl font-black transition-all text-center" />
                     </div>
                     <div className="space-y-3 text-center text-green-600">
                        <label className="text-[11px] font-black text-green-600/50 uppercase tracking-[0.3em]">Supplementary Discount</label>
                        <input name="manualDiscount" type="number" placeholder="0.00" className="w-full px-8 py-6 border-2 border-slate-50 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-2xl font-black transition-all text-center placeholder:text-slate-200" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Settle Mode</label>
                        <select name="mode" className="w-full px-8 py-6 border-2 border-slate-50 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg font-bold transition-all cursor-pointer">
                           <option value="CASH">CASH</option>
                           <option value="BANK_TRANSFER">BANK TRANSFER</option>
                           <option value="CHEQUE">CHEQUE</option>
                           <option value="ONLINE">ONLINE</option>
                        </select>
                     </div>
                     <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Transaction Ref #</label>
                        <input name="ref" type="text" placeholder="TXN / CHEQUE ID" className="w-full px-8 py-6 border-2 border-slate-50 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg font-bold transition-all uppercase placeholder:text-slate-300" />
                     </div>
                  </div>
                  <button type="submit" className="w-full bg-slate-950 text-white py-7 rounded-[32px] font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:bg-green-600 transition-all flex items-center justify-center gap-4 active:scale-95">
                     <Banknote className="w-7 h-7" /> Confirm Settlement
                  </button>
               </form>
            </div>
         </div>
      )}

      {/* 4. Promo Setup */}
      {showPromoSetup && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl">
            <div className="bg-white rounded-[56px] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
               <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-indigo-50/50 text-indigo-900">
                  <h2 className="text-2xl font-black uppercase tracking-tighter">Promo Generator</h2>
                  <button onClick={() => setShowPromoSetup(false)} className="p-4 bg-white/50 text-indigo-300 hover:text-indigo-900 rounded-2xl transition-all">✕</button>
               </div>
               <form onSubmit={handleCreatePromo} className="p-12 space-y-10">
                  <div className="space-y-3">
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Unique Access Code</label>
                     <input name="code" type="text" placeholder="E.G. LAUNCH2024" required className="w-full px-8 py-6 border-2 border-slate-50 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-xl font-black uppercase transition-all tracking-widest placeholder:text-slate-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-3 text-center">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Reduction Value</label>
                        <input name="discount" type="number" required className="w-full px-8 py-6 border-2 border-slate-50 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-2xl font-black transition-all text-center" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Type</label>
                        <select name="isPercent" className="w-full px-8 py-6 border-2 border-slate-50 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg font-black transition-all cursor-pointer">
                           <option value="true">PERCENTAGE %</option>
                           <option value="false">FIXED NPR रू</option>
                        </select>
                     </div>
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 text-white py-6 rounded-[32px] font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:bg-indigo-700 transition-all active:scale-95">Activate Promo Pipeline</button>
               </form>
            </div>
         </div>
      )}

      {/* 5. Payment History Modal */}
      {showHistory && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl">
            <div className="bg-white rounded-[56px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
               <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/40">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">Settlement Audit</h2>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Statement: {showHistory.invoiceNumber}</p>
                  </div>
                  <button onClick={() => setShowHistory(null)} className="p-4 bg-slate-50 text-slate-300 hover:text-slate-900 rounded-2xl transition-all">
                    <X className="w-6 h-6" />
                  </button>
               </div>
               <div className="p-12">
                  <div className="space-y-6">
                     {showHistory.payments.length === 0 ? (
                        <div className="py-24 text-center text-slate-300 font-black uppercase tracking-widest text-lg italic">No realized payments found.</div>
                     ) : showHistory.payments.map((p: any) => (
                        <div key={p.id} className="p-6 flex items-center justify-between bg-slate-50 rounded-[32px] border-2 border-slate-50 hover:border-indigo-100 transition-all shadow-sm group">
                           <div className="flex items-center gap-6">
                              <div className="p-4 bg-white rounded-2xl shadow-sm text-green-600 group-hover:scale-110 transition-transform">
                                 <Banknote className="w-6 h-6" />
                              </div>
                              <div>
                                 <p className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none mb-1">{p.mode}</p>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{new Date(p.date).toLocaleString()} • {p.receiptNumber}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">रू {Number(p.amount).toLocaleString()}</p>
                              {p.reference && <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mt-1">Ref: {p.reference}</p>}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="p-12 bg-slate-950 border-t flex justify-between items-center text-white">
                  <div>
                     <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2 leading-none">Total Realized</p>
                     <p className="text-4xl font-black tracking-tighter leading-none">रू {showHistory.payments.reduce((acc: number, p: any) => acc + Number(p.amount), 0).toLocaleString()}</p>
                  </div>
                  <button onClick={() => setShowHistory(null)} className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all">Close Audit</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
