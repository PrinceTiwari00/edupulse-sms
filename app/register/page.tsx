"use client";

import React, { useState } from 'react';
import { School, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { createSchoolRequest } from '@/actions/school';

export default function RegisterSchoolPage() {
  const [formData, setFormData] = useState({
    name: '',
    subdomain: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const res = await createSchoolRequest(formData);
    
    if (res.success) {
      setMessage({ type: 'success', text: 'Registration request submitted! Our team will contact you shortly.' });
      setFormData({ name: '', subdomain: '', email: '', phone: '' });
    } else {
      setMessage({ type: 'error', text: res.error || 'Something went wrong.' });
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-[32px] border border-slate-100 shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Info */}
        <div className="w-full md:w-[40%] bg-indigo-600 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <School className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold leading-tight mb-4">Onboard your Institution</h2>
            <p className="text-indigo-100 text-sm leading-relaxed mb-8">
              Join hundreds of schools managing their operations with EduPulse. 
            </p>
            
            <div className="space-y-4">
              {[
                "Strict Data Isolation",
                "Custom Subdomains",
                "Global Analytics"
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-300 shrink-0" />
                  <span className="text-xs font-medium text-indigo-50">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-300" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Super Admin Approval Required</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-[60%] p-10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Request Account</h1>
            <p className="text-slate-500 text-sm mt-1">Our team will verify your school details shortly.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {message.text && (
              <div className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold ${
                message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
              }`}>
                {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {message.text}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">School Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Greenwood International" 
                className="w-full px-4 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preferred Subdomain</label>
              <div className="flex items-center">
                <input 
                  type="text" 
                  required
                  value={formData.subdomain}
                  onChange={(e) => setFormData({...formData, subdomain: e.target.value})}
                  placeholder="greenwood" 
                  className="flex-1 px-4 py-3 border border-slate-100 rounded-l-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" 
                />
                <span className="bg-slate-100 border border-l-0 border-slate-100 px-4 py-3 rounded-r-2xl text-xs font-bold text-slate-500">.edupulse.com</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="admin@school.edu" 
                  className="w-full px-4 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1..." 
                  className="w-full px-4 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" 
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-400 font-medium">
            Already have an account? <Link href="/login" className="text-indigo-600 font-black hover:underline tracking-tight">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
