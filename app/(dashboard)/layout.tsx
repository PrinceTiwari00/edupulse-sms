"use client";

import React from 'react';
import Sidebar from '@/components/layout/sidebar';
import { UserRole } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Bell } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div className="h-screen w-full flex items-center justify-center bg-slate-50 font-bold text-slate-400">Loading EduPulse...</div>;
  }

  if (status === 'unauthenticated' || !session) {
    redirect('/login');
  }

  const role = session.user.role as UserRole;
  const userName = session.user.firstName || 'User';

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar - Fixed on desktop */}
      <Sidebar role={role} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-24 bg-white border-b border-slate-100 flex items-center justify-between px-12 no-print shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                Welcome back, {userName}
                </h2>
                <p className="text-[11px] font-black text-indigo-600 uppercase tracking-widest mt-1">Platform Control Center</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-3 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 rounded-2xl transition-all group">
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              <Bell className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
                <div className="text-right">
                    <p className="text-xs font-black text-slate-900 leading-none mb-0.5">{userName}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{role.replace('_', ' ')}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-100">
                {userName.substring(0, 2).toUpperCase()}
                </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-12 bg-[#fcfdff]">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
