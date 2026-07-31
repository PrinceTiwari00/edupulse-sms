"use client";

import React from 'react';
import { Calendar as CalendarIcon, Check, X, Clock, AlertCircle, Save } from 'lucide-react';

const students = [
  { id: '1', roll: '101', name: 'Aaron Smith' },
  { id: '2', roll: '102', name: 'Bella Thorne' },
  { id: '3', roll: '103', name: 'Chris Evans' },
  { id: '4', roll: '104', name: 'Daisy Ridley' },
  { id: '5', roll: '105', name: 'Ethan Hawke' },
];

export default function AttendanceMarking() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Attendance</h1>
          <p className="text-slate-500 text-sm">Mark attendance for Grade 10 - Section A</p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Date</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white text-sm text-slate-600">
              <CalendarIcon className="w-4 h-4 text-slate-400" />
              <span>Oct 24, 2024</span>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all font-semibold shadow-sm h-fit self-end">
            <Save className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 bg-slate-50 border-b text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-1 px-6 py-4">Roll No</div>
          <div className="col-span-4 px-6 py-4">Student Name</div>
          <div className="col-span-7 px-6 py-4 text-center">Attendance Status</div>
        </div>

        <div className="divide-y">
          {students.map((student) => (
            <div key={student.id} className="grid grid-cols-12 items-center hover:bg-slate-50/50 transition-colors">
              <div className="col-span-1 px-6 py-4 font-mono text-sm text-slate-500">{student.roll}</div>
              <div className="col-span-4 px-6 py-4 font-semibold text-slate-900">{student.name}</div>
              <div className="col-span-7 px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-green-100 bg-green-50 text-green-700 text-xs font-bold transition-all hover:scale-105 active:scale-95">
                    <Check className="w-4 h-4" /> Present
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-100 text-slate-400 text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all">
                    <X className="w-4 h-4" /> Absent
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-100 text-slate-400 text-xs font-bold hover:bg-amber-50 hover:text-amber-600 hover:border-amber-100 transition-all">
                    <Clock className="w-4 h-4" /> Late
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-100 text-slate-400 text-xs font-bold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all">
                    <AlertCircle className="w-4 h-4" /> Half Day
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3 items-start">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Note for Teacher</p>
          <p className="text-sm text-amber-700">Once attendance is saved, parents will receive automated mobile notifications for absent students.</p>
        </div>
      </div>
    </div>
  );
}
