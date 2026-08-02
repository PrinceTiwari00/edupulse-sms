"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import { UserRole } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Bell, Menu, X } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  if (status === 'loading') {
    return <div className="h-screen w-full flex items-center justify-center bg-slate-50 font-bold text-slate-400">Loading EduPulse...</div>;
  }

  if (status === 'unauthenticated' || !session) {
    redirect('/login');
  }

  const role = session.user.role as UserRole;
  const userName = session.user.firstName || 'User';

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop Fixed, Mobile Drawer */}
      <aside className={`fixed inset-y-0 left-0 z-[101] w-80 lg:relative lg:translate-x-0 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar role={role} onClose={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-12 no-print shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-4 lg:gap-8">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3.5 bg-slate-50 rounded-2xl text-slate-900 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100"
            >
              <Menu className="w-7 h-7" />
            </button>
            <div className="min-w-0">
                <h2 className="text-xl lg:text-3xl font-black text-slate-900 tracking-tighter leading-none truncate">
                Welcome, {userName}
                </h2>
                <p className="text-[11px] lg:text-xs font-black text-indigo-700 uppercase tracking-widest mt-1.5">Platform Control Center</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-6">
            <button className="relative p-3 text-slate-500 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 rounded-2xl transition-all group lg:block hidden">
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              <Bell className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 lg:gap-4 lg:pl-6 lg:border-l border-slate-200">
                <div className="text-right lg:block hidden">
                    <p className="text-sm font-black text-slate-900 leading-none mb-0.5">{userName}</p>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-tighter">{role.replace('_', ' ')}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-100 shrink-0">
                {userName.substring(0, 2).toUpperCase()}
                </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 bg-[#fcfdff]">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
