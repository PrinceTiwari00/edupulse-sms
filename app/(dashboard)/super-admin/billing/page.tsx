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
  Search
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

  if (loading) return <div className="p-10 font-black text-slate-400 uppercase animate-pulse">Initializing SaaS Financials...</div>;

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">SaaS Billing Engine</h1>
          <p className="text-slate-500 font-medium mt-2">NPR Revenue Engine & Institutional Licensing</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowPlanEditor(true)} className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 shadow-sm"><Settings className="w-5 h-5 text-slate-400" /></button>
          <button 
            onClick={() => setShowInvoicer(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all uppercase tracking-widest"
          >
            <Plus className="w-4 h-4" />
            Generate Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Platform Collection</p>
               <h2 className="text-4xl font-black tracking-tighter">रू {financials.totalCollected.toLocaleString()}</h2>
               <p className="text-xs text-indigo-400 font-bold mt-2">+12% From Last Month</p>
            </div>
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
         </div>
         
         <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-indigo-100 transition-all">
            <div className="p-4 bg-amber-50 rounded-2xl group-hover:scale-110 transition-transform">
               <History className="w-8 h-8 text-amber-600" />
            </div>
            <div>
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Total Platform Dues</p>
               <p className="text-3xl font-black text-slate-900 mt-2">रू {financials.totalPending.toLocaleString()}</p>
            </div>
         </div>

         <div className="bg-indigo-50 p-8 rounded-[40px] border border-indigo-100 flex items-center gap-6 cursor-pointer hover:bg-indigo-100 transition-all" onClick={() => setShowPromoSetup(true)}>
            <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
               <Tag className="w-8 h-8 text-white" />
            </div>
            <div>
               <p className="text-xs font-black text-indigo-900 uppercase tracking-widest leading-none">Promo Center</p>
               <p className="text-sm font-bold text-indigo-700 mt-2 uppercase">Create Discount Code</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Institutional Invoices</h3>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search Invoice # or School..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
                    />
                  </div>
               </div>
               
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                           <th className="px-8 py-5">Invoice #</th>
                           <th className="px-8 py-5">School Name</th>
                           <th className="px-8 py-5 text-right">Total Payable</th>
                           <th className="px-8 py-5 text-right">Remaining Dues</th>
                           <th className="px-8 py-5 text-center">Status</th>
                           <th className="px-8 py-5"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {filteredInvoices.length === 0 ? (
                           <tr><td colSpan={6} className="px-8 py-20 text-center text-slate-300 font-bold uppercase tracking-widest">No invoices found.</td></tr>
                        ) : filteredInvoices.map((inv) => {
                           const paidAmount = inv.payments.reduce((acc: number, p: any) => acc + Number(p.amount), 0);
                           const dues = Math.max(0, Number(inv.totalAmount) - paidAmount);
                           
                           return (
                             <tr key={inv.id} className="group hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-6 font-mono font-black text-[10px] text-indigo-600 uppercase">{inv.invoiceNumber}</td>
                                <td className="px-8 py-6">
                                   <p className="font-black text-slate-900 text-sm tracking-tight">{inv.school.name}</p>
                                   {Number(inv.school.walletBalance) > 0 && (
                                      <p className="text-[8px] text-indigo-600 font-black uppercase bg-indigo-50 px-2 py-0.5 rounded-full w-fit border border-indigo-100 mt-0.5">
                                         Wallet: रू {Number(inv.school.walletBalance).toLocaleString()}
                                      </p>
                                   )}
                                </td>
                                <td className="px-8 py-6 font-black text-slate-900 text-sm text-right">रू {Number(inv.totalAmount).toLocaleString()}</td>
                                <td className={`px-8 py-6 font-black text-sm text-right ${dues > 0 ? 'text-red-600' : 'text-slate-400'}`}>
                                   रू {dues.toLocaleString()}
                                </td>
                                <td className="px-8 py-6 text-center">
                                   <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider ${
                                      inv.status === 'PAID' ? 'bg-green-50 text-green-700' :
                                      inv.status === 'PARTIAL' ? 'bg-blue-100 text-blue-700' : 'bg-red-50 text-red-600'
                                   }`}>
                                      {inv.status}
                                   </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                   <div className="flex justify-end gap-2">
                                     {inv.status !== 'PAID' && (
                                       <button 
                                          onClick={() => { setSelectedInvoice(inv); setShowCollector(true); }}
                                          className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg"
                                       >
                                          Collect Dues
                                       </button>
                                     )}
                                     <button 
                                        onClick={() => setShowHistory(inv)}
                                        className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                        title="Payment History"
                                     >
                                        <History className="w-4 h-4" />
                                     </button>
                                     <button onClick={() => handleDeleteInvoice(inv.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                     </button>
                                     <Link href={`/super-admin/billing/invoice/${inv.id}`} className="p-2 hover:bg-slate-200 rounded-xl transition-colors inline-block">
                                        <Printer className="w-4 h-4 text-slate-300" />
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
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Recent Payment Receipts</h3>
                  <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Download Ledger</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                           <th className="px-8 py-5">Receipt #</th>
                           <th className="px-8 py-5">Institution</th>
                           <th className="px-8 py-5">Date</th>
                           <th className="px-8 py-5">Mode</th>
                           <th className="px-8 py-5 text-right">Amount</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {receipts.length === 0 ? (
                           <tr><td colSpan={5} className="px-8 py-20 text-center text-slate-300 font-bold uppercase tracking-widest">No payment records found.</td></tr>
                        ) : receipts.map((rcp) => (
                           <tr key={rcp.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-8 py-6 font-mono text-[10px] text-indigo-600 font-black uppercase">{rcp.receiptNumber}</td>
                              <td className="px-8 py-6 font-bold text-slate-900 text-sm tracking-tight">{rcp.invoice.school.name}</td>
                              <td className="px-8 py-6 text-xs text-slate-500 font-medium">{new Date(rcp.date).toLocaleDateString()}</td>
                              <td className="px-8 py-6 font-black text-slate-400 text-[9px] uppercase tracking-widest">{rcp.mode}</td>
                              <td className="px-8 py-6 font-black text-slate-900 text-sm text-right text-green-600">रू {Number(rcp.amount).toLocaleString()}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-50 bg-slate-50/30">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Manage Promos</h4>
               </div>
               <div className="divide-y divide-slate-50">
                  {promos.length === 0 ? (
                    <div className="p-6 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">No promo codes found.</div>
                  ) : promos.map(promo => (
                    <div key={promo.id} className="p-4 flex items-center justify-between">
                       <div>
                          <p className="font-black text-indigo-600 text-xs uppercase">{promo.code}</p>
                          <p className="text-[10px] font-medium text-slate-400">-{promo.discount}{promo.isPercent ? '%' : ' NPR'}</p>
                       </div>
                       <button onClick={() => handleDeletePromo(promo.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-indigo-600 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
               <h4 className="text-xl font-black tracking-tight mb-8 relative z-10 uppercase">SaaS Tiers</h4>
               <div className="space-y-4 relative z-10">
                  {plans.map((plan) => (
                     <div key={plan.id} className="p-4 bg-white/10 rounded-2xl border border-white/10 flex justify-between items-center group">
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em]">{plan.name}</p>
                           <p className="text-lg font-black mt-1 text-white">रू {Number(plan.price).toLocaleString()}</p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-indigo-300" />
                     </div>
                  ))}
                  {plans.length === 0 && (
                    <div className="text-[10px] font-black uppercase text-indigo-200">Go to Pricing Manager to initialize tiers.</div>
                  )}
               </div>
               <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            </div>
         </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. Invoicer Modal */}
      {showInvoicer && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30 text-slate-900">
                  <h2 className="text-xl font-black uppercase">Institutional Invoicer</h2>
                  <button onClick={() => { setShowInvoicer(false); setFormError(''); }} className="font-black text-slate-300 hover:text-slate-900">✕</button>
               </div>
               <form onSubmit={handleGenerateInvoice} className="p-8 space-y-5">
                  {formError && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-2">
                       <AlertCircle className="w-4 h-4" /> {formError}
                    </div>
                  )}
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select School</label>
                     <select name="schoolId" required className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold">
                        <option value="">Choose Institution...</option>
                        {schools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                     </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Plan</label>
                        <select name="plan" required className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold">
                           <option value="BASIC">BASIC</option>
                           <option value="PRO">PRO</option>
                           <option value="ENTERPRISE">ENTERPRISE</option>
                        </select>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Promo Code</label>
                        <input name="promo" type="text" placeholder="Optional" className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold uppercase" />
                     </div>
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Due Date</label>
                     <input 
                        name="dueDate" 
                        type="date" 
                        required 
                        defaultValue={new Date().toLocaleDateString('en-CA')}
                        className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" 
                     />
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-sm shadow-xl hover:bg-indigo-600 transition-all uppercase tracking-widest">
                     Generate SaaS Bill
                  </button>
               </form>
            </div>
         </div>
      )}

      {/* 2. Plan Editor */}
      {showPlanEditor && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30 text-slate-900">
                  <h2 className="text-xl font-black uppercase">Pricing Manager</h2>
                  <button onClick={() => setShowPlanEditor(false)} className="font-black text-slate-300">✕</button>
               </div>
               <form onSubmit={handleUpdatePrice} className="p-8 space-y-6">
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Tier</label>
                     <select name="plan" className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 text-sm font-black">
                        <option value="BASIC">BASIC</option>
                        <option value="PRO">PRO</option>
                        <option value="ENTERPRISE">ENTERPRISE</option>
                     </select>
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Yearly Price (NPR)</label>
                     <input name="price" type="number" required placeholder="0.00" className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" />
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest">Update Price Tier</button>
               </form>
            </div>
         </div>
      )}

      {/* 3. Collector Modal */}
      {showCollector && selectedInvoice && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
               <div className="p-8 border-b border-slate-50 bg-green-600 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Payment Collection</p>
                  <h2 className="text-2xl font-black uppercase mt-1">{selectedInvoice.school.name}</h2>
                  {(() => {
                      const paidAmount = selectedInvoice.payments.reduce((acc: number, p: any) => acc + Number(p.amount), 0);
                      const dues = Math.max(0, Number(selectedInvoice.totalAmount) - paidAmount);
                      return <p className="text-sm font-bold mt-2 uppercase tracking-widest">Dues Remaining: रू {dues.toLocaleString()}</p>
                  })()}
               </div>
               <form onSubmit={handleCollect} className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amount Recieved</label>
                        <input name="amount" type="number" required className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Extra Discount</label>
                        <input name="manualDiscount" type="number" placeholder="0.00" className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold text-green-600" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Mode</label>
                        <select name="mode" className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 text-sm font-black">
                           <option value="CASH">CASH</option>
                           <option value="BANK_TRANSFER">BANK TRANSFER</option>
                           <option value="CHEQUE">CHEQUE</option>
                           <option value="ONLINE">ONLINE</option>
                        </select>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reference</label>
                        <input name="ref" type="text" placeholder="TXN ID / Cheque #" className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" />
                     </div>
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                     <Banknote className="w-5 h-5" /> Confirm Payment
                  </button>
               </form>
            </div>
         </div>
      )}

      {/* 4. Promo Setup */}
      {showPromoSetup && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-[40px] w-full max-w-lg shadow-2xl overflow-hidden">
               <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-indigo-50/30 text-indigo-900">
                  <h2 className="text-xl font-black uppercase">Promo Code Generator</h2>
                  <button onClick={() => setShowPromoSetup(false)} className="font-black text-indigo-300 hover:text-indigo-900">✕</button>
               </div>
               <form onSubmit={handleCreatePromo} className="p-8 space-y-6">
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Unique Code</label>
                     <input name="code" type="text" placeholder="WELCOME50" required className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-black uppercase" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Discount Value</label>
                        <input name="discount" type="number" required className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Discount Type</label>
                        <select name="isPercent" className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 text-sm font-black">
                           <option value="true">PERCENTAGE %</option>
                           <option value="false">FIXED NPR रू</option>
                        </select>
                     </div>
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest">Activate Promo Code</button>
               </form>
            </div>
         </div>
      )}

      {/* 5. Payment History Modal */}
      {showHistory && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-[40px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase">Payment History</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase mt-1">Invoice: {showHistory.invoiceNumber}</p>
                  </div>
                  <button onClick={() => setShowHistory(null)} className="p-2 hover:bg-slate-200 rounded-2xl transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
               </div>
               <div className="p-8">
                  <div className="space-y-4">
                     {showHistory.payments.length === 0 ? (
                        <div className="py-20 text-center text-slate-300 font-bold uppercase tracking-widest">No payments made yet.</div>
                     ) : showHistory.payments.map((p: any) => (
                        <div key={p.id} className="p-5 flex items-center justify-between bg-slate-50 rounded-[24px] border border-slate-100">
                           <div className="flex items-center gap-4">
                              <div className="p-3 bg-white rounded-xl shadow-sm text-green-600">
                                 <Banknote className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{p.mode}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(p.date).toLocaleString()} • {p.receiptNumber}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-lg font-black text-slate-900">रू {Number(p.amount).toLocaleString()}</p>
                              {p.reference && <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Ref: {p.reference}</p>}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="p-8 bg-slate-50 border-t flex justify-between items-center">
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Paid</p>
                     <p className="text-2xl font-black text-indigo-600">रू {showHistory.payments.reduce((acc: number, p: any) => acc + Number(p.amount), 0).toLocaleString()}</p>
                  </div>
                  <button onClick={() => setShowHistory(null)} className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Close Record</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
