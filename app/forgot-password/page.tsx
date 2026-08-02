"use client";

import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-[450px] bg-white rounded-[32px] border border-slate-100 shadow-2xl p-10 text-center space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-green-50 text-green-600 rounded-2xl border border-green-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Email Sent</h1>
            <p className="text-slate-500 text-sm font-medium">Please check your inbox for recovery instructions.</p>
          </div>
          <Link href="/login" className="block w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-slate-800 transition-all">
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-[450px] bg-white rounded-[32px] border border-slate-100 shadow-2xl p-10 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Recovery</h1>
          <p className="text-slate-500 font-medium">Reset your administrative password</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
            <div className="relative">
              <input 
                type="email" 
                placeholder="admin@institution.edu"
                required
                className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold transition-all"
              />
              <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
            Send Recovery Link
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center">
          <Link href="/login" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
