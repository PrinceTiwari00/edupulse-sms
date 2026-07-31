"use client";

import React from 'react';
import { Plus, School, CheckCircle, XCircle, Search } from 'lucide-react';

// Mock data for Schools
const mockSchools = [
  { id: '1', name: 'Greenwood International', subdomain: 'greenwood', email: 'admin@greenwood.edu', isActive: true, studentCount: 450 },
  { id: '2', name: 'St. Xavier Academy', subdomain: 'stxavier', email: 'info@stxavier.com', isActive: true, studentCount: 1200 },
  { id: '3', name: 'Apex Public School', subdomain: 'apex', email: 'contact@apex.edu', isActive: false, studentCount: 0 },
];

export default function SchoolsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">School Management</h1>
          <p className="text-slate-500 text-sm">Create and manage tenant school accounts</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add New School</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Total Schools</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Active Students</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">8,432</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-slate-500 font-medium">Monthly Revenue</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">$24,500</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search schools..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-500 text-sm uppercase tracking-wider border-b">
              <th className="px-6 py-4 font-semibold">School Name</th>
              <th className="px-6 py-4 font-semibold">Subdomain</th>
              <th className="px-6 py-4 font-semibold">Students</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {mockSchools.map((school) => (
              <tr key={school.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                      <School className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{school.name}</p>
                      <p className="text-xs text-slate-500">{school.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-indigo-600">{school.subdomain}.edupulse.com</td>
                <td className="px-6 py-4 text-slate-600">{school.studentCount}</td>
                <td className="px-6 py-4">
                  {school.isActive ? (
                    <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit font-medium text-xs">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2 py-1 rounded-full w-fit font-medium text-xs">
                      <XCircle className="w-3 h-3" /> Suspended
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button className="text-slate-400 hover:text-indigo-600 font-medium">Edit Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
