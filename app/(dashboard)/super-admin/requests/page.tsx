"use client";

import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  Clock, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  Search,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { getPendingRequests, approveSchoolRequest, rejectSchoolRequest } from '@/actions/school';

export default function SuperAdminRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    const res = await getPendingRequests();
    if (res.success && res.data) {
      setRequests(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    const res = await approveSchoolRequest(id);
    if (res.success) fetchRequests();
    setProcessingId(null);
  };

  const handleReject = async (id: string) => {
    setProcessingId(id);
    const res = await rejectSchoolRequest(id);
    if (res.success) fetchRequests();
    setProcessingId(null);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Onboarding Queue</h1>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">Review and verify new institutional registration requests for platform access.</p>
        </div>
        <div className="flex gap-4 no-print">
            <div className="bg-amber-50 text-amber-700 px-6 py-3 rounded-2xl text-xs font-black border border-amber-100 shadow-sm flex items-center gap-3 uppercase tracking-widest">
                <Clock className="w-5 h-5 animate-pulse" />
                {requests.length} Pending Actions
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {loading ? (
          <div className="bg-white p-32 rounded-[56px] border border-slate-100 text-center text-slate-300 font-black uppercase tracking-[0.3em] text-xl animate-pulse">
            Scanning for institutional requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white p-32 rounded-[56px] border border-slate-100 text-center space-y-10 shadow-sm">
            <div className="inline-flex p-10 bg-slate-50 rounded-[40px] text-slate-200 border border-slate-100 shadow-inner">
               <CheckCircle2 className="w-24 h-24" />
            </div>
            <div className="space-y-2">
               <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Queue is Synchronized</h3>
               <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">No pending school registrations found in the live buffer.</p>
            </div>
          </div>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border-l-8 border-l-amber-400">
              <div className="p-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-12">
                <div className="flex items-start gap-10">
                  <div className="w-24 h-24 rounded-[32px] bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner border border-amber-100 group-hover:scale-110 transition-transform duration-500">
                    <Clock className="w-12 h-12" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none uppercase">{req.name}</h3>
                    <div className="flex flex-wrap gap-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                       <span className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl text-indigo-600 border border-indigo-100/50 shadow-sm leading-none"><Globe className="w-4 h-4" /> {req.subdomain}.edupulse.io</span>
                       <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 leading-none"><Mail className="w-4 h-4 text-indigo-400" /> {req.email}</span>
                       <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 leading-none"><Phone className="w-4 h-4 text-indigo-400" /> {req.phone}</span>
                       <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 leading-none"><Calendar className="w-4 h-4 text-indigo-400" /> Issued: {new Date(req.createdAt).toLocaleDateString('en-GB')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 w-full xl:w-auto">
                   <button 
                     onClick={() => handleReject(req.id)}
                     disabled={processingId === req.id}
                     className="flex-1 xl:flex-none flex items-center justify-center gap-3 px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest text-red-600 bg-red-50 hover:bg-red-100 transition-all border-2 border-red-100 active:scale-95 disabled:opacity-50"
                   >
                     <X className="w-5 h-5" /> Reject Access
                   </button>
                   <button 
                     onClick={() => handleApprove(req.id)}
                     disabled={processingId === req.id}
                     className="flex-1 xl:flex-none flex items-center justify-center gap-4 px-12 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest text-white bg-green-600 hover:bg-green-700 transition-all shadow-2xl shadow-green-900/20 active:scale-95 disabled:opacity-50"
                   >
                     {processingId === req.id ? (
                       <Loader2 className="w-6 h-6 animate-spin" />
                     ) : (
                       <>
                         <Check className="w-6 h-6" /> Provision Institution
                       </>
                     )}
                   </button>
                </div>
              </div>
              
              <div className="px-10 py-6 bg-slate-50/40 border-t border-slate-50 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-500" />
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Pre-Onboarding: Verification of institutional legitimacy recommended before provision.</p>
                 </div>
                 <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest cursor-pointer hover:underline">
                    Detailed Profile <ArrowRight className="w-4 h-4" />
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
