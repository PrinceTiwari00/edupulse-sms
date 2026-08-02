"use client";

import React from 'react';
import { School, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RegisterSchoolPage() {
  return (
    <div className="min-h-screen bg-[#e5e7eb] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{ 
          backgroundImage: "url('/login-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10 w-full max-w-[850px] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Left Section - Unified Dynamic Theme */}
        <div className="w-full md:w-[40%] bg-slate-50 p-8 flex flex-col items-center justify-between border-r border-slate-100 text-center">
          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-700 uppercase tracking-wider">Institution Setup</p>
            <div className="bg-[#28a745] text-white px-6 py-2 rounded font-black text-xs uppercase tracking-widest inline-block">
              School Registration
            </div>
          </div>

          <div className="flex flex-col items-center py-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-12 h-12 bg-white rounded-full border-4 border-[#28a745] flex items-center justify-center shrink-0">
                <span className="text-[#004d40] font-black text-xl italic">D</span>
              </div>
              <div className="text-left">
                <h2 className="text-[#004d40] font-black text-2xl leading-none">DYNAMIC</h2>
                <p className="text-[#28a745] font-bold text-xs tracking-widest leading-none">ACADEMIC ERP</p>
              </div>
            </div>
          </div>

          <div className="w-full space-y-3 text-left px-4">
            {[
              "Multi-tenant isolation",
              "Custom school subdomain",
              "Academic management suite"
            ].map((text) => (
              <div key={text} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#28a745]" />
                <span className="text-[11px] font-bold text-slate-500 uppercase">{text}</span>
              </div>
            ))}
          </div>

          <div className="w-full pt-8 flex gap-2">
            <div className="flex-1 h-1.5 bg-[#17a2b8] rounded-full opacity-30"></div>
            <div className="flex-1 h-1.5 bg-[#cc9a52] rounded-full opacity-30"></div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-[60%] p-12 bg-white flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#2d5a4c]">Register School</h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Create your institutional account to get started.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <input type="text" placeholder="School Name" className="w-full px-5 py-3.5 bg-[#eef2f7] border-none rounded text-sm focus:ring-2 focus:ring-[#2d5a4c] outline-none text-slate-700 font-medium" />
            </div>

            <div className="flex items-center gap-3">
              <input type="text" placeholder="Subdomain" className="flex-1 px-5 py-3.5 bg-[#eef2f7] border-none rounded text-sm focus:ring-2 focus:ring-[#2d5a4c] outline-none text-slate-700 font-medium" />
              <span className="text-xs font-bold text-slate-400">.edupulse.com</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input type="email" placeholder="Contact Email" className="px-5 py-3.5 bg-[#eef2f7] border-none rounded text-sm focus:ring-2 focus:ring-[#2d5a4c] outline-none text-slate-700 font-medium" />
              <input type="tel" placeholder="Phone Number" className="px-5 py-3.5 bg-[#eef2f7] border-none rounded text-sm focus:ring-2 focus:ring-[#2d5a4c] outline-none text-slate-700 font-medium" />
            </div>

            <button className="w-full bg-[#004d40] hover:bg-[#00332c] text-white py-4 rounded font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 group mt-4">
              Submit Request
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="pt-6 text-center">
              <p className="text-xs text-slate-400 font-medium">
                Already have an account? <Link href="/login" className="text-[#004d40] font-black hover:underline tracking-tight">Sign In here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
