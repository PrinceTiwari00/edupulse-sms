"use client";

import React from 'react';
import Sidebar from '@/components/layout/sidebar';
import { UserRole } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

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
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 no-print">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Welcome back, {userName}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600">
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              {/* Bell Icon would go here */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
