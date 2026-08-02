"use client";

import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  CreditCard, 
  Globe, 
  Bell, 
  Save, 
  Lock, 
  Palette,
  Cloud,
  Mail,
  Zap,
  User as UserIcon,
  CheckCircle2
} from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('platform');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const role = session?.user?.role || 'SUPER_ADMIN';

  // Role-based sidebar items
  const sidebarItems = role === 'SUPER_ADMIN' ? [
    { id: 'platform', label: 'Platform Profile', icon: Globe },
    { id: 'auth', label: 'Authentication', icon: Shield },
    { id: 'billing', label: 'Billing & Gateway', icon: CreditCard },
    { id: 'notifications', label: 'System Alerts', icon: Bell },
    { id: 'branding', label: 'White Labeling', icon: Palette },
  ] : [
    { id: 'profile', label: 'My Profile', icon: UserIcon },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Preferences', icon: Bell },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">System Settings</h1>
          <p className="text-slate-500 font-medium">Configure global platform parameters and security protocols.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
        >
          {saved ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Save className="w-4 h-4" />}
          {saved ? 'Changes Saved' : 'Update Settings'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                  activeTab === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="mt-6 bg-slate-900 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden">
             <div className="relative z-10">
                <Cloud className="w-8 h-8 text-indigo-400 mb-4" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Server Region</p>
                <p className="text-sm font-bold mt-1">AWS eu-north-1 (Stockholm)</p>
             </div>
             <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden min-h-[600px]">
            
            {/* Platform Profile Tab */}
            {activeTab === 'platform' && (
              <div className="p-10 space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                    <Globe className="w-5 h-5 text-indigo-500" />
                    Global Platform Identity
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Platform Name</label>
                      <input type="text" defaultValue="EduPulse SMS" className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Global Support Email</label>
                      <input type="email" defaultValue="support@edupulse.io" className="w-full px-5 py-4 border border-slate-100 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Main Site Domain</label>
                      <div className="flex">
                         <span className="px-5 py-4 bg-slate-100 border border-slate-100 rounded-l-2xl text-sm font-bold text-slate-500">https://</span>
                         <input type="text" defaultValue="edupulse.com" className="flex-1 px-5 py-4 border border-slate-100 rounded-r-2xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-10 border-t border-slate-50">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                    <Zap className="w-5 h-5 text-amber-500" />
                    Operational Mode
                  </h3>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-all">
                        <div>
                           <p className="font-bold text-slate-900">Maintenance Mode</p>
                           <p className="text-xs text-slate-500 font-medium">Disable institution access across the platform for updates.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                           <input type="checkbox" className="sr-only peer" />
                           <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                        </label>
                     </div>
                     <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-all">
                        <div>
                           <p className="font-bold text-slate-900">Allow Self-Registration</p>
                           <p className="text-xs text-slate-500 font-medium">Allow schools to submit onboarding requests from the main page.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                           <input type="checkbox" defaultChecked className="sr-only peer" />
                           <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600 shadow-inner"></div>
                        </label>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {/* Auth Tab */}
            {activeTab === 'auth' && (
              <div className="p-10 space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                    <Shield className="w-5 h-5 text-indigo-500" />
                    Security & SSO
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                       <p className="text-sm font-black text-slate-700 flex items-center gap-2">
                          <Lock className="w-4 h-4" /> Password Policy
                       </p>
                       <select className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-indigo-500">
                          <option>Strong (Min 10 chars, Symbols)</option>
                          <option>Normal (Min 8 chars)</option>
                       </select>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                       <p className="text-sm font-black text-slate-700 flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Email Verification
                       </p>
                       <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-500">Force verify email</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-500" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="p-10 space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-indigo-500" />
                    Payment Integrations
                  </h3>
                  
                  <div className="space-y-4">
                     {[
                       { name: 'Stripe', status: 'Connected', key: 'pk_test_********************' },
                       { name: 'Razorpay', status: 'Inactive', key: 'None' },
                       { name: 'PayPal', status: 'Inactive', key: 'None' },
                     ].map(gateway => (
                       <div key={gateway.name} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-black text-indigo-600">
                                {gateway.name[0]}
                             </div>
                             <div>
                                <p className="font-bold text-slate-900">{gateway.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{gateway.key}</p>
                             </div>
                          </div>
                          <button className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${gateway.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                             {gateway.status === 'Connected' ? 'Manage' : 'Connect'}
                          </button>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for others */}
            {['branding', 'notifications', 'profile', 'security'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center h-full p-20 text-center space-y-4">
                 <div className="p-6 bg-slate-50 rounded-full text-slate-300">
                    <Settings className="w-12 h-12 animate-spin-slow" />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Component Ready</h4>
                    <p className="text-slate-500 font-medium">The {activeTab} engine is configured and awaiting final asset upload.</p>
                 </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
