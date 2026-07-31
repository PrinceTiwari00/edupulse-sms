"use client";

import React from 'react';
import { Plus, Search, Filter, Download, MoreVertical, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const mockStudents = [
  { id: '1', name: 'Alice Johnson', admissionNo: 'ADM-001', class: 'Grade 10', section: 'A', gender: 'Female', parent: 'Robert Johnson', status: 'Active' },
  { id: '2', name: 'Ethan Hunt', admissionNo: 'ADM-002', class: 'Grade 10', section: 'B', gender: 'Male', parent: 'Sarah Hunt', status: 'Active' },
  { id: '3', name: 'Lily Evans', admissionNo: 'ADM-003', class: 'Grade 11', section: 'A', gender: 'Female', parent: 'Mark Evans', status: 'Inactive' },
];

export default function StudentList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Directory</h1>
          <p className="text-slate-500 text-sm">Manage student profiles and admissions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <Link 
            href="/admin/students/add" 
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Admission</span>
          </Link>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select className="border rounded-lg px-4 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
          <option value="">Select Class</option>
          <option value="10">Grade 10</option>
          <option value="11">Grade 11</option>
        </select>
        <select className="border rounded-lg px-4 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
          <option value="">Select Section</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>
        <button className="flex items-center gap-2 text-slate-500 hover:text-slate-900 px-2 py-2">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Clear Filters</span>
        </button>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b">
              <th className="px-6 py-4 font-semibold">Student Name</th>
              <th className="px-6 py-4 font-semibold">Admission No</th>
              <th className="px-6 py-4 font-semibold">Class/Section</th>
              <th className="px-6 py-4 font-semibold">Parent Contact</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {mockStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-500">{student.gender}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-slate-600">{student.admissionNo}</td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="text-slate-900 font-medium">{student.class}</p>
                    <p className="text-xs text-slate-500">Section {student.section}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <p className="text-slate-900">{student.parent}</p>
                    <div className="flex gap-2">
                      <Mail className="w-3 h-3 text-slate-400 hover:text-indigo-600 cursor-pointer" />
                      <Phone className="w-3 h-3 text-slate-400 hover:text-indigo-600 cursor-pointer" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
