"use client";

import React, { useEffect, useState } from 'react';
import { 
  School, 
  Users, 
  GraduationCap, 
  DollarSign, 
  TrendingUp, 
  Globe, 
  ShieldCheck,
  ArrowRight,
  Activity,
  Wallet
} from 'lucide-react';
import Link from 'next/link';
import { getPlatformStats } from '@/actions/super-admin';

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getPlatformStats();
      if (res.success && res.data) setStats(res.data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-10 font-black text-slate-400 uppercase tracking-widest animate-pulse text-xl">Synchronizing platform metrics...</div>;

  const cards = [
    { label: 'Total Institutions', value: stats?.totalSchools || 0, icon: School, color: 'indigo', trend: 'Global Network' },
    { label: 'Platform Students', value: stats?.totalStudents || 0, icon: GraduationCap, color: 'blue', trend: 'Active Enrollment' },
    { label: 'Total Revenue', value: `रू ${stats?.totalRevenue?.toLocaleString() || '0'}`, icon: DollarSign, color: 'green', trend: 'Realized NPR' },
    { label: 'Advance Balance', value: `रू ${stats?.totalWalletBalance?.toLocaleString() || '0'}`, icon: Wallet, color: 'amber', trend: 'Credit Pool' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">System Global Stats</h1>
          <p className="text-slate-700 font-bold text-lg">Real-time performance metrics across all tenant schools.</p>
        </div>
        <div className="flex gap-4 no-print">
          <div className="bg-green-50 text-green-700 px-6 py-3 rounded-2xl text-sm font-black border border-green-100 shadow-sm flex items-center gap-3">
            <Activity className="w-5 h-5 animate-pulse" />
            PLATFORM STATUS: OPERATIONAL
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <div className={`p-5 rounded-3xl bg-${stat.color}-50 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
              <span className="text-xs font-black text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl uppercase tracking-widest">
                {stat.trend}
              </span>
            </div>
            <div className="mt-8">
              <p className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] leading-none mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[48px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
              <div className="flex items-center gap-4">
                  <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-100">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                    Institutional Ecosystem
                  </h3>
              </div>
              <Link href="/super-admin/schools" className="text-sm font-black text-indigo-700 uppercase tracking-[0.2em] px-6 py-3 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">Manage All</Link>
            </div>
            <div className="p-16 text-center space-y-8">
               <div className="max-w-lg mx-auto space-y-4">
                    <p className="text-slate-700 font-bold text-lg leading-relaxed">
                        Centrally manage your multi-tenant environment. Control institutional onboarding, approve pending requests, and monitor billing lifecycles from one command center.
                    </p>
               </div>
               <Link href="/super-admin/schools" className="inline-flex items-center gap-3 text-indigo-700 font-black uppercase text-base tracking-widest bg-white border-2 border-indigo-600 px-10 py-5 rounded-[24px] hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-indigo-100">
                  Enter Institution Control Room <ArrowRight className="w-5 h-5" />
               </Link>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-[48px] p-10 border border-indigo-100 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="bg-indigo-600 p-5 rounded-3xl shadow-xl shadow-indigo-100 mb-8 group-hover:scale-110 transition-transform w-fit">
                <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-3xl font-black tracking-tight leading-none uppercase text-slate-900">Governance <br/>Terminal</h4>
              <p className="text-slate-600 text-lg mt-6 font-bold leading-relaxed">
                Execute core administrative commands. Suspend access, modify tiers, and oversee critical system logs.
              </p>
              <Link href="/super-admin/audit" className="mt-10 w-full py-5 bg-slate-900 hover:bg-indigo-600 text-white rounded-3xl font-black text-sm transition-all shadow-2xl shadow-indigo-900/10 flex items-center justify-center gap-3 uppercase tracking-widest">
                System Audit Logs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
