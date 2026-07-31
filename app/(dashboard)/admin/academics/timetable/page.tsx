"use client";

import React from 'react';
import { Plus, Clock, User, Book, Filter } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = [
  '08:00 AM - 09:00 AM',
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM', // Lunch
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
];

export default function TimetableManagement() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Weekly Timetable</h1>
          <p className="text-slate-500 text-sm">Schedule classes and teacher assignments</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Schedule Entry</span>
        </button>
      </div>

      {/* Select Filters */}
      <div className="bg-white p-4 rounded-xl border shadow-sm flex gap-4">
        <div className="flex-1">
          <label className="text-xs font-bold text-slate-400 uppercase">Class</label>
          <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white">
            <option>Grade 10 - Section A</option>
            <option>Grade 10 - Section B</option>
            <option>Grade 11 - Section A</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="text-xs font-bold text-slate-400 uppercase">View Type</label>
          <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-white">
            <option>Class-wise View</option>
            <option>Teacher-wise View</option>
          </select>
        </div>
        <button className="self-end px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-200">
          Apply Filter
        </button>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 bg-slate-50 border-b border-r text-xs font-bold text-slate-500 uppercase w-32">Time</th>
                {days.map(day => (
                  <th key={day} className="p-4 bg-slate-50 border-b border-r text-xs font-bold text-slate-500 uppercase min-w-[150px]">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, idx) => (
                <tr key={slot} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}>
                  <td className="p-4 border-b border-r text-xs font-bold text-slate-400 text-center">
                    <Clock className="w-3 h-3 mb-1 mx-auto" />
                    {slot.split(' - ')[0]}
                  </td>
                  {days.map(day => {
                    const isLunch = slot.includes('12:00 PM');
                    if (isLunch) {
                      return (
                        <td key={day} className="p-4 border-b border-r bg-slate-100/50 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          LUNCH BREAK
                        </td>
                      );
                    }
                    
                    // Mock specific entry
                    const hasClass = Math.random() > 0.3;
                    return (
                      <td key={day} className="p-2 border-b border-r group relative">
                        {hasClass ? (
                          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-2 rounded shadow-sm">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                              <Book className="w-3 h-3" /> Mathematics
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-indigo-700 mt-1">
                              <User className="w-3 h-3" /> Dr. Sarah Wilson
                            </div>
                            <button className="absolute top-1 right-1 hidden group-hover:block p-1 bg-white rounded border shadow-sm">
                              <Plus className="w-3 h-3 text-indigo-600" />
                            </button>
                          </div>
                        ) : (
                          <div className="h-12 border-2 border-dashed border-slate-100 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-[10px] font-bold text-slate-400">+ Assign</button>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
