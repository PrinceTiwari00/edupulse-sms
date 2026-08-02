"use client";

import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { School, ArrowRight, ShieldCheck, Zap, Globe, Sparkles, Loader2, Lock, User } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { status } = useSession();

  // Redirect if already authenticated
  if (status === 'authenticated') {
    router.push('/');
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('AUTHENTICATION FAILED: INVALID CREDENTIALS');
      setLoading(false);
    } else {
      router.refresh();
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 selection:bg-indigo-100">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[64px] border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden min-h-[800px]">
        
        {/* Left Side - Hero / Branding */}
        <div className="bg-slate-50 p-16 flex flex-col justify-between relative overflow-hidden group border-r border-slate-100">
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-4 text-slate-900 hover:opacity-80 transition-all">
                <div className="bg-indigo-600 p-3 rounded-[24px] shadow-2xl shadow-indigo-200">
                  <School className="w-10 h-10 text-white" />
                </div>
                <span className="text-4xl font-black tracking-tighter uppercase leading-none">EduPulse</span>
            </Link>
            
            <div className="mt-24 space-y-10">
              <h1 className="text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter uppercase">
                Modern <br/>
                <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">School</span> <br/>
                Governance.
              </h1>
              <p className="text-xl text-slate-500 font-bold leading-relaxed max-w-md">
                The next-generation ERP for institutional excellence. Automated, multi-tenant, and high-fidelity.
              </p>
            </div>

            <div className="mt-24 grid grid-cols-2 gap-8">
               <div className="space-y-3">
                  <div className="p-3 bg-white rounded-2xl w-fit shadow-sm border border-slate-100">
                     <ShieldCheck className="w-6 h-6 text-indigo-600" />
                  </div>
                  <p className="text-slate-900 font-black uppercase text-sm tracking-widest leading-none">Verified Secure</p>
                  <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase tracking-tighter">Enterprise Data Isolation</p>
               </div>
               <div className="space-y-3">
                  <div className="p-3 bg-white rounded-2xl w-fit shadow-sm border border-slate-100">
                     <Zap className="w-6 h-6 text-indigo-600" />
                  </div>
                  <p className="text-slate-900 font-black uppercase text-sm tracking-widest leading-none">Real-time Sync</p>
                  <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase tracking-tighter">Global Low Latency</p>
               </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-slate-300 text-[10px] font-black uppercase tracking-widest">
             <p>© 2026 EDUPULSE PLATFORM</p>
             <div className="flex gap-4">
                <Link href="#" className="hover:text-indigo-600 transition-colors">HELP</Link>
                <Link href="#" className="hover:text-indigo-600 transition-colors">LEGAL</Link>
             </div>
          </div>

          {/* Background Decorations */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-indigo-500/[0.03] to-transparent pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-100 rounded-full blur-[100px] transition-all duration-700"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-20 flex flex-col justify-center bg-white relative">
           <div className="max-w-[440px] mx-auto w-full">
              <div className="mb-12">
                 <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Terminal Access</h2>
                 <p className="text-lg text-slate-400 font-bold mt-4">Provide credentials to enter your management dashboard.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-8">
                {error && (
                  <div className="bg-red-50 border-2 border-red-100 text-red-600 p-6 rounded-[32px] text-xs font-black uppercase tracking-widest flex items-center gap-4 animate-in slide-in-from-top-2 duration-300 shadow-xl shadow-red-100">
                    <Lock className="w-5 h-5" />
                    {error}
                  </div>
                )}

                <div className="space-y-2 group">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within:text-indigo-600 transition-colors">Username ID</label>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="e.g. admin.zenith"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-slate-50 rounded-[32px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-lg font-bold placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <div className="flex justify-between items-center ml-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] group-focus-within:text-indigo-600 transition-colors">Secret Password</label>
                    <Link href="/forgot-password" title="Recover Access" className="text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">Recovery</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-slate-50 rounded-[32px] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-lg font-bold placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-7 bg-slate-950 text-white rounded-[32px] font-black text-sm uppercase tracking-[0.3em] shadow-[0_24px_50px_-10px_rgba(0,0,0,0.3)] hover:bg-indigo-600 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-4 group active:scale-95 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : (
                      <>
                        Launch Dashboard
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-16 text-center space-y-6">
                 <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">New Institution?</p>
                 <div className="flex items-center justify-center gap-4">
                    <Link href="/register" className="px-10 py-5 bg-white border-2 border-slate-100 rounded-[24px] font-black text-xs uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-all shadow-sm">Initialize Setup</Link>
                    <Link href="/demo" className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Request Live Demo</Link>
                 </div>
              </div>
           </div>

           {/* Foreground Floating Elements */}
           <div className="absolute top-12 right-12 text-slate-50 pointer-events-none opacity-5">
              <Globe className="w-48 h-48 rotate-12" />
           </div>
        </div>
      </div>
    </div>
  );
}
