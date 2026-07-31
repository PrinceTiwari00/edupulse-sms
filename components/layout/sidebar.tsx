"use client";

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
  GraduationCap
} from 'lucide-react';

// Define navigation items for each role
const menuItems = {
  SUPER_ADMIN: [
    { icon: LayoutDashboard, label: 'Global Stats', href: '/super-admin' },
    { icon: School, label: 'Manage Schools', href: '/super-admin/schools' },
    { icon: CreditCard, label: 'Subscriptions', href: '/super-admin/subscriptions' },
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

  return (
    <div className="flex flex-col h-full w-64 bg-slate-900 text-white border-r">
      <div className="p-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-indigo-400">
          <School className="w-8 h-8" />
          <span>EduPulse</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
          {role.replace('_', ' ')}
        </p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors group"
          >
            <item.icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5 text-slate-400" />
          <span className="font-medium">Settings</span>
        </Link>
        <button
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors"
          onClick={() => console.log('logout')}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
