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
  ArrowRight
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

  if (loading) return <div className="p-10 font-bold text-slate-400 uppercase tracking-widest animate-pulse">Building school intelligence...</div>;

  const cards = [
    { label: 'Total Students', value: stats?.totalStudents || 0, icon: GraduationCap, color: 'indigo', trend: 'Active' },
    { label: 'Total Staff', value: stats?.totalStaff || 0, icon: Users, color: 'blue', trend: 'Verified' },
    { label: 'Classes', value: stats?.totalClasses || 0, icon: BookOpen, color: 'amber', trend: 'Structured' },
    { label: 'Revenue', value: `$${stats?.totalRevenue?.toLocaleString() || '0'}`, icon: DollarSign, color: 'green', trend: 'Collected' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">School Overview</h1>
        <p className="text-slate-500 font-medium">Welcome back, Admin. Here is institutional data for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`p-4 rounded-2xl bg-${stat.color}-50`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-full uppercase tracking-wider">
                {stat.trend}
              </span>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
               <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3 uppercase">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  Upcoming Events
               </h3>
               <Link href="/admin/notices" className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Manage Notices</Link>
            </div>
            <div className="p-8 space-y-6">
               {stats?.upcomingEvents?.length === 0 ? (
                 <div className="text-center py-10 text-slate-400 font-bold uppercase tracking-widest">No upcoming institutional events.</div>
               ) : (
                 stats.upcomingEvents.map((event: any, i: number) => (
                   <div key={i} className="flex items-center gap-6 group cursor-pointer">
                      <div className="w-20 shrink-0">
                         <p className="text-sm font-black text-slate-900 leading-none">{new Date(event.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="h-10 w-1 bg-slate-100 rounded-full group-hover:bg-indigo-500 transition-colors"></div>
                      <div className="flex-1">
                         <p className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{event.title}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                   </div>
                 ))
               )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 space-y-6">
             <h4 className="font-black text-slate-900 tracking-tight flex items-center gap-2 uppercase">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Quick Operations
             </h4>
             <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Admission', href: '/admin/students' },
                  { label: 'Billing', href: '/admin/finance/billing' },
                  { label: 'Exam Results', href: '/admin/exams/results' },
                  { label: 'Staff Management', href: '/admin/staff' },
                ].map(action => (
                  <Link 
                    key={action.label} 
                    href={action.href}
                    className="p-4 bg-slate-50 rounded-2xl text-center hover:bg-indigo-50 group transition-all"
                  >
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-600">{action.label}</p>
                  </Link>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
