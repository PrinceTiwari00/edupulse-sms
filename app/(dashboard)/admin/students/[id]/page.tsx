"use client";

import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  FileText, 
  ShieldCheck, 
  Activity, 
  ChevronRight,
  Printer,
  Edit3
} from 'lucide-react';

export default function StudentDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, fetch student data using the ID
  const student = {
    name: 'Alice Johnson',
    admissionNo: 'ADM-2024-001',
    class: 'Grade 10',
    section: 'A',
    rollNo: '101',
    dob: 'May 14, 2008',
    gender: 'Female',
    email: 'alice.j@school.edu',
    phone: '+1 555-010-9988',
    address: '123 Academic Way, Education District, NY 10001',
    parentName: 'Robert Johnson',
    parentPhone: '+1 555-010-7766',
    bloodGroup: 'O+',
    attendance: '94%',
    gpa: '3.8',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-indigo-100 ring-4 ring-white">
            AJ
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-slate-900">{student.name}</h1>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
            </div>
            <p className="text-slate-500 mt-1 flex items-center gap-2 font-medium">
              {student.admissionNo} <span className="text-slate-300">|</span> {student.class} - {student.section}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <Printer className="w-4 h-4" />
            Print ID Card
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Personal Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-slate-50/50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-500" />
                Personal Details
              </h3>
            </div>
            <div className="p-6 space-y-5">
              {[
                { label: 'Date of Birth', value: student.dob, icon: Calendar },
                { label: 'Gender', value: student.gender, icon: Activity },
                { label: 'Blood Group', value: student.bloodGroup, icon: Activity },
                { label: 'Email Address', value: student.email, icon: Mail },
                { label: 'Contact Number', value: student.phone, icon: Phone },
                { label: 'Home Address', value: student.address, icon: MapPin },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg h-fit">
                    <item.icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
            <h3 className="font-bold flex items-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              Parent / Guardian
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Primary Guardian</p>
                <p className="text-lg font-bold mt-1">{student.parentName}</p>
                <p className="text-sm text-indigo-400 font-medium">Father</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium">{student.parentPhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Academic History & Records */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attendance</p>
              <p className="text-3xl font-black text-slate-900 mt-2">{student.attendance}</p>
              <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[94%]"></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current GPA</p>
              <p className="text-3xl font-black text-indigo-600 mt-2">{student.gpa}</p>
              <p className="text-xs font-bold text-green-600 mt-2">+0.2 from last term</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm col-span-2 md:col-span-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assignments</p>
              <p className="text-3xl font-black text-slate-900 mt-2">12/14</p>
              <p className="text-xs font-bold text-slate-500 mt-2">Completed this term</p>
            </div>
          </div>

          {/* Academic Tabs */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex border-b">
              <button className="px-8 py-5 text-sm font-bold border-b-2 border-indigo-600 text-indigo-600">Performance</button>
              <button className="px-8 py-5 text-sm font-bold text-slate-400 hover:text-slate-600">Attendance Log</button>
              <button className="px-8 py-5 text-sm font-bold text-slate-400 hover:text-slate-600">Documents</button>
            </div>
            
            <div className="p-8">
              <h4 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
                Current Term Grades
                <button className="text-indigo-600 text-xs font-bold flex items-center gap-1">
                  View Full Report Card <ChevronRight className="w-4 h-4" />
                </button>
              </h4>
              <div className="space-y-4">
                {[
                  { subject: 'Mathematics', score: 92, grade: 'A+' },
                  { subject: 'Physics', score: 88, grade: 'A' },
                  { subject: 'English', score: 95, grade: 'A+' },
                  { subject: 'Chemistry', score: 76, grade: 'B' },
                ].map((item) => (
                  <div key={item.subject} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-bold text-indigo-600">
                        {item.subject[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{item.subject}</p>
                        <p className="text-xs text-slate-400">Term 1 Examination</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-900">{item.score}/100</p>
                      <p className={`text-xs font-bold ${item.score > 80 ? 'text-green-600' : 'text-amber-600'}`}>{item.grade}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
