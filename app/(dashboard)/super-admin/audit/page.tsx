"use client";

import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  User as UserIcon, 
  Activity, 
  ShieldAlert,
  ArrowRight,
  Download
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Audit Logs</h1>
        <p className="text-slate-500 font-medium">Trace every administrative action across the entire platform.</p>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-8 py-5">Event Action</th>
                <th className="px-8 py-5">Performed By</th>
                <th className="px-8 py-5">Timestamp</th>
                <th className="px-8 py-5">Entity ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                   <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-bold">Fetching log history...</td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                   <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest">No logs recorded yet.</td>
                </tr>
              ) : logs.map((log) => (
                <tr key={log.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-bold text-slate-900 text-sm tracking-tight">{log.action}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                          <UserIcon className="w-3 h-3 text-slate-400" />
                       </div>
                       <span className="text-xs font-bold text-slate-600">{log.user.username} ({log.user.role})</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs text-slate-400 font-bold uppercase">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="px-8 py-6">
                     <span className="font-mono text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded">
                        {log.entityId}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
