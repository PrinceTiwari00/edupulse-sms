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
  Banknote,
  X
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
  onClose?: () => void;
}

export default function Sidebar({ role, onClose }: SidebarProps) {
  const links = menuItems[role] || [];
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white text-slate-900 border-r border-slate-100 no-print shrink-0 overflow-hidden shadow-sm">
      <div className="p-6 lg:p-8 flex items-center justify-between">
        <Link href="/" className="text-2xl lg:text-3xl font-black flex items-center gap-3 lg:gap-4 text-slate-900 hover:opacity-90 transition-all">
          <div className="bg-indigo-600 p-2 lg:p-2.5 rounded-xl lg:rounded-2xl shadow-xl shadow-indigo-100">
            <School className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
          </div>
          <span className="tracking-tighter uppercase leading-none">EduPulse</span>
        </Link>
        <button onClick={onClose} className="lg:hidden p-2 hover:bg-slate-100 rounded-xl text-slate-400">
           <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="px-8 lg:px-10 mb-4 lg:block hidden">
            <p className="text-[10px] lg:text-xs text-slate-400 uppercase tracking-[0.3em] font-black leading-none">Management Core</p>
            <div className="h-[2px] w-8 bg-indigo-600 mt-2 rounded-full"></div>
      </div>

      <nav className="flex-1 px-4 lg:px-6 py-2 space-y-1 lg:space-y-2 overflow-y-auto custom-scrollbar">
        {links.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-4 px-4 lg:px-5 py-3.5 lg:py-5 rounded-xl lg:rounded-2xl transition-all group relative ${
                isActive 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 lg:w-6 lg:h-6 shrink-0 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'}`} />
              <span className="font-black text-sm uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 lg:p-8 border-t border-slate-100 space-y-2 lg:space-y-3 bg-slate-50/50 mt-auto">
        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-4 px-4 lg:px-5 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-slate-600 hover:bg-white transition-all font-black text-sm uppercase tracking-wider group border border-transparent hover:border-slate-100"
        >
          <Settings className="w-5 h-5 lg:w-6 lg:h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          <span>Settings</span>
        </Link>
        <button
          className="w-full flex items-center gap-4 px-4 lg:px-5 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-red-600 hover:bg-red-50 transition-all font-black text-sm uppercase tracking-wider group"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut className="w-5 h-5 lg:w-6 lg:h-6 text-red-400 group-hover:text-red-600 transition-opacity" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
