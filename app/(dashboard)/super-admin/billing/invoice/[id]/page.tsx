"use client";

import React, { useEffect, useState } from 'react';
import { School, Printer, ArrowLeft, CheckCircle2, Scissors, Landmark, FileText, User, Calendar, Hash } from 'lucide-react';
import Link from 'next/link';
import { getSaaSInvoiceById } from '@/actions/subscription';

// Helper to convert number to words (Simple version for NPR)
function numberToWords(num: number): string {
  const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
  const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  if ((num = num.toString()).length > 9) return 'overflow';
  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return ''; 
  let str = '';
  str += (Number(n[1]) != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
  str += (Number(n[2]) != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
  str += (Number(n[3]) != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
  str += (Number(n[4]) != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
  str += (Number(n[5]) != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
  return str.trim() + ' rupees only';
}

export default function SaaSInvoicePrintPage({ params }: { params: { id: string } }) {
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSaaSInvoiceById(params.id).then(res => {
      if (res.success) setInvoice(res.data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-slate-400 animate-pulse uppercase tracking-[0.2em]">Preparing Official Tax Invoice...</div>;
  if (!invoice) return <div className="min-h-screen flex items-center justify-center font-black text-red-500">ERROR: INVOICE NOT FOUND</div>;

  const InvoiceCopy = ({ type }: { type: string }) => {
    const paid = invoice.payments.reduce((acc: number, p: any) => acc + Number(p.amount), 0);
    const payable = Number(invoice.totalAmount);
    const dues = Math.max(0, payable - paid);

    return (
      <div className="bg-white p-6 relative border-[3px] border-double border-slate-900 overflow-hidden" style={{ height: '142mm', width: '210mm' }}>
        
        {/* Header Section */}
        <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4 mb-4">
          <div className="flex items-center gap-4">
             <div className="w-20 h-20 bg-slate-900 rounded-lg flex items-center justify-center">
                <Landmark className="w-12 h-12 text-white" />
             </div>
             <div>
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">EduPulse SMS</h1>
                <p className="text-[10px] font-bold text-slate-600 uppercase mt-1">Advanced Digital Governance Platform</p>
                <div className="text-[9px] font-medium text-slate-500 mt-1 uppercase">
                   <p>Kathmandu-32, Bagmati, Nepal</p>
                   <p>PAN No: 601234567 | Reg: 120034/078</p>
                </div>
             </div>
          </div>
          <div className="text-right">
             <div className="bg-slate-900 text-white px-4 py-1 inline-block text-[10px] font-black uppercase tracking-widest rounded mb-2">
                {type}
             </div>
             <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight leading-none">Tax Invoice</h2>
             <p className="text-xs font-mono font-black text-indigo-600 mt-1">{invoice.invoiceNumber}</p>
          </div>
        </div>

        {/* Customer & Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
           <div className="border border-slate-200 p-3 rounded-lg flex items-start gap-3 bg-slate-50">
              <div className="bg-white p-2 rounded-md shadow-sm border border-slate-100">
                 <School className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Bill To (School)</p>
                 <h3 className="text-sm font-black text-slate-900 uppercase">{invoice.school.name}</h3>
                 <p className="text-[9px] text-slate-500 font-bold uppercase">{invoice.school.address || 'Hetauda, Nepal'}</p>
                 <p className="text-[8px] text-indigo-500 font-black mt-0.5 uppercase">Email: {invoice.school.email || 'N/A'}</p>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-2">
              <div className="border border-slate-200 p-2 rounded-lg text-center bg-slate-50">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 flex items-center justify-center gap-1">
                    <Calendar className="w-2.5 h-2.5" /> Date
                 </p>
                 <p className="text-[10px] font-bold text-slate-900">{new Date(invoice.createdAt).toLocaleDateString('en-GB')}</p>
              </div>
              <div className="border border-slate-200 p-2 rounded-lg text-center bg-slate-50">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 flex items-center justify-center gap-1">
                    <Hash className="w-2.5 h-2.5" /> Receipt No
                 </p>
                 <p className="text-[10px] font-bold text-slate-900">{invoice.invoiceNumber.split('-').pop()}</p>
              </div>
              <div className="col-span-2 border border-slate-200 p-2 rounded-lg flex justify-between items-center bg-slate-50 px-4">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Status
                 </p>
                 <p className={`text-[10px] font-black uppercase ${invoice.status === 'PAID' ? 'text-green-600' : 'text-red-600'}`}>
                    {invoice.status}
                 </p>
              </div>
           </div>
        </div>

        {/* Main Table */}
        <div className="flex-1 min-h-[180px]">
           <table className="w-full border-collapse">
              <thead>
                 <tr className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest">
                    <th className="border border-slate-900 py-2 px-3 text-left w-12">S.N.</th>
                    <th className="border border-slate-900 py-2 px-3 text-left">Particulars</th>
                    <th className="border border-slate-900 py-2 px-3 text-right w-24">Rate</th>
                    <th className="border border-slate-900 py-2 px-3 text-center w-16">Qty</th>
                    <th className="border border-slate-900 py-2 px-3 text-right w-32">Amount (NPR)</th>
                 </tr>
              </thead>
              <tbody className="text-[10px] font-bold text-slate-800">
                 {Array.isArray(invoice.billingItems) && invoice.billingItems.map((item: any, i: number) => (
                    <tr key={i}>
                       <td className="border border-slate-200 py-2 px-3 text-center">{i + 1}</td>
                       <td className="border border-slate-200 py-2 px-3 uppercase">{item.name}</td>
                       <td className="border border-slate-200 py-2 px-3 text-right">रू {Math.abs(Number(item.price)).toLocaleString()}</td>
                       <td className="border border-slate-200 py-2 px-3 text-center">1</td>
                       <td className="border border-slate-200 py-2 px-3 text-right font-black">रू {Math.abs(Number(item.price)).toLocaleString()}</td>
                    </tr>
                 ))}
                 {/* Fill empty rows to maintain height */}
                 {[...Array(Math.max(0, 3 - (invoice.billingItems?.length || 0)))].map((_, i) => (
                    <tr key={`empty-${i}`}>
                       <td className="border border-slate-200 py-3 px-3"></td>
                       <td className="border border-slate-200 py-3 px-3"></td>
                       <td className="border border-slate-200 py-3 px-3"></td>
                       <td className="border border-slate-200 py-3 px-3"></td>
                       <td className="border border-slate-200 py-3 px-3"></td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

        {/* Footer & Totals */}
        <div className="mt-4 flex justify-between items-end border-t-2 border-slate-900 pt-4">
           <div className="space-y-4">
              <div className="max-w-[300px]">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total in Words</p>
                 <p className="text-[10px] font-black text-slate-900 uppercase italic">
                    {numberToWords(Number(invoice.totalAmount))}
                 </p>
              </div>
              <div className="flex gap-12 pt-4">
                 <div className="text-center w-36 border-t border-slate-300 pt-1">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Receiver's Sign</p>
                 </div>
                 <div className="text-center w-36 border-t border-slate-900 pt-1 relative">
                    {invoice.status === 'PAID' && (
                       <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-16 border-2 border-green-600 rounded-full flex items-center justify-center rotate-12 opacity-40">
                          <p className="text-[8px] font-black text-green-600 uppercase">PAID</p>
                       </div>
                    )}
                    <p className="text-[8px] font-black text-slate-900 uppercase tracking-widest">Accountant</p>
                 </div>
              </div>
           </div>

           <div className="w-64 space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                 <span>Gross Amount</span>
                 <span>रू {Number(invoice.amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-green-600 uppercase">
                 <span>Discount / Credit</span>
                 <span>- रू {Number(invoice.discount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-black text-slate-900 uppercase tracking-tighter border-y border-slate-200 py-1 my-1">
                 <span>Net Payable</span>
                 <span>रू {Number(invoice.totalAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase pt-1">
                 <span className={dues > 0 ? 'text-red-600' : 'text-green-600'}>
                    {dues > 0 ? 'Current Dues' : 'Amount Settled'}
                 </span>
                 <span className={dues > 0 ? 'text-red-600' : 'text-green-600'}>
                    रू {dues.toLocaleString()}
                 </span>
              </div>
           </div>
        </div>

        {/* Note Footer */}
        <div className="absolute bottom-2 left-6 right-6 flex justify-between text-[7px] font-bold text-slate-400 uppercase tracking-[0.2em]">
           <span>* This is a computer generated invoice *</span>
           <span>EduPulse SMS - The Heart of School Management</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      {/* Action Bar */}
      <div className="max-w-[210mm] mx-auto no-print mb-6 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
         <div>
            <Link href="/super-admin/billing" className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-indigo-600 transition-colors">
               <ArrowLeft className="w-4 h-4" /> Back to Billing Dashboard
            </Link>
            <h1 className="text-xl font-black text-slate-900 uppercase mt-1">Official Print Terminal</h1>
         </div>
         <div className="flex gap-4">
            <button 
               onClick={() => window.print()} 
               className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-3 shadow-lg active:scale-95"
            >
               <Printer className="w-5 h-5" /> Print A4 Duo Copy
            </button>
         </div>
      </div>

      {/* Printable Wrapper */}
      <div id="printable-invoice-area" className="mx-auto bg-white shadow-2xl print:shadow-none flex flex-col gap-0" style={{ width: '210mm' }}>
         <InvoiceCopy type="Institutional Office Copy" />
         
         {/* Perforation Line */}
         <div className="relative h-[12mm] flex items-center justify-center no-print-bg bg-slate-50 border-y border-slate-200 print:border-slate-900/10">
            <div className="w-full border-t-2 border-dashed border-slate-300 print:border-slate-400"></div>
            <div className="absolute bg-white px-6 py-1 border-2 border-slate-200 rounded-full flex items-center gap-3 no-print">
               <Scissors className="w-4 h-4 text-slate-400 rotate-90" />
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Perforation Line</span>
            </div>
         </div>

         <InvoiceCopy type="Client Recipient Copy" />
      </div>

      {/* Print Instructions */}
      <div className="max-w-[210mm] mx-auto no-print mt-8 p-6 bg-slate-900 rounded-2xl text-white text-center shadow-xl">
         <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Print Configuration</p>
         <p className="text-[10px] font-bold leading-relaxed max-w-md mx-auto">
            This invoice is calibrated for A4 Portrait. In the print dialog, set "Scale" to 100% and enable "Background Graphics" for the official watermark and seal effects.
         </p>
      </div>
    </div>
  );
}
