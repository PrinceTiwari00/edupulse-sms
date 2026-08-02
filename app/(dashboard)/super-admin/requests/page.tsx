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
  AlertCircle
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Onboarding Queue</h1>
        <p className="text-slate-500 font-medium">Review and verify new institutional registration requests.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="bg-white p-20 rounded-[40px] border border-slate-100 text-center text-slate-400 font-bold">
            Scanning for requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white p-20 rounded-[40px] border border-slate-100 text-center space-y-4">
            <div className="inline-flex p-6 bg-slate-50 rounded-full text-slate-300">
               <CheckCircle2 className="w-12 h-12" />
            </div>
            <div>
               <h3 className="text-xl font-black text-slate-900">Queue is Clear</h3>
               <p className="text-slate-500 font-medium">No pending school registrations at the moment.</p>
            </div>
          </div>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden group hover:border-indigo-200 transition-all">
              <div className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-3xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{req.name}</h3>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                       <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-indigo-400" /> {req.subdomain}.edupulse.com</span>
                       <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-indigo-400" /> {req.email}</span>
                       <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-indigo-400" /> {req.phone}</span>
                       <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-indigo-400" /> {new Date(req.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                   <button 
                     onClick={() => handleReject(req.id)}
                     disabled={processingId === req.id}
                     className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-red-600 bg-red-50 hover:bg-red-100 transition-all border border-red-100"
                   >
                     <X className="w-4 h-4" /> Reject
                   </button>
                   <button 
                     onClick={() => handleApprove(req.id)}
                     disabled={processingId === req.id}
                     className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-white bg-green-600 hover:bg-green-700 transition-all shadow-xl shadow-green-900/20"
                   >
                     {processingId === req.id ? 'Approving...' : (
                       <>
                         <Check className="w-4 h-4" /> Approve Institution
                       </>
                     )}
                   </button>
                </div>
              </div>
              
              <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-50 flex items-center gap-2">
                 <AlertCircle className="w-4 h-4 text-amber-500" />
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting verification of institutional email domain.</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
