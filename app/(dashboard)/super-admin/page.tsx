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

  if (loading) return <div className="p-10 font-bold text-slate-400">Syncing platform metrics...</div>;

  const cards = [
    { label: 'Total Institutions', value: stats?.totalSchools || 0, icon: School, color: 'indigo', trend: 'Global' },
    { label: 'Platform Students', value: stats?.totalStudents || 0, icon: GraduationCap, color: 'blue', trend: 'Active' },
    { label: 'Total Revenue', value: `रू ${stats?.totalRevenue?.toLocaleString() || '0'}`, icon: DollarSign, color: 'green', trend: 'Collected' },
    { label: 'Advance Balance', value: `रू ${stats?.totalWalletBalance?.toLocaleString() || '0'}`, icon: Wallet, color: 'amber', trend: 'Wallet' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Global Stats</h1>
          <p className="text-slate-500 font-medium">Real-time metrics across all tenant schools.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-2xl text-xs font-black border border-green-100 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            PLATFORM: HEALTHY
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start">
              <div className={`p-4 rounded-2xl bg-${stat.color}-50`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-full uppercase">
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.1em]">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <Globe className="w-5 h-5 text-indigo-500" />
                Management Shortcut
              </h3>
              <Link href="/super-admin/schools" className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Manage All</Link>
            </div>
            <div className="p-12 text-center space-y-4">
               <p className="text-slate-500 font-medium max-w-sm mx-auto">Access institutional controls to manage schools, approve requests, and monitor system-wide activity.</p>
               <Link href="/super-admin/schools" className="inline-flex items-center gap-2 text-indigo-600 font-black uppercase text-xs tracking-widest border-b-2 border-indigo-600 pb-1">
                  Institution Control Room <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <ShieldCheck className="w-10 h-10 text-indigo-400 mb-6" />
              <h4 className="text-2xl font-black tracking-tight leading-tight">Institution <br/>Control Room</h4>
              <p className="text-slate-400 text-sm mt-4 font-medium leading-relaxed">
                Approve registrations, manage subdomains, and toggle institution access.
              </p>
              <Link href="/super-admin/schools" className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-sm transition-all shadow-xl shadow-indigo-900/50 flex items-center justify-center gap-2">
                Launch Control Panel
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
