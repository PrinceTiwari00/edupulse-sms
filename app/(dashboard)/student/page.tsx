"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, GraduationCap, CreditCard, Clock } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { getStudentStats } from '@/actions/user-stats';

export default function StudentDashboardOverview() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchStats = async () => {
        const res = await getStudentStats(session.user.id as string);
        if (res.success && res.data) setStats(res.data);
        setLoading(false);
      };
      fetchStats();
    }
  }, [session]);

  if (loading) return <div className="p-10 font-bold text-slate-400 uppercase tracking-widest">Compiling academic records...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Student Portal</h1>
        <p className="text-slate-500 font-medium">Your academic journey, all in one place.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Attendance', value: stats?.attendanceRate || '0%', icon: Clock, color: 'indigo' },
          { label: 'Academic GPA', value: stats?.gpa || '0.0', icon: GraduationCap, color: 'blue' },
          { label: 'Completed Exams', value: stats?.activeExams || 0, icon: Calendar, color: 'green' },
          { label: 'Fee Status', value: stats?.feeStatus || 'Pending', icon: CreditCard, color: 'amber' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <div className={`p-4 rounded-2xl bg-${stat.color}-50 w-fit`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <div className="mt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
