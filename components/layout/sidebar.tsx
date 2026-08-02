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
    <div className="flex flex-col h-full w-64 bg-slate-900 text-white border-r no-print">
      <div className="p-6">
        <Link href="/" className="text-2xl font-black flex items-center gap-3 text-indigo-400">
          <div className="bg-indigo-500/20 p-2 rounded-xl border border-indigo-500/30">
            <School className="w-7 h-7 text-indigo-400" />
          </div>
          <span>EduPulse</span>
        </Link>
        <p className="text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em] font-black">
          Role: {role.replace('_', ' ')}
        </p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 mt-4">
        {links.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
                isActive 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'}`} />
              <span className="font-bold text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-800 space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all font-bold text-sm"
        >
          <Settings className="w-5 h-5 text-slate-500" />
          <span>Settings</span>
        </Link>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut className="w-5 h-5 text-red-500/50" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
