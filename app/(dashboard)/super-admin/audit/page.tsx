"use client";

import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  User as UserIcon, 
  Activity, 
  ShieldAlert,
  ArrowRight,
  Download,
  History,
  ShieldCheck,
  Search
} from 'lucide-react';
import { getAuditLogs } from '@/actions/super-admin';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await getAuditLogs();
      if (res.success && res.data) setLogs(res.data);
      setLoading(false);
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">System Audit Trail</h1>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">Cryptographically trace every administrative action across the entire platform ecosystem.</p>
        </div>
        <div className="flex gap-4 no-print">
            <button className="flex items-center gap-3 bg-white border-2 border-slate-100 px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                <Download className="w-5 h-5" />
                Export Ledger
            </button>
            <div className="bg-indigo-50 text-indigo-700 px-6 py-4 rounded-[20px] text-xs font-black border-2 border-indigo-100 shadow-sm flex items-center gap-3 uppercase tracking-widest">
                <ShieldCheck className="w-5 h-5" />
                Immutable Stream
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[56px] border border-slate-100 shadow-xl overflow-hidden min-h-[600px]">
        <div className="p-10 border-b border-slate-50 bg-slate-50/20 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="bg-slate-900 p-3 rounded-2xl shadow-lg">
                    <History className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Event Buffer</h3>
            </div>
            <div className="relative w-96 no-print">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input type="text" placeholder="Trace Event ID or Action..." className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-50 rounded-[28px] text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm" />
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-12 py-8">Action Event</th>
                <th className="px-8 py-8">Authorized User</th>
                <th className="px-8 py-8">Temporal Hash</th>
                <th className="px-12 py-8">Entity Identifier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                   <td colSpan={4} className="px-12 py-40 text-center text-slate-300 font-black uppercase tracking-[0.3em] text-xl animate-pulse italic">Connecting to secure audit node...</td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                   <td colSpan={4} className="px-12 py-40 text-center text-slate-400 font-black uppercase tracking-widest text-lg italic">No administrative events recorded in the current epoch.</td>
                </tr>
              ) : logs.map((log) => (
                <tr key={log.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                  <td className="px-12 py-10">
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl border ${log.action.includes('DELETE') ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                            <Activity className="w-5 h-5" />
                        </div>
                        <span className="font-black text-slate-900 text-xl tracking-tighter uppercase leading-none">{log.action.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-8 py-10">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-[20px] bg-slate-950 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500">
                          <UserIcon className="w-6 h-6 text-indigo-400" />
                       </div>
                       <div>
                            <p className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1">{log.user.username}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.user.role.replace('_', ' ')}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-10">
                    <p className="text-sm font-bold text-slate-600 uppercase tracking-tighter">{new Date(log.createdAt).toLocaleDateString('en-GB')}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{new Date(log.createdAt).toLocaleTimeString('en-GB')}</p>
                  </td>
                  <td className="px-12 py-10">
                     <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 shadow-sm uppercase tracking-tighter">
                            {log.entityId.substring(0, 12)}...
                        </span>
                        <div className="p-3 bg-white border border-slate-100 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer shadow-sm">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-12 bg-slate-950 text-white flex justify-between items-center">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-[24px] bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-900/40">
                    <ShieldAlert className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">Compliance Guard</h4>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-none">Security Posture: EXCELLENT</p>
                </div>
            </div>
            <p className="text-xs font-black text-slate-600 uppercase tracking-[0.4em]">Audit Epoch: 2026.08</p>
        </div>
      </div>
    </div>
  );
}
