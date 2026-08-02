"use client";

import React, { useState } from 'react';
import { createSchoolRequest } from '@/actions/school';
import { School, Globe, Mail, Phone, ArrowRight, CheckCircle2, ShieldCheck, Zap, Loader2, Landmark } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name') as string,
      subdomain: formData.get('subdomain') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    const res = await createSchoolRequest(data);
    if (res.success) {
      setSuccess(true);
    } else {
      setError(res.error || 'Setup initialization failed.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-[800px] bg-slate-950 p-20 rounded-[64px] shadow-2xl text-center relative overflow-hidden group">
          <div className="relative z-10">
            <div className="bg-indigo-600 w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-indigo-500/40 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Initialization <br/>Confirmed</h1>
            <p className="text-xl text-slate-400 font-bold mt-8 max-w-md mx-auto leading-relaxed">
              Your institutional setup request has been logged. Our governance team will review your application and send access keys within 24 hours.
            </p>
            <div className="mt-12">
               <Link href="/login" className="px-12 py-5 bg-white text-slate-900 rounded-[28px] font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all inline-flex items-center gap-3">
                  Return to Terminal
                  <ArrowRight className="w-5 h-5" />
               </Link>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-indigo-100">
      <div className="w-full max-w-[1300px] grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[64px] border border-slate-100 shadow-2xl overflow-hidden min-h-[850px]">
        
        {/* Sidebar Left - Branding */}
        <div className="lg:col-span-4 bg-slate-50 p-16 flex flex-col justify-between relative overflow-hidden group border-r border-slate-100">
           <div className="relative z-10">
                <Link href="/" className="flex items-center gap-4 text-slate-900 hover:opacity-80 transition-all">
                    <div className="bg-indigo-600 p-2.5 rounded-[20px] shadow-2xl shadow-indigo-200">
                        <School className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-3xl font-black tracking-tighter uppercase leading-none">EduPulse</span>
                </Link>

                <div className="mt-32 space-y-12">
                   <div className="space-y-4">
                        <h2 className="text-4xl font-black text-slate-900 leading-none uppercase tracking-tighter">Initialize Institutional Setup</h2>
                        <div className="h-1.5 w-16 bg-indigo-600 rounded-full"></div>
                   </div>
                   <p className="text-lg text-slate-500 font-bold leading-relaxed">
                      Begin your journey towards modern school governance. Configure your dedicated workspace in under 60 seconds.
                   </p>
                </div>
           </div>

           <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-6">
                 <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-indigo-600" />
                 </div>
                 <div>
                    <p className="text-slate-900 font-black uppercase text-xs tracking-widest leading-none">Data Sovereignty</p>
                    <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-tighter">Strict Tenant Isolation</p>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <Zap className="w-6 h-6 text-indigo-600" />
                 </div>
                 <div>
                    <p className="text-slate-900 font-black uppercase text-xs tracking-widest leading-none">Instant Provisioning</p>
                    <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-tighter">Automated Cloud Deploy</p>
                 </div>
              </div>
           </div>

           <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-100 rounded-full blur-[100px]"></div>
        </div>

        {/* Center - Form */}
        <div className="lg:col-span-8 p-20 flex flex-col justify-center bg-white relative">
           <div className="max-w-[560px] mx-auto w-full">
              <div className="mb-12">
                 <div className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-6 border border-indigo-100">Step 1/1: CORE Profile</div>
                 <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Onboarding Terminal</h1>
                 <p className="text-lg text-slate-400 font-bold mt-4">Provide official institutional details to request a dedicated instance.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-red-50 border-2 border-red-100 text-red-600 p-6 rounded-[32px] text-xs font-black uppercase tracking-widest flex items-center gap-4 shadow-xl shadow-red-100">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2 group">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within:text-indigo-600 transition-colors">Institution Name</label>
                      <div className="relative">
                        <Landmark className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                        <input name="name" type="text" placeholder="e.g. Zenith Academy" required className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-slate-50 rounded-[32px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-lg font-bold placeholder:text-slate-300" />
                      </div>
                   </div>
                   <div className="space-y-2 group">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within:text-indigo-600 transition-colors">Target Subdomain</label>
                      <div className="relative">
                        <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                        <input name="subdomain" type="text" placeholder="e.g. zenith" required className="w-full pl-16 pr-24 py-6 bg-slate-50 border-2 border-slate-50 rounded-[32px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-lg font-bold placeholder:text-slate-300" />
                        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-sm font-black text-slate-400 uppercase">.edupulse</span>
                      </div>
                   </div>
                   <div className="space-y-2 group">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within:text-indigo-600 transition-colors">Primary Email</label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                        <input name="email" type="email" placeholder="official@school.com" required className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-slate-50 rounded-[32px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-lg font-bold placeholder:text-slate-300" />
                      </div>
                   </div>
                   <div className="space-y-2 group">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within:text-indigo-600 transition-colors">Contact Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                        <input name="phone" type="tel" placeholder="+977 ••••••••••" required className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-slate-50 rounded-[32px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-lg font-bold placeholder:text-slate-300" />
                      </div>
                   </div>
                </div>

                <div className="pt-8">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-7 bg-slate-950 text-white rounded-[32px] font-black text-sm uppercase tracking-[0.3em] shadow-[0_24px_50px_-10px_rgba(0,0,0,0.3)] hover:bg-indigo-600 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : (
                      <>
                        Initialize Institutional Profile
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-16 text-center space-y-6">
                 <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Already have an account?</p>
                 <Link href="/login" className="px-12 py-5 bg-white border-2 border-slate-100 rounded-[28px] font-black text-xs uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-all shadow-sm inline-block">Return to Terminal Login</Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
