"use client";

import React, { useState } from 'react';
import { 
  User, 
  Eye, 
  EyeOff,
  Lock, 
  School,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid username or password');
      } else {
        // Successful login - redirect to appropriate dashboard based on role?
        // For now, redirect to /admin as a default landing
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-slate-50">
      <div className="relative z-10 w-full max-w-[850px] bg-white rounded-[32px] border border-slate-100 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* Left Section - Indigo Sidebar */}
        <div className="w-full md:w-[40%] bg-indigo-600 p-8 text-white flex flex-col justify-between items-center text-center">
          <div className="space-y-6 flex flex-col items-center">
            <Link href="/" className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner hover:bg-white/30 transition-colors">
              <School className="w-9 h-9 text-white" />
            </Link>
            <div>
              <h2 className="text-2xl font-black tracking-tight uppercase">EduPulse</h2>
              <p className="text-indigo-100 text-xs font-bold tracking-[0.2em] uppercase mt-1">Management System</p>
            </div>
          </div>

          <div className="w-full space-y-4">
             <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                <p className="text-xs font-medium text-indigo-50 leading-relaxed">
                  Trusted by 500+ institutions worldwide for seamless academic operations.
                </p>
             </div>
             
             <div className="flex gap-2 w-full">
                <Link href="/login/teacher" className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl font-bold text-[10px] transition-all uppercase border border-white/10 flex items-center justify-center">
                  Teacher Portal
                </Link>
                <Link href="/login/student" className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl font-bold text-[10px] transition-all uppercase border border-white/10 flex items-center justify-center">
                  Student Portal
                </Link>
             </div>
          </div>
        </div>

        {/* Right Section - Sign In Form */}
        <div className="w-full md:w-[60%] p-12 bg-white flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sign In</h1>
            <p className="text-slate-500 font-medium mt-1">Welcome back. Please sign in to continue.</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold transition-all"
                />
                <User className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <Link href="/forgot-password" className="text-[9px] font-black text-indigo-600 uppercase hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
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

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Keep me signed in</span>
              </label>
              
              <button 
                type="submit"
                disabled={loading}
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>

          <p className="mt-12 text-center text-xs text-slate-400 font-medium">
            New Institution? <Link href="/register" className="text-indigo-600 font-black hover:underline tracking-tight">Register School Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
