"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  School, 
  CheckCircle, 
  XCircle, 
  Search, 
  MoreVertical, 
  Globe, 
  Users, 
  ShieldCheck,
  Zap,
  CreditCard,
  Filter,
  Trash2,
  Edit,
  ExternalLink,
  ChevronDown,
  X,
  Save,
  Loader2,
  ArrowRight,
  TrendingUp,
  Mail,
  Phone,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { 
  getSchools, 
  toggleSchoolStatus, 
  deleteSchool, 
  updateSchool,
  bulkToggleStatus,
  bulkDeleteSchools
} from '@/actions/school';
import { getSchoolUsers, createSchoolUser, updateSchoolUser, deleteSchoolUser } from '@/actions/user-management';
import { getPlatformRevenueNPR } from '@/actions/subscription';
import { SubscriptionPlan } from '@prisma/client';

export default function SuperAdminSchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [revenue, setRevenue] = useState(0);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  
  // Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Edit Modal State
  const [editingSchool, setEditingSchool] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // User Management State
  const [manageUserSchool, setManageUserSchool] = useState<any>(null);
  const [schoolUsers, setSchoolUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const fetchSchools = async () => {
    setLoading(true);
    const res = await getSchools();
    if (res.success && res.data) {
      setSchools(res.data);
    }
    const revData = await getPlatformRevenueNPR();
    setRevenue(revData.totalCollected);
    setLoading(false);
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    if (manageUserSchool) {
      setLoadingUsers(true);
      getSchoolUsers(manageUserSchool.id).then(res => {
        if (res.success && res.data) setSchoolUsers(res.data);
        setLoadingUsers(false);
      });
    }
  }, [manageUserSchool]);

  // --- Handlers ---
  
  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const res = await toggleSchoolStatus(id, !currentStatus);
    if (res.success) fetchSchools();
    setOpenMenuId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure? This will delete ALL school data, including students, staff, and invoices.")) {
      const res = await deleteSchool(id);
      if (res.success) fetchSchools();
    }
    setOpenMenuId(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const res = await updateSchool(editingSchool.id, {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
    });
    if (res.success) {
      setEditingSchool(null);
      fetchSchools();
    }
    setIsUpdating(false);
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const userData: any = {
      schoolId: manageUserSchool.id,
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      role: formData.get('role') as any,
    };

    const password = formData.get('password') as string;
    if (password) userData.password = password;

    let res;
    if (editingUser) {
      res = await updateSchoolUser(editingUser.id, userData);
    } else {
      res = await createSchoolUser(userData);
    }

    if (res.success) {
      const updatedUsers = await getSchoolUsers(manageUserSchool.id);
      if (updatedUsers.success && updatedUsers.data) setSchoolUsers(updatedUsers.data);
      setEditingUser(null);
    } else {
      alert(res.error);
    }
    setIsUpdating(false);
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Delete this user?")) {
      const res = await deleteSchoolUser(userId);
      if (res.success) {
        const updatedUsers = await getSchoolUsers(manageUserSchool.id);
        if (updatedUsers.success && updatedUsers.data) setSchoolUsers(updatedUsers.data);
      }
    }
  };

  // --- Bulk Actions ---
  
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredSchools.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSchools.map(s => s.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkSuspend = async () => {
    if (confirm(`Suspend ${selectedIds.length} institutions?`)) {
      await bulkToggleStatus(selectedIds, false);
      fetchSchools();
      setSelectedIds([]);
    }
  };

  const handleBulkDelete = async () => {
    if (confirm(`PERMANENTLY DELETE ${selectedIds.length} institutions and all their data? This cannot be undone.`)) {
      await bulkDeleteSchools(selectedIds);
      fetchSchools();
      setSelectedIds([]);
    }
  };

  const filteredSchools = schools.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.subdomain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 lg:space-y-12 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Tenant Institutions</h1>
          <p className="text-slate-500 font-bold text-sm lg:text-lg leading-relaxed max-w-xl">Centrally manage institutional lifecycle, resources, and premium licensing.</p>
        </div>
        <button className="flex items-center justify-center gap-3 bg-indigo-600 text-white w-full lg:w-auto px-10 py-5 rounded-[24px] font-black text-xs lg:text-sm hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all uppercase tracking-widest active:scale-95 no-print">
          <Plus className="w-5 h-5" />
          Onboard School
        </button>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-slate-950 p-4 lg:p-6 rounded-3xl flex flex-col lg:flex-row items-center justify-between animate-in slide-in-from-top-4 duration-500 shadow-2xl gap-4">
           <div className="flex items-center gap-4 lg:gap-6 pl-4 border-l-4 border-indigo-500 w-full lg:w-auto">
              <span className="text-white font-black text-xs lg:text-sm uppercase tracking-[0.1em] lg:tracking-[0.2em]">{selectedIds.length} Selected</span>
           </div>
           <div className="flex gap-3 w-full lg:w-auto">
              <button onClick={handleBulkSuspend} className="flex-1 lg:flex-none px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[10px] lg:text-[11px] font-black uppercase transition-all border border-white/10 tracking-widest">Suspend</button>
              <button onClick={handleBulkDelete} className="flex-1 lg:flex-none px-6 py-3 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-2xl text-[10px] lg:text-[11px] font-black uppercase transition-all border border-red-500/20 tracking-widest">Delete</button>
              <button onClick={() => setSelectedIds([])} className="p-3 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-xl"><X className="w-4 h-4 lg:w-5 lg:h-5" /></button>
           </div>
        </div>
      )}

      {/* Quick Overview Cards - Hidden or Stacked on small screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-10">
        <div className="bg-white p-6 lg:p-8 rounded-3xl lg:rounded-[40px] border border-slate-200 shadow-sm flex items-center gap-6 lg:gap-8 group hover:shadow-xl transition-all">
           <div className="p-4 lg:p-5 bg-indigo-50 rounded-2xl lg:rounded-[24px] group-hover:scale-110 transition-transform">
              <School className="w-6 h-6 lg:w-8 lg:h-8 text-indigo-600" />
           </div>
           <div>
              <p className="text-[10px] lg:text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Total Schools</p>
              <p className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tighter leading-none">{schools.length}</p>
           </div>
        </div>
        <div className="bg-white p-6 lg:p-8 rounded-3xl lg:rounded-[40px] border border-slate-200 shadow-sm flex items-center gap-6 lg:gap-8 group hover:shadow-xl transition-all">
           <div className="p-4 lg:p-5 bg-green-50 rounded-2xl lg:rounded-[24px] group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
           </div>
           <div>
              <p className="text-[10px] lg:text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Active Tenants</p>
              <p className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tighter leading-none">{schools.filter(s => s.isActive).length}</p>
           </div>
        </div>
        <div className="bg-white p-6 lg:p-8 rounded-3xl lg:rounded-[40px] border border-slate-200 shadow-sm flex items-center gap-6 lg:gap-8 group hover:shadow-xl transition-all sm:col-span-2 xl:col-span-1">
           <div className="p-4 lg:p-5 bg-amber-50 rounded-2xl lg:rounded-[24px] group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-amber-600" />
           </div>
           <div>
              <p className="text-[10px] lg:text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Premium Plans</p>
              <p className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tighter leading-none">{schools.filter(s => s.plan && s.plan !== 'NONE').length}</p>
           </div>
        </div>
      </div>

      {/* Institutional Buffer Container */}
      <div className="bg-white rounded-[40px] md:rounded-[48px] border border-slate-200 shadow-xl overflow-hidden min-h-[400px]">
        {/* Search & Filter - Redesigned for mobile app feel */}
        <div className="p-6 md:p-10 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-stretch md:items-center justify-between bg-slate-50/20">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search institutions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 border-2 border-slate-100 rounded-3xl text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 bg-white shadow-sm transition-all outline-none"
            />
          </div>
          <button className="flex items-center justify-center gap-2 p-4 bg-white border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm no-print">
            <Filter className="w-5 h-5 text-slate-600" />
            <span className="text-xs font-black text-slate-700 uppercase tracking-widest md:hidden">Filters</span>
          </button>
        </div>

        {/* Mobile App-like List (Visible only on mobile) */}
        <div className="lg:hidden divide-y divide-slate-100">
           {loading ? (
             <div className="py-20 text-center font-black text-slate-300 uppercase animate-pulse">Synchronizing Data...</div>
           ) : filteredSchools.length === 0 ? (
             <div className="py-20 text-center font-black text-slate-400 uppercase italic">No matches found.</div>
           ) : filteredSchools.map((school) => (
             <div key={school.id} className="p-6 space-y-6 active:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center font-black text-2xl text-indigo-600 border border-indigo-100">
                        {school.name[0]}
                      </div>
                      <div className="min-w-0">
                         <h3 className="font-black text-slate-900 text-lg leading-tight truncate">{school.name}</h3>
                         <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase mt-1">
                            <Globe className="w-3 h-3 text-indigo-400" /> {school.subdomain}
                         </div>
                      </div>
                   </div>
                   <button 
                      onClick={() => setOpenMenuId(openMenuId === school.id ? null : school.id)}
                      className="p-3 bg-slate-50 rounded-xl text-slate-400 active:bg-slate-200 transition-all border border-slate-100"
                   >
                      <MoreVertical className="w-5 h-5" />
                   </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Subscription</p>
                      <p className="text-xs font-black text-slate-900 uppercase">{school.plan || 'NONE'}</p>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                      <div className={`text-[10px] font-black uppercase flex items-center gap-1.5 ${school.isActive ? 'text-green-600' : 'text-red-600'}`}>
                         <div className={`w-1.5 h-1.5 rounded-full ${school.isActive ? 'bg-green-600' : 'bg-red-600'}`}></div>
                         {school.isActive ? 'Active' : 'Suspended'}
                      </div>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                            <Users className="w-3 h-3" /> {school._count.students}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                            <ShieldCheck className="w-3 h-3" /> {school._count.staff}
                        </div>
                    </div>
                    {Number(school.walletBalance) > 0 && (
                        <p className="text-[10px] font-black text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-lg">
                            Credit: रू {Number(school.walletBalance).toLocaleString()}
                        </p>
                    )}
                </div>

                {/* Mobile Menu Backdrop Fix */}
                {openMenuId === school.id && (
                  <>
                    <div className="fixed inset-0 z-[110]" onClick={() => setOpenMenuId(null)} />
                    <div className="absolute right-6 mt-2 w-64 bg-white border-2 border-slate-100 rounded-[32px] shadow-2xl z-[120] overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300">
                        <div className="p-3 space-y-1 text-left">
                            <button onClick={() => { setEditingSchool(school); setOpenMenuId(null); }} className="w-full flex items-center gap-4 px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-700 active:bg-indigo-50 rounded-2xl">
                                <Edit className="w-5 h-5 text-indigo-400" /> Edit Profile
                            </button>
                            <button onClick={() => { setManageUserSchool(school); setOpenMenuId(null); }} className="w-full flex items-center gap-4 px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-700 active:bg-indigo-50 rounded-2xl">
                                <Users className="w-5 h-5 text-indigo-400" /> Manage Users
                            </button>
                            <button onClick={() => handleToggleStatus(school.id, school.isActive)} className="w-full flex items-center gap-4 px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-700 active:bg-indigo-50 rounded-2xl">
                                <Zap className="w-5 h-5 text-indigo-400" /> {school.isActive ? 'Suspend' : 'Activate'}
                            </button>
                            <div className="h-[2px] bg-slate-50 mx-4 my-1"></div>
                            <button onClick={() => handleDelete(school.id)} className="w-full flex items-center gap-4 px-5 py-4 text-xs font-black uppercase tracking-widest text-red-600 active:bg-red-50 rounded-2xl">
                                <Trash2 className="w-5 h-5 opacity-40" /> Remove Permanently
                            </button>
                        </div>
                    </div>
                  </>
                )}
             </div>
           ))
           }
        </div>

        {/* Desktop Table View (Visible only on lg and up) */}
        <div className="hidden lg:block">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="text-xs font-black text-slate-600 uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-4 py-8 w-12 text-center">
                   <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    checked={selectedIds.length === filteredSchools.length && filteredSchools.length > 0}
                    onChange={toggleSelectAll}
                   />
                </th>
                <th className="px-4 py-8 w-1/3">Institution Profile</th>
                <th className="px-4 py-8 w-32">Subdomain</th>
                <th className="px-4 py-8 text-center w-40">Resources</th>
                <th className="px-4 py-8 text-center w-40">Subscription</th>
                <th className="px-4 py-8 text-center w-32">Status</th>
                <th className="px-6 py-8 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-10 py-40 text-center text-slate-300 font-black uppercase tracking-widest animate-pulse text-2xl italic">Syncing high-fidelity institution data...</td>
                </tr>
              ) : filteredSchools.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-10 py-40 text-center text-slate-400 font-black text-2xl uppercase tracking-widest italic">No institutions match your query.</td>
                </tr>
              ) : filteredSchools.map((school) => (
                <tr key={school.id} className={`group hover:bg-slate-50 transition-all duration-300 ${selectedIds.includes(school.id) ? 'bg-indigo-50/30' : ''}`}>
                  <td className="px-4 py-10 text-center">
                    <input 
                      type="checkbox" 
                      className="w-6 h-6 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                      checked={selectedIds.includes(school.id)}
                      onChange={() => toggleSelect(school.id)}
                    />
                  </td>
                  <td className="px-4 py-10">
                    <div className="flex items-center gap-6 overflow-hidden">
                      <div className="w-16 h-16 rounded-[20px] bg-white flex items-center justify-center font-black text-2xl text-indigo-600 shadow-2xl border-2 border-indigo-50 group-hover:scale-110 group-hover:rotate-2 transition-all duration-500 shrink-0">
                        {school.name[0]}
                      </div>
                      <div className="space-y-1 min-w-0 overflow-hidden">
                        <p className="font-black text-slate-900 text-xl tracking-tighter leading-none mb-1 truncate">{school.name}</p>
                        <div className="flex flex-wrap items-center gap-2">
                            {Number(school.walletBalance) > 0 && (
                            <p className="text-[10px] text-green-700 font-black uppercase bg-green-100 px-3 py-1 rounded-lg border border-green-200 shrink-0">
                                Credit: रू {Number(school.walletBalance).toLocaleString()}
                            </p>
                            )}
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 truncate">{school.email || 'NO_EMAIL'}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-10">
                    <div className="flex items-center gap-2 text-[10px] font-mono font-black text-indigo-700 bg-indigo-50 px-3 py-2 rounded-xl w-fit border-2 border-indigo-100 shadow-sm uppercase tracking-tighter shrink-0">
                      <Globe className="w-4 h-4" />
                      {school.subdomain}
                    </div>
                  </td>
                  <td className="px-4 py-10 text-center">
                    <div className="flex flex-col items-center gap-3 shrink-0">
                       <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase bg-slate-50 px-3 py-1.5 rounded-lg border-2 border-slate-100 shadow-sm">
                             <Users className="w-5 h-5 text-indigo-500" /> {school._count.students}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase bg-slate-50 px-3 py-1.5 rounded-lg border-2 border-slate-100 shadow-sm">
                             <ShieldCheck className="w-5 h-5 text-green-600" /> {school._count.staff}
                          </div>
                       </div>
                       <div className="w-full max-w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden mt-1 shadow-inner border border-slate-200">
                          <div className="bg-indigo-600 h-full w-[45%] rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"></div>
                       </div>
                    </div>
                  </td>
                  <td className="px-4 py-10 text-center">
                    <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] shadow-xl border-2 transition-all duration-300 inline-block shrink-0 ${
                      school.plan === 'ENTERPRISE' ? 'bg-slate-950 text-white border-slate-800 shadow-slate-400' :
                      school.plan === 'PRO' ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-200' :
                      school.plan === 'BASIC' ? 'bg-blue-50 text-blue-900 border-blue-200 shadow-blue-100' : 'bg-white text-slate-400 border-slate-200 shadow-none'
                    }`}>
                      {school.plan || 'NONE'}
                    </span>
                  </td>
                  <td className="px-4 py-10 text-center">
                    <button 
                      onClick={() => handleToggleStatus(school.id, school.isActive)}
                      className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl border-2 hover:-translate-y-1 active:translate-y-0 shrink-0 ${
                        school.isActive ? 'bg-green-50 text-green-800 border-green-200 hover:bg-green-100' : 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100'
                      }`}
                    >
                      {school.isActive ? (
                        <>
                          <CheckCircle className="w-4 h-4" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" /> Suspended
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-10 text-right relative">
                    <button 
                      onClick={() => setOpenMenuId(openMenuId === school.id ? null : school.id)}
                      className="p-3 hover:bg-slate-200 rounded-[20px] transition-all inline-flex items-center justify-center border-2 border-slate-100 hover:border-slate-300 shadow-md bg-white text-slate-900"
                    >
                      <MoreVertical className="w-7 h-7" />
                    </button>
                    
                    {openMenuId === school.id && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                        <div className="absolute right-12 top-0 w-72 bg-white border border-slate-100 rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.15)] z-[99] overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-right-4 duration-300 ring-4 ring-slate-50/50">
                          <div className="p-4 space-y-2 text-left">
                            <button onClick={() => { setEditingSchool(school); setOpenMenuId(null); }} className="w-full flex items-center gap-4 px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-[20px] transition-all">
                               <Edit className="w-5 h-5 opacity-40" /> Edit Institution
                            </button>
                            <button onClick={() => { setManageUserSchool(school); setOpenMenuId(null); }} className="w-full flex items-center gap-4 px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-[20px] transition-all">
                               <Users className="w-5 h-5 opacity-40" /> Manage Users
                            </button>
                            <button onClick={() => handleToggleStatus(school.id, school.isActive)} className="w-full flex items-center gap-4 px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-[20px] transition-all">
                               <Zap className="w-5 h-5 opacity-40" /> {school.isActive ? 'Suspend Access' : 'Activate Access'}
                            </button>
                            <Link href="/super-admin/billing" className="w-full flex items-center gap-4 px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-[20px] transition-all">
                               <CreditCard className="w-5 h-5 opacity-40" /> Revenue Terminal
                            </Link>
                            <div className="h-[2px] bg-slate-50 mx-4 my-2"></div>
                            <button onClick={() => handleDelete(school.id)} className="w-full flex items-center gap-4 px-6 py-4 text-xs font-black uppercase tracking-widest text-red-600 hover:bg-red-50 rounded-[20px] transition-all">
                               <Trash2 className="w-5 h-5 opacity-50" /> Permanent Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- EDIT SCHOOL MODAL --- */}
      {editingSchool && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl">
            <div className="bg-white rounded-[56px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
               <div className="p-8 lg:p-12 border-b border-slate-50 flex justify-between items-center bg-slate-50/40">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-black text-slate-900 uppercase tracking-tighter">Update Profile</h2>
                    <p className="text-[10px] lg:text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] mt-2">{editingSchool.subdomain}.edupulse.com</p>
                  </div>
                  <button onClick={() => setEditingSchool(null)} className="p-3 lg:p-4 hover:bg-slate-200 rounded-2xl lg:rounded-3xl transition-all border border-slate-100 shadow-sm">
                    <X className="w-5 h-5 lg:w-6 lg:h-6 text-slate-400" />
                  </button>
               </div>

               <form onSubmit={handleEditSubmit} className="p-8 lg:p-12 space-y-6 lg:space-y-10">
                  <div className="space-y-2 lg:space-y-3">
                    <label className="text-[10px] lg:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Institutional Name</label>
                    <input name="name" type="text" defaultValue={editingSchool.name} required className="w-full px-6 lg:px-8 py-4 lg:py-6 border-2 border-slate-100 rounded-3xl lg:rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-base lg:text-lg font-bold transition-all" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                     <div className="space-y-2 lg:space-y-3">
                       <label className="text-[10px] lg:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
                       <input name="email" type="email" defaultValue={editingSchool.email} required className="w-full px-6 lg:px-8 py-4 lg:py-6 border-2 border-slate-100 rounded-3xl lg:rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-base lg:text-lg font-bold transition-all" />
                     </div>
                     <div className="space-y-2 lg:space-y-3">
                       <label className="text-[10px] lg:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Phone Number</label>
                       <input name="phone" type="tel" defaultValue={editingSchool.phone} required className="w-full px-6 lg:px-8 py-4 lg:py-6 border-2 border-slate-100 rounded-3xl lg:rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-base lg:text-lg font-bold transition-all" />
                     </div>
                  </div>
                  <div className="space-y-2 lg:space-y-3">
                    <label className="text-[10px] lg:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Physical Address</label>
                    <textarea name="address" rows={2} lg:rows={3} defaultValue={editingSchool.address} className="w-full px-6 lg:px-8 py-4 lg:py-6 border-2 border-slate-100 rounded-3xl lg:rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-base lg:text-lg font-bold transition-all resize-none" />
                  </div>

                  <button type="submit" disabled={isUpdating} className="w-full bg-slate-950 text-white py-5 lg:py-6 rounded-3xl lg:rounded-[32px] font-black text-xs lg:text-sm shadow-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.3em] disabled:opacity-50 active:scale-95">
                    {isUpdating ? <Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" /> : <Save className="w-5 h-5 lg:w-6 lg:h-6" />}
                    {isUpdating ? 'Synchronizing...' : 'Commit Updates'}
                  </button>
               </form>
            </div>
         </div>
      )}

      {/* --- MANAGE USERS MODAL --- */}
      {manageUserSchool && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6 bg-slate-950/80 backdrop-blur-xl">
            <div className="bg-white rounded-[40px] lg:rounded-[56px] w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 max-h-[95vh] flex flex-col">
               <div className="p-8 lg:p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/40 shrink-0">
                  <div>
                    <h2 className="text-xl lg:text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">Institutional Users</h2>
                    <p className="text-[10px] lg:text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] mt-2 truncate max-w-[250px] lg:max-w-none">{manageUserSchool.name} Core</p>
                  </div>
                  <button onClick={() => { setManageUserSchool(null); setEditingUser(null); }} className="p-3 lg:p-4 hover:bg-slate-200 rounded-2xl lg:rounded-3xl transition-all border border-slate-100 shadow-sm">
                    <X className="w-5 h-5 lg:w-6 lg:h-6 text-slate-400" />
                  </button>
               </div>

               <div className="flex-1 overflow-y-auto p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                  {/* User Form */}
                  <div className="space-y-6 lg:space-y-8 bg-slate-50/50 p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-slate-100 h-fit lg:sticky lg:top-0 order-2 lg:order-1">
                    <h3 className="text-lg lg:text-xl font-black text-slate-900 uppercase tracking-tight">{editingUser ? 'Update Identity' : 'Provision User'}</h3>
                    <form onSubmit={handleUserSubmit} className="space-y-5 lg:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">First Name</label>
                                <input name="firstName" type="text" defaultValue={editingUser?.firstName} required className="w-full px-5 py-4 border-2 border-white rounded-2xl lg:rounded-[24px] bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm font-bold shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Last Name</label>
                                <input name="lastName" type="text" defaultValue={editingUser?.lastName} required className="w-full px-5 py-4 border-2 border-white rounded-2xl lg:rounded-[24px] bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm font-bold shadow-sm" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Username</label>
                            <input name="username" type="text" defaultValue={editingUser?.username} required className="w-full px-5 py-4 border-2 border-white rounded-2xl lg:rounded-[24px] bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm font-bold shadow-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email</label>
                            <input name="email" type="email" defaultValue={editingUser?.email} required className="w-full px-5 py-4 border-2 border-white rounded-2xl lg:rounded-[24px] bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm font-bold shadow-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Password {editingUser && '(Blank to keep)'}</label>
                            <input name="password" type="password" required={!editingUser} className="w-full px-5 py-4 border-2 border-white rounded-2xl lg:rounded-[24px] bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm font-bold shadow-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Role</label>
                            <select name="role" defaultValue={editingUser?.role || 'SCHOOL_ADMIN'} className="w-full px-5 py-4 border-2 border-white rounded-2xl lg:rounded-[24px] bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm font-bold shadow-sm cursor-pointer">
                                <option value="SCHOOL_ADMIN">ADMIN</option>
                                <option value="ACCOUNTANT">ACCOUNTANT</option>
                                <option value="TEACHER">TEACHER</option>
                            </select>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button type="submit" disabled={isUpdating} className="flex-1 bg-slate-900 text-white py-4 lg:py-5 rounded-2xl lg:rounded-[24px] font-black text-[10px] lg:text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                {editingUser ? 'Save' : 'Create'}
                            </button>
                            {editingUser && (
                                <button type="button" onClick={() => setEditingUser(null)} className="px-5 py-4 lg:py-5 bg-slate-200 text-slate-600 rounded-2xl lg:rounded-[24px] font-black text-[10px] lg:text-xs uppercase tracking-widest transition-all">Cancel</button>
                            )}
                        </div>
                    </form>
                  </div>

                  {/* User List */}
                  <div className="space-y-6 order-1 lg:order-2">
                    <h3 className="text-lg lg:text-xl font-black text-slate-900 uppercase tracking-tight">Access Ledger</h3>
                    <div className="space-y-4">
                        {loadingUsers ? (
                            <div className="py-20 text-center text-slate-300 font-black uppercase tracking-widest animate-pulse">Syncing...</div>
                        ) : schoolUsers.length === 0 ? (
                            <div className="py-20 text-center text-slate-300 font-black uppercase tracking-widest italic text-xs">No active users.</div>
                        ) : schoolUsers.map((user: any) => (
                            <div key={user.id} className="p-5 lg:p-6 bg-white border border-slate-100 rounded-3xl lg:rounded-[32px] shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                                <div className="flex items-center gap-4 lg:gap-5 min-w-0">
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-indigo-50 flex items-center justify-center font-black text-sm lg:text-base text-indigo-600 border border-indigo-100 shrink-0">
                                        {user.firstName[0]}{user.lastName[0]}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-black text-slate-900 text-sm lg:text-base leading-none mb-1 truncate">{user.firstName} {user.lastName}</p>
                                        <p className="text-[9px] lg:text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none truncate">{user.role.replace('_', ' ')}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1.5 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setEditingUser(user)} className="p-2 lg:p-2.5 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-lg lg:rounded-xl transition-all"><Edit className="w-4 h-4 lg:w-5 lg:h-5" /></button>
                                    <button onClick={() => handleDeleteUser(user.id)} className="p-2 lg:p-2.5 bg-red-50 text-red-400 hover:text-red-600 rounded-lg lg:rounded-xl transition-all"><Trash2 className="w-4 h-4 lg:w-5 lg:h-5" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                  </div>
               </div>

               <div className="p-6 lg:p-10 bg-slate-950 text-white flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-white/10 flex items-center justify-center">
                        <Users className="w-4 h-4 lg:w-6 lg:h-6 text-indigo-400" />
                    </div>
                    <p className="text-xs lg:text-sm font-black uppercase tracking-widest">{schoolUsers.length} Users</p>
                  </div>
                  <p className="text-[8px] lg:text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Audit Version 2.1</p>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
