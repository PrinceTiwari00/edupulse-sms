"use client";

import React, { useState } from 'react';
import { User, Eye, EyeOff, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StudentLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-[450px] bg-white rounded-[32px] border border-slate-100 shadow-2xl p-10 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Student Portal</h1>
          <p className="text-slate-500 font-medium">View your grades, timetable and fees</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admission Number</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="2024/ADM/001"
                className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold transition-all"
              />
              <User className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group">
            Login as Student
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center">
          <Link href="/login" className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
            ← Back to main login
          </Link>
        </div>
      </div>
    </div>
  );
}
