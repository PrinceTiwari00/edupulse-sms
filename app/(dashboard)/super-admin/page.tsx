"use client";

import React from 'react';
import { School, Users, GraduationCap, DollarSign, Activity, TrendingUp, Globe, ShieldAlert } from 'lucide-react';

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
          <p className="text-slate-500 text-sm">Global analytics across all tenant schools</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-100 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" />
            System Healthy
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Schools', value: '24', icon: School, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+2 this month' },
          { label: 'Total Students', value: '18,450', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: '+540 YoY' },
          { label: 'Active Staff', value: '1,240', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50', trend: 'Stable' },
          { label: 'Platform Revenue', value: '$84,200', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50', trend: '+14% growth' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Schools Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-500" />
              Recent Tenant Activity
            </h3>
            <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="divide-y">
            {[
              { school: 'Skyline Academy', action: 'New Subscription', time: '2 mins ago', plan: 'Enterprise' },
              { school: 'Oakwood High', action: 'Bulk Admission', time: '45 mins ago', plan: 'Pro' },
              { school: 'Riverdale Public', action: 'New School Created', time: '2 hours ago', plan: 'Basic' },
              { school: 'St. Peters', action: 'Invoice Generated', time: '5 hours ago', plan: 'Pro' },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <School className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.school}</p>
                    <p className="text-xs text-slate-500">{item.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-indigo-600">{item.plan} Plan</p>
                  <p className="text-[10px] text-slate-400 font-medium">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health / Warnings */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <TrendingUp className="w-8 h-8 text-indigo-400 mb-4" />
              <h4 className="text-xl font-bold">Scaling Update</h4>
              <p className="text-slate-400 text-sm mt-2">Server load is at 24%. New cluster will auto-provision if load exceeds 70%.</p>
              <button className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold transition-colors">
                Server Logs
              </button>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              Priority Alerts
            </h4>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-xs font-bold text-red-800">Payment Failure</p>
                <p className="text-[10px] text-red-700 mt-1">Horizon Intl. School renewal failed twice.</p>
              </div>
              <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
                <p className="text-xs font-bold text-amber-800">Disk Usage High</p>
                <p className="text-[10px] text-amber-700 mt-1">School 'North Point' reached 90% storage.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
