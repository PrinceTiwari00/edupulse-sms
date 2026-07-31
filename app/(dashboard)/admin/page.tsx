"use client";

import React from 'react';
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

export default function AdminDashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">School Overview</h1>
        <p className="text-slate-500 font-medium">Welcome back, Admin. Here is what's happening today.</p>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '1,240', icon: GraduationCap, color: 'indigo', trend: '+12' },
          { label: 'Total Staff', value: '84', icon: Users, color: 'blue', trend: 'Stable' },
          { label: 'Classes', value: '24', icon: BookOpen, color: 'amber', trend: 'Full' },
          { label: 'Fees Collected', value: '$42,500', icon: DollarSign, color: 'green', trend: '85%' },
        ].map((stat) => (
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
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
               <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  Upcoming Events
               </h3>
               <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">View Calendar</button>
            </div>
            <div className="p-8 space-y-6">
               {[
                 { time: '09:00 AM', title: 'Morning Assembly', type: 'Daily' },
                 { time: '11:30 AM', title: 'Faculty Strategy Meeting', type: 'Admin' },
                 { time: '02:00 PM', title: 'Parent-Teacher Interaction', type: 'Event' },
               ].map((event, i) => (
                 <div key={i} className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-20 shrink-0">
                       <p className="text-sm font-black text-slate-900 leading-none">{event.time}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{event.type}</p>
                    </div>
                    <div className="h-10 w-1 bg-slate-100 rounded-full group-hover:bg-indigo-500 transition-colors"></div>
                    <div className="flex-1">
                       <p className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{event.title}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Sidebar Alerts */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <Bell className="w-8 h-8 text-indigo-400 animate-bounce" />
                <span className="text-[10px] font-black text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded-full uppercase">3 New</span>
              </div>
              <h4 className="text-2xl font-black tracking-tight leading-tight">School-wide <br/>Alerts</h4>
              <p className="text-slate-400 text-sm mt-4 leading-relaxed font-medium">Important notices from the platform board.</p>
              <button className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-sm transition-all shadow-xl shadow-indigo-900/50">
                View All Notices
              </button>
            </div>
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 space-y-6">
             <h4 className="font-black text-slate-900 tracking-tight flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Quick Actions
             </h4>
             <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Admission', href: '/admin/students/add' },
                  { label: 'Fee Bill', href: '/admin/finance/billing' },
                  { label: 'Result', href: '/admin/exams/results' },
                  { label: 'Staff', href: '/admin/staff' },
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
