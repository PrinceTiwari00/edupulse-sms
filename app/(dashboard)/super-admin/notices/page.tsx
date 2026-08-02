"use client";

import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Plus, 
  Calendar, 
  Users, 
  Eye, 
  Trash2, 
  Send,
  AlertCircle,
  Globe,
  CheckCircle2,
  X
} from 'lucide-react';
import { getGlobalNotices, createGlobalNotice, deleteNotice } from '@/actions/notice';
import { UserRole } from '@prisma/client';

export default function PlatformNoticeBoard() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetRoles: [UserRole.SCHOOL_ADMIN, UserRole.TEACHER, UserRole.STUDENT] as UserRole[]
  });

  const fetchNotices = async () => {
    setLoading(true);
    const res = await getGlobalNotices();
    if (res.success && res.data) {
      setNotices(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createGlobalNotice(formData);
    if (res.success) {
      fetchNotices();
      setShowModal(false);
      setFormData({ title: '', content: '', targetRoles: [UserRole.SCHOOL_ADMIN, UserRole.TEACHER, UserRole.STUDENT] });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this announcement?')) {
      const res = await deleteNotice(id);
      if (res.success) fetchNotices();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Platform Broadcasts</h1>
          <p className="text-slate-500 font-medium">Send announcements to all institutions and users.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all"
        >
          <Megaphone className="w-4 h-4" />
          Create Broadcast
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
             <div className="bg-white p-20 rounded-[40px] border border-slate-100 text-center text-slate-400 font-bold">Loading broadcasts...</div>
          ) : notices.length === 0 ? (
             <div className="bg-white p-20 rounded-[40px] border border-slate-100 text-center text-slate-400 font-bold">No broadcasts sent yet.</div>
          ) : (
            notices.map((notice) => (
              <div key={notice.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden group hover:border-indigo-200 transition-all">
                <div className="p-8">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-5">
                      <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 shadow-inner">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{notice.title}</h3>
                        <div className="flex flex-wrap gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(notice.createdAt).toLocaleDateString()}</span>
                           <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {notice.targetRoles.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(notice.id)} className="p-2 text-slate-300 hover:text-red-600 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-6 text-slate-600 font-medium leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    {notice.content}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                 <AlertCircle className="w-10 h-10 text-amber-400 mb-6" />
                 <h4 className="text-2xl font-black tracking-tight leading-tight">Broadcast <br/>Guidelines</h4>
                 <ul className="mt-6 space-y-4">
                    {[
                      "Global notices reach ALL institutions.",
                      "Use for maintenance or policy updates.",
                      "Check target roles carefully before sending."
                    ].map((text, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-400 font-medium leading-tight">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                        {text}
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
           </div>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
           <div className="bg-white rounded-[40px] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                 <div>
                    <h2 className="text-2xl font-black text-slate-900">New Platform Broadcast</h2>
                    <p className="text-sm font-medium text-slate-500">This will be visible to all tenants.</p>
                 </div>
                 <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-200 rounded-2xl transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                 </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notice Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g. Scheduled System Maintenance" 
                      className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" 
                    />
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Announcement Content</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      placeholder="Enter the message details here..." 
                      className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold resize-none" 
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Audience</label>
                    <div className="flex flex-wrap gap-2">
                       {[UserRole.SCHOOL_ADMIN, UserRole.TEACHER, UserRole.STUDENT, UserRole.PARENT].map((role) => (
                         <button
                           key={role}
                           type="button"
                           onClick={() => {
                             const exists = formData.targetRoles.includes(role);
                             if (exists) {
                               setFormData({...formData, targetRoles: formData.targetRoles.filter(r => r !== role)});
                             } else {
                               setFormData({...formData, targetRoles: [...formData.targetRoles, role]});
                             }
                           }}
                           className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                             formData.targetRoles.includes(role) 
                             ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                             : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-200'
                           }`}
                         >
                           {role.replace('_', ' ')}
                         </button>
                       ))}
                    </div>
                 </div>

                 <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-sm shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    Send Global Broadcast
                    <Send className="w-4 h-4" />
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
