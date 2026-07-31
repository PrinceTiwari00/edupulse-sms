"use client";

import React from 'react';
import { 
  User, 
  Eye, 
  Database, 
  Lock, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#d1d5db]">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: "url('/login-bg.png')" }}
      />
      
      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[950px] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* Left Section - Sidebar Info */}
        <div className="w-full md:w-[40%] bg-slate-50 p-8 flex flex-col items-center justify-between border-r border-slate-100">
          <div className="text-center space-y-4">
            <p className="text-sm font-bold text-slate-700">New Applicant?</p>
            <button className="bg-[#28a745] hover:bg-[#218838] text-white px-6 py-2 rounded font-bold text-sm transition-colors">
              Apply for Online Enquiry
            </button>
          </div>

          <div className="flex flex-col items-center py-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-12 h-12 bg-white rounded-full border-4 border-[#28a745] flex items-center justify-center">
                <span className="text-[#004d40] font-black text-xl italic">D</span>
              </div>
              <div className="text-left">
                <h2 className="text-[#004d40] font-black text-2xl leading-none">DYNAMIC</h2>
                <p className="text-[#28a745] font-bold text-sm tracking-widest leading-none">ACADEMIC ERP</p>
              </div>
            </div>
          </div>

          <div className="w-full flex gap-3">
            <button className="flex-1 bg-[#17a2b8] hover:bg-[#138496] text-white py-2.5 rounded font-bold text-xs transition-colors uppercase">
              Teacher Login
            </button>
            <button className="flex-1 bg-[#cc9a52] hover:bg-[#b88a46] text-white py-2.5 rounded font-bold text-xs transition-colors uppercase">
              Student Login
            </button>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-[60%] p-12 bg-white">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#2d5a4c]">Sign In</h1>
            <p className="text-slate-500 mt-2">Welcome back. Please sign in to your account.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Username */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="admin"
                className="w-full px-5 py-3.5 bg-[#eef2f7] border-none rounded focus:ring-2 focus:ring-[#2d5a4c] outline-none text-slate-700 font-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <User className="w-5 h-5" />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <input 
                type="password" 
                placeholder="••••••••••••"
                className="w-full px-5 py-3.5 bg-[#eef2f7] border-none rounded focus:ring-2 focus:ring-[#2d5a4c] outline-none text-slate-700 font-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Eye className="w-5 h-5" />
              </div>
            </div>

            {/* Academic Year */}
            <div className="relative">
              <select className="w-full px-5 py-3.5 bg-[#eef2f7] border-none rounded focus:ring-2 focus:ring-[#2d5a4c] outline-none text-slate-700 font-medium appearance-none">
                <option>CurrentYear</option>
                <option>2025-2026</option>
                <option>2024-2025</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <div className="h-5 w-[1px] bg-slate-300 mx-2"></div>
                <Database className="w-5 h-5 text-slate-400" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#004d40] focus:ring-[#004d40]" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Remember Me</span>
              </label>
              
              <button className="bg-[#004d40] hover:bg-[#00332c] text-white px-10 py-3 rounded font-black text-sm transition-all shadow-lg">
                Sign In
              </button>
            </div>

            <div className="pt-6 text-center border-t border-slate-50">
              <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#004d40] transition-colors">
                <Lock className="w-4 h-4" />
                Forgot your password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
