"use client";

import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Download, MoreVertical, Mail, Phone, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { getStudents } from '@/actions/student-list';

export default function StudentList() {
  const { data: session } = useSession();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (session?.user?.schoolId) {
      const fetchStudents = async () => {
        const res = await getStudents(session.user.schoolId as string);
        if (res.success && res.data) setStudents(res.data);
        setLoading(false);
      };
      fetchStudents();
    }
  }, [session]);

  const filteredStudents = students.filter(s => 
    `${s.user.firstName} ${s.user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Student Directory</h1>
          <p className="text-slate-500 text-sm">Manage student profiles and admissions</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/admin/students/add" 
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Admission</span>
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b">
              <th className="px-6 py-4 font-semibold">Student Name</th>
              <th className="px-6 py-4 font-semibold">Admission No</th>
              <th className="px-6 py-4 font-semibold">Class/Section</th>
              <th className="px-6 py-4 font-semibold">Parent Contact</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {loading ? (
               <tr><td colSpan={5} className="px-6 py-20 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">Syncing student records...</td></tr>
            ) : filteredStudents.length === 0 ? (
               <tr><td colSpan={5} className="px-6 py-20 text-center text-slate-400 font-bold uppercase tracking-widest">No students found.</td></tr>
            ) : filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold uppercase">
                      {student.user.firstName[0]}{student.user.lastName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{student.user.firstName} {student.user.lastName}</p>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{student.gender}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-slate-600 font-bold">{student.admissionNumber}</td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="text-slate-900 font-medium">{student.class.name}</p>
                    <p className="text-xs text-slate-500">Section {student.section.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="text-slate-900">{student.parent?.user.firstName} {student.parent?.user.lastName || 'N/A'}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/students/${student.id}`} className="p-2 hover:bg-slate-100 rounded-full inline-block transition-colors">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
