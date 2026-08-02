"use client";

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Bell,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { getSchoolStats } from '@/actions/admin';

export default function AdminDashboardOverview() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.schoolId) {
      const fetchStats = async () => {
        const res = await getSchoolStats(session.user.schoolId as string);
        if (res.success && res.data) setStats(res.data);
        setLoading(false);
      };
      fetchStats();
    }
  }, [session]);

  if (loading) return <div className="p-10 font-black text-slate-300 uppercase tracking-[0.2em] animate-pulse text-xl">Aggregating institutional intelligence...</div>;

  const cards = [
    { label: 'Total Enrollment', value: stats?.totalStudents || 0, icon: GraduationCap, color: 'indigo', trend: 'Active Learners' },
    { label: 'Workforce', value: stats?.totalStaff || 0, icon: Users, color: 'blue', trend: 'Verified Staff' },
    { label: 'Academic Assets', value: stats?.totalClasses || 0, icon: BookOpen, color: 'amber', trend: 'Structured Classes' },
    { label: 'Gross Collection', value: `रू ${stats?.totalRevenue?.toLocaleString() || '0'}`, icon: DollarSign, color: 'green', trend: 'Total Revenue' },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Institutional Insight</h1>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">System-wide operational metrics for the current academic session.</p>
        </div>
        <div className="flex gap-4 no-print">
            <Link href="/admin/students" className="bg-indigo-600 text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all flex items-center gap-3 active:scale-95">
                <Plus className="w-5 h-5" />
                New Admission
            </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((stat) => (
          <div key={stat.label} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <div className={`p-5 rounded-3xl bg-${stat.color}-50 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
              <span className="text-[11px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl uppercase tracking-widest">
                {stat.trend}
              </span>
            </div>
            <div className="mt-8 space-y-2">
              <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] leading-none">{stat.label}</p>
              <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
               <div className="flex items-center gap-5">
                  <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                     Calendar Protocol
                  </h3>
               </div>
               <Link href="/admin/notices" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-6 py-3 rounded-xl hover:bg-indigo-100 transition-colors">Broadcast Notice</Link>
            </div>
            <div className="p-10 space-y-8">
               {stats?.upcomingEvents?.length === 0 ? (
                 <div className="text-center py-24 space-y-4">
                    <div className="p-6 bg-slate-50 rounded-full inline-flex border border-slate-100">
                        <Activity className="w-12 h-12 text-slate-200" />
                    </div>
                    <p className="text-xl font-bold text-slate-300 uppercase tracking-widest italic leading-none">Buffer is empty. No upcoming events.</p>
                 </div>
               ) : (
                 stats.upcomingEvents.map((event: any, i: number) => (
                   <div key={i} className="flex items-center gap-10 group cursor-pointer p-6 hover:bg-slate-50 rounded-[32px] transition-all">
                      <div className="w-24 text-center shrink-0">
                         <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2 leading-none">{new Date(event.createdAt).toLocaleString('default', { month: 'short' })}</p>
                         <p className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{new Date(event.createdAt).getDate()}</p>
                      </div>
                      <div className="h-12 w-1.5 bg-slate-100 rounded-full group-hover:bg-indigo-500 transition-all group-hover:scale-y-125"></div>
                      <div className="flex-1">
                         <p className="text-2xl font-black text-slate-800 tracking-tight leading-none group-hover:text-indigo-600 transition-colors uppercase">{event.title}</p>
                         <p className="text-sm font-bold text-slate-400 mt-3 uppercase tracking-widest">{event.content?.substring(0, 80)}...</p>
                      </div>
                      <div className="p-4 bg-white rounded-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all shadow-sm border border-slate-100">
                        <ArrowRight className="w-6 h-6 text-indigo-600" />
                      </div>
                   </div>
                 ))
               )}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-slate-950 rounded-[48px] p-10 text-white shadow-2xl space-y-10 relative overflow-hidden group">
             <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                    <Zap className="w-6 h-6 text-indigo-400" />
                </div>
                <h4 className="text-xl font-black tracking-tight uppercase leading-none">Command <br/>Ops</h4>
             </div>
             <div className="grid grid-cols-1 gap-4 relative z-10">
                {[
                  { label: 'Student Enrollment', href: '/admin/students', icon: GraduationCap },
                  { label: 'Financial Ledger', href: '/admin/finance', icon: DollarSign },
                  { label: 'Exam Protocols', href: '/admin/exams/results', icon: ShieldCheck },
                  { label: 'Staff Directory', href: '/admin/staff', icon: Users },
                ].map(action => (
                  <Link 
                    key={action.label} 
                    href={action.href}
                    className="p-6 bg-white/5 border border-white/5 rounded-[28px] hover:bg-white/10 group transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                        <action.icon className="w-5 h-5 text-indigo-400 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">{action.label}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white transition-all group-hover:translate-x-1" />
                  </Link>
                ))}
             </div>
             <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-600/10 rounded-full blur-[60px] group-hover:bg-indigo-600/20 transition-all duration-700"></div>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl p-10 text-center space-y-6">
             <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto border-2 border-green-100 shadow-sm">
                <ShieldCheck className="w-10 h-10 text-green-600" />
             </div>
             <div className="space-y-2">
                <p className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Sync Status</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Institutional Integrity: 100%</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
