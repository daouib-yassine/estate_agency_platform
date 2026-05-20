"use client";

import React from 'react';
import { 
  X, Building2, Clock, Calendar, RefreshCw 
} from 'lucide-react';
import { STATUS_CONFIG } from '@/constants/attendance';

// --- Multi-lingual UI Dictionary Matrix ---
const drawerLocales = {
  fr: {
    dir: 'ltr',
    recordLabel: 'Enregistrement',
    currentStatus: 'Statut Actuel',
    workDetails: 'Détails du Poste',
    logInfo: 'Informations de Pointage',
    shiftLabel: 'Équipe',
    checkInLabel: 'Heure d\'entrée',
    btnVerify: 'Vérifier la Présence',
    btnCheckOut: 'Faire Sortir',
    btnMarkLeave: 'Marquer Congé',
    btnReset: 'Réinitialiser le Statut',
    calendarLocale: 'fr-FR'
  },
  en: {
    dir: 'ltr',
    recordLabel: 'Record',
    currentStatus: 'Current Status',
    workDetails: 'Work Details',
    logInfo: 'Log Information',
    shiftLabel: 'Shift',
    checkInLabel: 'Check-in',
    btnVerify: 'Verify Presence',
    btnCheckOut: 'Check Out',
    btnMarkLeave: 'Mark Leave',
    btnReset: 'Reset Status',
    calendarLocale: 'en-US'
  },
  ar: {
    dir: 'rtl',
    recordLabel: 'سجل رقم',
    currentStatus: 'الحالة الحالية',
    workDetails: 'تفاصيل العمل',
    logInfo: 'معلومات الحضور',
    shiftLabel: 'الفترة',
    checkInLabel: 'تسجيل الدخول',
    btnVerify: 'تأكيد الحضور',
    btnCheckOut: 'تسجيل الخروج',
    btnMarkLeave: 'تسجيل إجازة',
    btnReset: 'إعادة تعيين الحالة',
    calendarLocale: 'ar-MA'
  }
};

// Localized helper for date formatting
const fmt = (dateStr, currentLang) => {
  if (!dateStr) return '—';
  const targetLocale = drawerLocales[currentLang]?.calendarLocale || 'fr-FR';
  
  return new Date(dateStr).toLocaleDateString(targetLocale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function AttendanceDetailDrawer({ record, onClose, updateStatus, currentLang = 'fr' }) {
  if (!record) return null;

  const t = drawerLocales[currentLang] || drawerLocales.fr;
  const isRTL = t.dir === 'rtl';

  const cfg = STATUS_CONFIG[record.status] || STATUS_CONFIG.absent;
  const StatusIcon = cfg.icon;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-[#0f1f3d]/40 z-[99] backdrop-blur-sm transition-opacity animate-in fade-in" 
        onClick={onClose} 
      />
      
      {/* Dynamic Sidebar Container Box matching RTL layout definitions */}
      <aside 
        dir={t.dir}
        className={`fixed top-0 bottom-0 w-full max-w-md bg-white z-[100] shadow-2xl flex flex-col overflow-hidden animate-in duration-300 ${
          isRTL ? 'left-0 slide-in-from-left' : 'right-0 slide-in-from-right'
        }`}
      >
        
        {/* Top Header Module */}
        <div className="flex items-center justify-between px-6 py-8 bg-[#0f1f3d]">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#b89a5a]">
              {t.recordLabel} · {record.id}
            </p>
            <h2 className={`mt-1 font-serif text-2xl text-white ${isRTL ? 'font-sans font-bold' : ''}`}>
              {record.employeeName}
            </h2>
            <p className="text-[11px] text-white/50 mt-1 uppercase tracking-wider">{record.role}</p>
          </div>
          <button 
            onClick={onClose} 
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Metric Metrics Container Layout */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Status View Badge Segment */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">{t.currentStatus}</h3>
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
              <StatusIcon size={12} /> {cfg.label}
            </div>
          </section>

          {/* Business Unit Core Specifics */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">{t.workDetails}</h3>
            <div className="rounded-sm bg-[#f7f6f3] border border-[#e2ddd6] p-5 space-y-3">
              <div className="flex items-center gap-3 text-[13px] font-medium text-[#0f1f3d]">
                <Building2 size={14} className="text-[#b89a5a]" /> {record.department}
              </div>
              <div className="flex items-center gap-3 text-[12px] text-gray-600">
                <Clock size={14} className="text-[#b89a5a]" /> {t.shiftLabel}: {record.shift}
              </div>
            </div>
          </section>

          {/* Temporal Logging Timeline Stamps */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">{t.logInfo}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-[13px]">
                <Calendar size={14} className="text-[#b89a5a] mt-0.5" /> {fmt(record.date, currentLang)}
              </div>
              <div className="flex items-start gap-3 text-[13px]">
                <Clock size={14} className="text-[#b89a5a] mt-0.5" /> 
                <div>
                  <p className="font-bold text-[11px] uppercase tracking-wider text-gray-400">{t.checkInLabel}</p>
                  <p className="text-gray-700 font-medium mt-0.5">{record.checkInTime || '—'}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Operational Status Workflow Footer Matrix */}
        <div className="border-t border-[#e2ddd6] p-6 bg-[#faf9f7] space-y-3">
          {record.status === 'late' && (
            <button 
              onClick={() => updateStatus(record.id, 'present')} 
              className="w-full bg-emerald-600 text-white py-3 text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-emerald-700 transition-all shadow-sm"
            >
              {t.btnVerify}
            </button>
          )}
          
          {record.status === 'present' && (
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => updateStatus(record.id, 'checked-out')} 
                className="bg-[#0f1f3d] text-white py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#b89a5a] transition-all"
              >
                {t.btnCheckOut}
              </button>
              <button 
                onClick={() => updateStatus(record.id, 'on-leave')} 
                className="bg-white border border-rose-200 text-rose-700 py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-rose-50 transition-all"
              >
                {t.btnMarkLeave}
              </button>
            </div>
          )}

          {/* Reset Status Flow Control Trigger */}
          {['checked-out', 'absent', 'on-leave'].includes(record.status) && (
            <button 
              onClick={() => updateStatus(record.id, 'present')} 
              className="w-full border border-[#b89a5a] text-[#b89a5a] py-3 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#b89a5a] hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={12} className={isRTL ? "transform scale-x-[-1]" : ""} /> 
              {t.btnReset}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}