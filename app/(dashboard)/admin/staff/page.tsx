"use client";

import React, { useEffect, useState } from 'react';
import { Plus, Search, Mail, Phone, MoreHorizontal, UserCheck, Briefcase } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { getStaffList } from '@/actions/staff-list';

export default function StaffDirectory() {
  const { data: session } = useSession();
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (session?.user?.schoolId) {
      const fetchStaff = async () => {
        const res = await getStaffList(session.user.schoolId as string);
        if (res.success && res.data) setStaff(res.data);
        setLoading(false);
      };
      fetchStaff();
    }
  }, [session]);

  const filteredStaff = staff.filter(s => 
    `${s.user.firstName} ${s.user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Staff Management</h1>
          <p className="text-slate-500 text-sm">Manage employees, roles, and permissions</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-bold text-xs uppercase">
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50/50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search staff by name or designation..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b">
                <th className="px-6 py-4 font-semibold">Name & Role</th>
                <th className="px-6 py-4 font-semibold">Designation</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-20 text-center text-slate-400 font-bold animate-pulse uppercase tracking-widest">Loading staff profiles...</td></tr>
              ) : filteredStaff.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-20 text-center text-slate-400 font-bold uppercase tracking-widest">No staff records found.</td></tr>
              ) : filteredStaff.map((person) => (
                <tr key={person.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center font-black text-indigo-600 uppercase">
                        {person.user.firstName[0]}{person.user.lastName[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 tracking-tight">{person.user.firstName} {person.user.lastName}</p>
                        <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest">{person.user.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 font-bold uppercase tracking-widest">{person.designation}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                        <Mail className="w-3 h-3 text-indigo-400" /> {person.user.email}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                        <Phone className="w-3 h-3 text-indigo-400" /> {person.user.phone || 'No phone'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-200 rounded-md transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-slate-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
