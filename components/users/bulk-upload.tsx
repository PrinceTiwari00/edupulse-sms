"use client";

import React from 'react';
import { Upload, FileSpreadsheet, Download, AlertCircle, CheckCircle2, X } from 'lucide-react';

interface BulkUploadProps {
  title: string;
  templateUrl: string;
  onUpload: (file: File) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function BulkUpload({ title, templateUrl, onUpload, isOpen, onClose }: BulkUploadProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Bulk Import: {title}</h2>
            <p className="text-sm text-slate-500">Upload CSV or Excel files to import data</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          {/* Step 1: Download Template */}
          <div className="mb-8 p-4 bg-indigo-50 rounded-2xl flex items-center justify-between border border-indigo-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-indigo-900">Download Template</p>
                <p className="text-xs text-indigo-700">Use our pre-formatted file to ensure error-free import</p>
              </div>
            </div>
            <a 
              href={templateUrl}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Template
            </a>
          </div>

          {/* Step 2: Upload Area */}
          <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-indigo-400 transition-colors group cursor-pointer bg-slate-50/50">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Click to upload or drag & drop</h3>
            <p className="text-sm text-slate-500 mt-2">Supported formats: .csv, .xlsx (Max 5MB)</p>
          </div>

          {/* Warnings */}
          <div className="mt-8 space-y-3">
            <div className="flex gap-3 items-start p-3 bg-amber-50 rounded-xl border border-amber-100">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800 leading-relaxed">
                <span className="font-bold">Important:</span> Ensure usernames and email addresses are unique. Students must be mapped to existing classes and sections.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800">
            Cancel
          </button>
          <button className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700">
            Start Processing
          </button>
        </div>
      </div>
    </div>
  );
}
