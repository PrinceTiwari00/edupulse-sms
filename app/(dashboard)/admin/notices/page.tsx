"use client";

import React from 'react';
import { Megaphone, Plus, Calendar, Users, Eye, Trash2, Edit } from 'lucide-react';

const notices = [
  { 
    id: 1, 
    title: 'Annual Sports Meet 2024', 
    date: '24 Oct 2024', 
    target: ['Student', 'Parent', 'Teacher'], 
    priority: 'High',
    content: 'The annual sports meet is scheduled for next month. All students must register for events by Oct 30.' 
  },
  { 
    id: 2, 
    title: 'Winter Uniform Change', 
    date: '20 Oct 2024', 
    target: ['Parent', 'Student'], 
    priority: 'Normal',
    content: 'Students are required to switch to winter uniforms starting from November 1st.' 
  },
  { 
    id: 3, 
    title: 'Staff Meeting: Curriculum Review', 
    date: '18 Oct 2024', 
    target: ['Teacher', 'Accountant'], 
    priority: 'Urgent',
    content: 'Mandatory staff meeting in the conference hall at 3:00 PM.' 
  },
];

export default function NoticeBoard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notice Board</h1>
          <p className="text-slate-500 text-sm">Create and broadcast announcements to the school community</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Post New Notice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    notice.priority === 'Urgent' ? 'bg-red-50 text-red-600' : 
                    notice.priority === 'High' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{notice.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {notice.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                        <Users className="w-3.5 h-3.5" />
                        Visible to: {notice.target.join(', ')}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        notice.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 
                        notice.priority === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {notice.priority}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 text-slate-600 text-sm leading-relaxed border-l-4 border-slate-100 pl-4">
                {notice.content}
              </div>
            </div>
            
            <div className="px-6 py-3 bg-slate-50 border-t flex justify-between items-center">
              <span className="text-xs text-slate-400 font-medium italic">Posted by: Principal Office</span>
              <button className="flex items-center gap-2 text-indigo-600 text-xs font-bold hover:underline">
                <Eye className="w-3.5 h-3.5" />
                View Read Receipts
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
