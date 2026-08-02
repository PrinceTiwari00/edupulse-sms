"use client";

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  School, 
  Users, 
  UserSquare2, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  ClipboardCheck, 
  Settings,
  Bell,
  LogOut,
  GraduationCap,
  Megaphone,
  History,
  Banknote
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

// Define navigation items for each role
const menuItems = {
  SUPER_ADMIN: [
    { icon: LayoutDashboard, label: 'Global Stats', href: '/super-admin' },
    { icon: Bell, label: 'Registration Requests', href: '/super-admin/requests' },
    { icon: Megaphone, label: 'Platform Broadcasts', href: '/super-admin/notices' },
    { icon: School, label: 'Manage Schools', href: '/super-admin/schools' },
    { icon: CreditCard, label: 'Revenue & Billing', href: '/super-admin/subscriptions' },
    { icon: Banknote, label: 'SaaS Billing', href: '/super-admin/billing' },
    { icon: History, label: 'System Audit Logs', href: '/super-admin/audit' },
  ],
  SCHOOL_ADMIN: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Staff Management', href: '/admin/staff' },
    { icon: UserSquare2, label: 'Student Management', href: '/admin/students' },
    { icon: BookOpen, label: 'Academic Setup', href: '/admin/academics' },
    { icon: CreditCard, label: 'Finance & Fees', href: '/admin/finance' },
  ],
  TEACHER: [
    { icon: LayoutDashboard, label: 'Overview', href: '/teacher' },
    { icon: Calendar, label: 'My Timetable', href: '/teacher/timetable' },
    { icon: ClipboardCheck, label: 'Attendance', href: '/teacher/attendance' },
    { icon: GraduationCap, label: 'Marks Entry', href: '/teacher/marks' },
  ],
  ACCOUNTANT: [
    { icon: LayoutDashboard, label: 'Overview', href: '/accountant' },
    { icon: CreditCard, label: 'Fee Collection', href: '/accountant/fees' },
    { icon: BookOpen, label: 'Expense Tracking', href: '/accountant/expenses' },
  ],
  STUDENT: [
    { icon: LayoutDashboard, label: 'My Dashboard', href: '/student' },
    { icon: Calendar, label: 'Timetable', href: '/student/timetable' },
    { icon: GraduationCap, label: 'Report Card', href: '/student/results' },
    { icon: CreditCard, label: 'Fee Status', href: '/student/fees' },
  ],
  PARENT: [
    { icon: LayoutDashboard, label: 'Children Overview', href: '/parent' },
    { icon: Bell, label: 'Notices', href: '/parent/notices' },
  ],
};

interface SidebarProps {
  role: keyof typeof menuItems;
}

export default function Sidebar({ role }: SidebarProps) {
  const links = menuItems[role] || [];
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-80 bg-slate-950 text-white border-r border-slate-900 no-print shrink-0 overflow-hidden">
      <div className="p-8">
        <Link href="/" className="text-3xl font-black flex items-center gap-4 text-white hover:opacity-90 transition-all">
          <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-xl shadow-indigo-900/40">
            <School className="w-8 h-8 text-white" />
          </div>
          <span className="tracking-tighter uppercase">EduPulse</span>
        </Link>
        <div className="mt-8 px-2">
            <p className="text-[11px] text-slate-500 uppercase tracking-[0.3em] font-black leading-none">Management Core</p>
            <div className="h-[2px] w-8 bg-indigo-600 mt-2"></div>
        </div>
      </div>

      <nav className="flex-1 px-6 py-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        {links.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group relative ${
                isActive 
                ? 'bg-white text-slate-950 shadow-2xl shadow-white/5' 
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {isActive && <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo-600 rounded-full"></div>}
              <item.icon className={`w-6 h-6 shrink-0 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-600 group-hover:text-indigo-400'}`} />
              <span className="font-black text-sm uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-8 border-t border-slate-900 space-y-3 bg-slate-950/50 backdrop-blur-xl">
        <Link
          href="/settings"
          className="flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all font-black text-sm uppercase tracking-wider group"
        >
          <Settings className="w-6 h-6 text-slate-600 group-hover:text-indigo-400 transition-colors" />
          <span>Settings</span>
        </Link>
        <button
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-black text-sm uppercase tracking-wider group"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
