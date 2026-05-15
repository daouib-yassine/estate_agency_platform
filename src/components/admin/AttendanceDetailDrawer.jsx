"use client";
import React from 'react';
import { 
  X, Building2, Clock, Calendar, Phone, Mail, RefreshCw 
} from 'lucide-react';
import { STATUS_CONFIG } from '@/constants/attendance';

// Helper for date formatting
const fmt = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function AttendanceDetailDrawer({ record, onClose, updateStatus }) {
  if (!record) return null;

  const cfg = STATUS_CONFIG[record.status] || STATUS_CONFIG.absent;
  const StatusIcon = cfg.icon;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0f1f3d]/40 z-[99] backdrop-blur-sm transition-opacity animate-in fade-in" 
        onClick={onClose} 
      />
      
      {/* Drawer Sidebar */}
      <aside className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[100] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-8 bg-[#0f1f3d]">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#b89a5a]">Record · {record.id}</p>
            <h2 className="mt-1 font-serif text-2xl text-white">{record.employeeName}</h2>
            <p className="text-[11px] text-white/50 mt-1 uppercase tracking-wider">{record.role}</p>
          </div>
          <button 
            onClick={onClose} 
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Current Status</h3>
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
              <StatusIcon size={12} /> {cfg.label}
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Work Details</h3>
            <div className="rounded-sm bg-[#f7f6f3] border border-[#e2ddd6] p-5 space-y-3">
              <div className="flex items-center gap-3 text-[13px] font-medium text-[#0f1f3d]">
                <Building2 size={14} className="text-[#b89a5a]" /> {record.department}
              </div>
              <div className="flex items-center gap-3 text-[12px] text-gray-600">
                <Clock size={14} className="text-[#b89a5a]" /> Shift: {record.shift}
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Log Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-[13px]">
                <Calendar size={14} className="text-[#b89a5a] mt-0.5" /> {fmt(record.date)}
              </div>
              <div className="flex items-start gap-3 text-[13px]">
                <Clock size={14} className="text-[#b89a5a] mt-0.5" /> 
                <div>
                  <p className="font-bold">Check-in</p>
                  <p className="text-gray-500">{record.checkInTime}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Actions Footer */}
        <div className="border-t border-[#e2ddd6] p-6 bg-[#faf9f7] space-y-3">
          {record.status === 'late' && (
            <button onClick={() => updateStatus(record.id, 'present')} className="w-full bg-emerald-600 text-white py-3 text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-emerald-700 transition-all shadow-sm">
              Verify Presence
            </button>
          )}
          
          {record.status === 'present' && (
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => updateStatus(record.id, 'checked-out')} className="bg-[#0f1f3d] text-white py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#b89a5a] transition-all">
                Check Out
              </button>
              <button onClick={() => updateStatus(record.id, 'on-leave')} className="bg-white border border-rose-200 text-rose-700 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-rose-50 transition-all">
                Mark Leave
              </button>
            </div>
          )}

          {(['checked-out', 'absent', 'on-leave'].includes(record.status)) && (
            <button onClick={() => updateStatus(record.id, 'present')} className="w-full border border-[#b89a5a] text-[#b89a5a] py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#b89a5a] hover:text-white transition-all">
              <RefreshCw size={12} className="inline mr-2" /> Reset Status
            </button>
          )}
        </div>
      </aside>
    </>
  );
}