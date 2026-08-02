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
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { 
  getSchools, 
  toggleSchoolStatus, 
  updateSchoolPlan, 
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

  const handlePlanChange = async (id: string, newPlan: SubscriptionPlan) => {
    const res = await updateSchoolPlan(id, newPlan);
    if (res.success) fetchSchools();
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
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Tenant Institutions</h1>
          <p className="text-slate-500 font-medium">Manage and monitor institutional lifecycle and licensing.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all uppercase tracking-widest">
          <Plus className="w-4 h-4" />
          Onboard School
        </button>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-slate-900 p-4 rounded-2xl flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
           <div className="flex items-center gap-4 pl-4">
              <span className="text-white font-black text-xs uppercase tracking-widest">{selectedIds.length} Institutions Selected</span>
           </div>
           <div className="flex gap-2">
              <button onClick={handleBulkSuspend} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase transition-all border border-white/10">Suspend All</button>
              <button onClick={handleBulkDelete} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-xl text-[10px] font-black uppercase transition-all border border-red-500/20">Delete Selected</button>
              <button onClick={() => setSelectedIds([])} className="p-2 text-slate-400 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
           </div>
        </div>
      )}

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
           <div className="p-4 bg-indigo-50 rounded-2xl">
              <School className="w-6 h-6 text-indigo-600" />
           </div>
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Schools</p>
              <p className="text-3xl font-black text-slate-900">{schools.length}</p>
           </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
           <div className="p-4 bg-green-50 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-green-600" />
           </div>
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Tenants</p>
              <p className="text-3xl font-black text-slate-900">{schools.filter(s => s.isActive).length}</p>
           </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5">
           <div className="p-4 bg-amber-50 rounded-2xl">
              <Zap className="w-6 h-6 text-amber-600" />
           </div>
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Premium Plans</p>
              <p className="text-3xl font-black text-slate-900">{schools.filter(s => s.plan !== 'FREE').length}</p>
           </div>
        </div>
      </div>

      {/* School List Table */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-6 border-b border-slate-50 flex flex-wrap gap-4 items-center justify-between bg-slate-50/30">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by school name or subdomain..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"><Filter className="w-4 h-4 text-slate-500" /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-8 py-5 w-12">
                   <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-slate-200 text-indigo-600 focus:ring-indigo-500"
                    checked={selectedIds.length === filteredSchools.length && filteredSchools.length > 0}
                    onChange={toggleSelectAll}
                   />
                </th>
                <th className="px-4 py-5">Institution Profile</th>
                <th className="px-8 py-5">Subdomain</th>
                <th className="px-8 py-5 text-center">Resources</th>
                <th className="px-8 py-5">Subscription</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">Syncing institution data...</td>
                </tr>
              ) : filteredSchools.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center text-slate-400 font-bold">No institutions found.</td>
                </tr>
              ) : filteredSchools.map((school) => (
                <tr key={school.id} className={`group hover:bg-slate-50/50 transition-colors ${selectedIds.includes(school.id) ? 'bg-indigo-50/30' : ''}`}>
                  <td className="px-8 py-6">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-200 text-indigo-600 focus:ring-indigo-500" 
                      checked={selectedIds.includes(school.id)}
                      onChange={() => toggleSelect(school.id)}
                    />
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center font-black text-indigo-600 shadow-sm border border-indigo-100">
                        {school.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 tracking-tight">{school.name}</p>
                        {Number(school.walletBalance) > 0 && (
                           <p className="text-[9px] text-green-600 font-black uppercase bg-green-50 px-2 py-0.5 rounded-full w-fit mt-1 border border-green-100">
                             Credit: रू {Number(school.walletBalance).toLocaleString()}
                           </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[10px] font-mono font-black text-indigo-600 bg-indigo-50/50 px-3 py-1.5 rounded-lg w-fit border border-indigo-100/50 uppercase">
                      <Globe className="w-3 h-3" />
                      {school.subdomain}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col items-center gap-1">
                       <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-[10px] font-black text-slate-600 uppercase">
                             <Users className="w-3 h-3" /> {school._count.students}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] font-black text-slate-600 uppercase">
                             <ShieldCheck className="w-3 h-3" /> {school._count.staff}
                          </div>
                       </div>
                       <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1 shadow-inner">
                          <div className="bg-indigo-500 h-full w-[25%] rounded-full"></div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="relative group/sel">
                       <select 
                        value={school.plan}
                        onChange={(e) => handlePlanChange(school.id, e.target.value as SubscriptionPlan)}
                        className={`text-[10px] font-black uppercase tracking-widest pl-4 pr-10 py-2 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm appearance-none ${
                          school.plan === 'ENTERPRISE' ? 'bg-slate-900 text-white' :
                          school.plan === 'PRO' ? 'bg-indigo-600 text-white' :
                          school.plan === 'BASIC' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <option value="FREE">Free</option>
                        <option value="BASIC">Basic</option>
                        <option value="PRO">Pro</option>
                        <option value="ENTERPRISE">Enterprise</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-60" />
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => handleToggleStatus(school.id, school.isActive)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
                        school.isActive ? 'bg-green-50 text-green-600 border border-green-100 hover:bg-green-100' : 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100'
                      }`}
                    >
                      {school.isActive ? (
                        <>
                          <CheckCircle className="w-3 h-3" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" /> Suspended
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-8 py-6 text-right relative">
                    <button 
                      onClick={() => setOpenMenuId(openMenuId === school.id ? null : school.id)}
                      className="p-2 hover:bg-slate-200 rounded-xl transition-colors inline-flex items-center justify-center border border-transparent hover:border-slate-100"
                    >
                      <MoreVertical className="w-5 h-5 text-slate-300" />
                    </button>
                    
                    {openMenuId === school.id && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                        <div className="absolute right-8 top-16 w-56 bg-white border border-slate-100 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-slate-200/50">
                          <div className="p-3 space-y-1">
                            <button onClick={() => { setEditingSchool(school); setOpenMenuId(null); }} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all">
                               <Edit className="w-4 h-4" /> Edit Institution
                            </button>
                            <button onClick={() => handleToggleStatus(school.id, school.isActive)} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all">
                               <Zap className="w-4 h-4" /> {school.isActive ? 'Suspend Access' : 'Activate Access'}
                            </button>
                            <Link href="/super-admin/billing" className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all">
                               <CreditCard className="w-4 h-4" /> Billing History
                            </Link>
                            <div className="h-[1px] bg-slate-50 mx-2 my-1"></div>
                            <button onClick={() => handleDelete(school.id)} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                               <Trash2 className="w-4 h-4" /> Permanently Delete
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

        <div className="p-8 bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl">
                 <CreditCard className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                 <p className="text-xl font-black tracking-tight uppercase">Platform Revenue: रू {revenue.toLocaleString()}</p>
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">+14% revenue growth</p>
              </div>
           </div>
           <Link href="/super-admin/billing" className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-2xl font-black text-[10px] transition-all shadow-xl shadow-indigo-900/50 uppercase tracking-[0.2em] flex items-center gap-2">
              View SaaS Billing
              <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </div>

      {/* --- EDIT SCHOOL MODAL --- */}
      {editingSchool && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-[40px] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase">Update Institution</h2>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-tighter mt-1">{editingSchool.subdomain}.edupulse.com</p>
                  </div>
                  <button onClick={() => setEditingSchool(null)} className="p-2 hover:bg-slate-200 rounded-2xl transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
               </div>

               <form onSubmit={handleEditSubmit} className="p-8 space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Name</label>
                    <input name="name" type="text" defaultValue={editingSchool.name} required className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                       <input name="email" type="email" defaultValue={editingSchool.email} required className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" />
                     </div>
                     <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                       <input name="phone" type="tel" defaultValue={editingSchool.phone} required className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" />
                     </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Physical Address</label>
                    <textarea name="address" rows={2} defaultValue={editingSchool.address} className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold resize-none" />
                  </div>

                  <button type="submit" disabled={isUpdating} className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-sm shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50">
                    {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </button>
               </form>
            </div>
         </div>
      )}
    </div>
  );
}
