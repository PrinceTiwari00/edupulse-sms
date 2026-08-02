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
  TrendingUp
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
    <div className="space-y-12 pb-20">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Tenant Institutions</h1>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">Centrally manage institutional lifecycle, resources, and premium licensing.</p>
        </div>
        <button className="flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-[24px] font-black text-sm hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all uppercase tracking-widest active:scale-95 no-print">
          <Plus className="w-5 h-5" />
          Onboard School
        </button>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-slate-950 p-6 rounded-[32px] flex items-center justify-between animate-in slide-in-from-top-4 duration-500 shadow-2xl">
           <div className="flex items-center gap-6 pl-4 border-l-4 border-indigo-500">
              <span className="text-white font-black text-sm uppercase tracking-[0.2em]">{selectedIds.length} Institutions Selected</span>
           </div>
           <div className="flex gap-4">
              <button onClick={handleBulkSuspend} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[11px] font-black uppercase transition-all border border-white/10 tracking-widest">Suspend Selected</button>
              <button onClick={handleBulkDelete} className="px-8 py-3 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-2xl text-[11px] font-black uppercase transition-all border border-red-500/20 tracking-widest">Delete Permanent</button>
              <button onClick={() => setSelectedIds([])} className="p-3 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-xl"><X className="w-5 h-5" /></button>
           </div>
        </div>
      )}

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-8 group hover:shadow-xl transition-all">
           <div className="p-5 bg-indigo-50 rounded-[24px] group-hover:scale-110 transition-transform">
              <School className="w-8 h-8 text-indigo-600" />
           </div>
           <div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Total Schools</p>
              <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{schools.length}</p>
           </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-8 group hover:shadow-xl transition-all">
           <div className="p-5 bg-green-50 rounded-[24px] group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8 text-green-600" />
           </div>
           <div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Active Tenants</p>
              <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{schools.filter(s => s.isActive).length}</p>
           </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-8 group hover:shadow-xl transition-all">
           <div className="p-5 bg-amber-50 rounded-[24px] group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-amber-600" />
           </div>
           <div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Premium Plans</p>
              <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{schools.filter(s => s.plan && s.plan !== 'NONE').length}</p>
           </div>
        </div>
        <div className="bg-slate-950 p-8 rounded-[40px] text-white shadow-2xl flex items-center gap-8 group hover:bg-slate-900 transition-all relative overflow-hidden">
           <div className="p-5 bg-white/10 rounded-[24px] group-hover:scale-110 transition-transform z-10">
              <CreditCard className="w-8 h-8 text-indigo-400" />
           </div>
           <div className="z-10">
              <p className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1 leading-none">Total Revenue</p>
              <p className="text-3xl font-black text-white tracking-tighter leading-none mt-2 uppercase">रू {revenue.toLocaleString()}</p>
           </div>
           <div className="absolute -right-8 -top-8 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* School List Table */}
      <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl min-h-[400px] pb-32">
        <div className="p-10 border-b border-slate-50 flex flex-wrap gap-8 items-center justify-between bg-slate-50/20">
          <div className="relative flex-1 min-w-[400px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by school name or subdomain..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-5 border-none rounded-[28px] text-lg font-bold focus:ring-4 focus:ring-indigo-500/10 bg-white shadow-sm transition-all outline-none"
            />
          </div>
          <div className="flex gap-4">
            <button className="p-5 bg-white border-2 border-slate-100 rounded-3xl hover:bg-slate-50 transition-colors shadow-sm"><Filter className="w-6 h-6 text-slate-500" /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-10 py-6 w-16">
                   <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    checked={selectedIds.length === filteredSchools.length && filteredSchools.length > 0}
                    onChange={toggleSelectAll}
                   />
                </th>
                <th className="px-4 py-6">Institution Profile</th>
                <th className="px-8 py-6">Subdomain</th>
                <th className="px-8 py-6 text-center">Resources</th>
                <th className="px-8 py-6">Subscription</th>
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-10 py-32 text-center text-slate-300 font-black uppercase tracking-widest animate-pulse text-xl">Syncing high-fidelity institution data...</td>
                </tr>
              ) : filteredSchools.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-10 py-32 text-center text-slate-400 font-bold text-xl uppercase tracking-widest italic">No institutions match your query.</td>
                </tr>
              ) : filteredSchools.map((school) => (
                <tr key={school.id} className={`group hover:bg-slate-50/50 transition-all duration-300 ${selectedIds.includes(school.id) ? 'bg-indigo-50/30' : ''}`}>
                  <td className="px-10 py-10">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                      checked={selectedIds.includes(school.id)}
                      onChange={() => toggleSelect(school.id)}
                    />
                  </td>
                  <td className="px-4 py-10">
                    <div className="flex items-center gap-8">
                      <div className="w-20 h-20 rounded-[28px] bg-white flex items-center justify-center font-black text-3xl text-indigo-600 shadow-xl border border-slate-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        {school.name[0]}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-2xl tracking-tighter leading-none mb-3">{school.name}</p>
                        <div className="flex flex-wrap items-center gap-3">
                            {Number(school.walletBalance) > 0 && (
                            <p className="text-[10px] text-green-700 font-black uppercase bg-green-100 px-3 py-1.5 rounded-xl border border-green-200 shadow-sm">
                                Credit: रू {Number(school.walletBalance).toLocaleString()}
                            </p>
                            )}
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-xl">{school.email || 'NO_RECORD'}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-10">
                    <div className="flex items-center gap-3 text-[11px] font-mono font-black text-indigo-600 bg-indigo-50 px-5 py-3 rounded-2xl w-fit border border-indigo-100 shadow-sm uppercase tracking-tighter">
                      <Globe className="w-4 h-4" />
                      {school.subdomain}
                    </div>
                  </td>
                  <td className="px-8 py-10 text-center">
                    <div className="flex flex-col items-center gap-3">
                       <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                             <Users className="w-5 h-5 text-indigo-500" /> {school._count.students}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 shadow-sm">
                             <ShieldCheck className="w-5 h-5 text-green-500" /> {school._count.staff}
                          </div>
                       </div>
                       <div className="w-full max-w-[140px] h-2.5 bg-slate-100 rounded-full overflow-hidden mt-1 shadow-inner border border-slate-200">
                          <div className="bg-indigo-600 h-full w-[45%] rounded-full shadow-[0_0_15px_rgba(79,70,229,0.4)]"></div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-10">
                    <span className={`px-6 py-3 rounded-[20px] text-xs font-black uppercase tracking-[0.2em] shadow-xl border-2 transition-all duration-300 ${
                      school.plan === 'ENTERPRISE' ? 'bg-slate-950 text-white border-slate-800 shadow-slate-300' :
                      school.plan === 'PRO' ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-100' :
                      school.plan === 'BASIC' ? 'bg-blue-50 text-blue-800 border-blue-200 shadow-blue-50' : 'bg-white text-slate-400 border-slate-100 shadow-none'
                    }`}>
                      {school.plan || 'NONE'}
                    </span>
                  </td>
                  <td className="px-8 py-10 text-center">
                    <button 
                      onClick={() => handleToggleStatus(school.id, school.isActive)}
                      className={`inline-flex items-center gap-3 px-6 py-3 rounded-[20px] text-[11px] font-black uppercase tracking-widest transition-all shadow-xl border-2 hover:-translate-y-1 active:translate-y-0 ${
                        school.isActive ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:shadow-green-200' : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:shadow-red-200'
                      }`}
                    >
                      {school.isActive ? (
                        <>
                          <CheckCircle className="w-5 h-5" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5" /> Suspended
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-10 py-10 text-right relative">
                    <button 
                      onClick={() => setOpenMenuId(openMenuId === school.id ? null : school.id)}
                      className="p-4 hover:bg-slate-200 rounded-3xl transition-all inline-flex items-center justify-center border-2 border-transparent hover:border-slate-100 shadow-sm"
                    >
                      <MoreVertical className="w-6 h-6 text-slate-400" />
                    </button>
                    
                    {openMenuId === school.id && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                        <div className="absolute right-12 top-24 w-72 bg-white border border-slate-100 rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.15)] z-50 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300 ring-4 ring-slate-50/50">
                          <div className="p-4 space-y-2">
                            <button onClick={() => { setEditingSchool(school); setOpenMenuId(null); }} className="w-full flex items-center gap-4 px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-[20px] transition-all">
                               <Edit className="w-5 h-5 opacity-40" /> Edit Institution
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
               <div className="p-12 border-b border-slate-50 flex justify-between items-center bg-slate-50/40">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Update Profile</h2>
                    <p className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em] mt-2">{editingSchool.subdomain}.edupulse.com</p>
                  </div>
                  <button onClick={() => setEditingSchool(null)} className="p-4 hover:bg-slate-200 rounded-3xl transition-all border border-slate-100 shadow-sm">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
               </div>

               <form onSubmit={handleEditSubmit} className="p-12 space-y-10">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Official Institutional Name</label>
                    <input name="name" type="text" defaultValue={editingSchool.name} required className="w-full px-8 py-6 border-2 border-slate-100 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg font-bold transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                     <div className="space-y-3">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Communication Email</label>
                       <input name="email" type="email" defaultValue={editingSchool.email} required className="w-full px-8 py-6 border-2 border-slate-100 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg font-bold transition-all" />
                     </div>
                     <div className="space-y-3">
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Contact Phone</label>
                       <input name="phone" type="tel" defaultValue={editingSchool.phone} required className="w-full px-8 py-6 border-2 border-slate-100 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg font-bold transition-all" />
                     </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Physical Location Address</label>
                    <textarea name="address" rows={3} defaultValue={editingSchool.address} className="w-full px-8 py-6 border-2 border-slate-100 rounded-[32px] bg-slate-50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-lg font-bold transition-all resize-none" />
                  </div>

                  <button type="submit" disabled={isUpdating} className="w-full bg-slate-950 text-white py-6 rounded-[32px] font-black text-sm shadow-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.3em] disabled:opacity-50 active:scale-95">
                    {isUpdating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                    {isUpdating ? 'Synchronizing...' : 'Commit Updates'}
                  </button>
               </form>
            </div>
         </div>
      )}
    </div>
  );
}
