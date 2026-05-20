"use client";

import React from 'react';
import { X, Building2, Clock, Calendar, Phone, Mail, RefreshCw } from 'lucide-react';
import { statusConfig } from '@/constants/attendance';

// ── MULTI-LINGUAL UI DICTIONARY ──
const drawerLocales = {
  fr: {
    dir: 'ltr',
    slideAnimate: 'animate-in slide-in-from-right',
    drawerPosition: 'right-0',
    titlePrefix: 'Présence',
    statusTitle: 'Statut',
    roleDeptTitle: 'Poste & Département',
    shiftLabel: 'Équipe',
    hoursWorkedLabel: 'Heures Travaillées',
    recordTitle: 'Détails du pointage',
    checkInLabel: 'Arrivée',
    checkOutLabel: 'Départ',
    contactTitle: 'Coordonnées de contact',
    notesTitle: 'Notes / Remarques',
    noNotes: 'Aucune note ajoutée pour ce pointage.',
    actions: {
      markPresent: '✓ Marquer Présent',
      markAbsent: 'Marquer Absent',
      checkOut: '✓ Enregistrer le Départ',
      markLeave: '✕ Marquer En Congé',
      resetPresent: 'Réinitialiser à Présent'
    },
    statuses: { present: 'Présent', absent: 'Absent', late: 'En Retard', 'on-leave': 'En Congé', 'checked-out': 'Départ Validé' },
    depts: { 'Sales': 'Ventes', 'Management': 'Direction', 'Marketing': 'Marketing' }
  },
  en: {
    dir: 'ltr',
    slideAnimate: 'animate-in slide-in-from-right',
    drawerPosition: 'right-0',
    titlePrefix: 'Attendance',
    statusTitle: 'Status',
    roleDeptTitle: 'Role & Department',
    shiftLabel: 'Shift',
    hoursWorkedLabel: 'Hours Worked',
    recordTitle: 'Attendance Record',
    checkInLabel: 'Check-in',
    checkOutLabel: 'Check-out',
    contactTitle: 'Contact Details',
    notesTitle: 'Notes',
    noNotes: 'No notes added for this attendance log.',
    actions: {
      markPresent: '✓ Mark Present',
      markAbsent: 'Mark Absent',
      checkOut: '✓ Check Out',
      markLeave: '✕ Mark On Leave',
      resetPresent: 'Reset to Present'
    },
    statuses: { present: 'Present', absent: 'Absent', late: 'Late', 'on-leave': 'On Leave', 'checked-out': 'Checked Out' },
    depts: { 'Sales': 'Sales', 'Management': 'Management', 'Marketing': 'Marketing' }
  },
  ar: {
    dir: 'rtl',
    slideAnimate: 'animate-in slide-in-from-left',
    drawerPosition: 'left-0',
    titlePrefix: 'سجل الحضور',
    statusTitle: 'الحالة',
    roleDeptTitle: 'المسمى الوظيفي والقسم',
    shiftLabel: 'الفترة',
    hoursWorkedLabel: 'ساعات العمل',
    recordTitle: 'تفاصيل التسجيل',
    checkInLabel: 'تسجيل الدخول',
    checkOutLabel: 'تسجيل الخروج',
    contactTitle: 'معلومات الاتصال',
    notesTitle: 'ملاحظات',
    noNotes: 'لا توجد أي ملاحظات مضافة لسجل الحضور هذا.',
    actions: {
      markPresent: '✓ تسجيل كـ حاضر',
      markAbsent: 'تسجيل كـ غائب',
      checkOut: '✓ تسجيل خروج',
      markLeave: '✕ تسجيل في إجازة',
      resetPresent: 'إعادة تعيين إلى حاضر'
    },
    statuses: { present: 'حاضر', absent: 'غائب', late: 'متأخر', 'on-leave': 'في إجازة', 'checked-out': 'تم تسجيل الخروج' },
    depts: { 'Sales': 'المبيعات', 'Management': 'الإدارة', 'Marketing': 'التسويق' }
  }
};

/**
 * Clean Local Date Formatter Synced with App Runtime Context
 */
function fmt(dateString, currentLang) {
  if (!dateString) return '';
  try {
    const localeSelection = currentLang === 'ar' ? 'ar-MA' : currentLang === 'fr' ? 'fr-FR' : 'en-US';
    return new Date(dateString).toLocaleDateString(localeSelection, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (e) {
    return dateString;
  }
}

export function AttendanceDetailDrawer({ record, onClose, updateStatus, currentLang = 'fr' }) {
  if (!record) return null;

  const t = drawerLocales[currentLang] || drawerLocales.fr;
  const isRTL = t.dir === 'rtl';

  const cfg = statusConfig[record.status] || { label: record.status, color: 'text-gray-500', bg: 'bg-gray-50', icon: Clock };
  const StatusIcon = cfg.icon;

  return (
    <>
      {/* Backdrop blur overlay */}
      <div className="fixed inset-0 bg-black/20 z-30 backdrop-blur-sm" onClick={onClose} />
      
      {/* Slider Drawer Container (Positions dynamically left-0 / right-0 and transitions gracefully) */}
      <aside 
        dir={t.dir} 
        className={`fixed top-0 bottom-0 w-full max-w-md bg-white z-40 shadow-2xl flex flex-col overflow-hidden duration-200 ${t.drawerPosition} ${t.slideAnimate}`}
      >
        
        {/* Top Header Information Panel */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#0f1f3d]">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#b89a5a]">
              {t.titlePrefix} · {record.id}
            </p>
            <h2 className={`mt-1 text-xl text-white ${isRTL ? 'font-sans font-bold' : 'font-serif'}`}>
              {record.employeeName}
            </h2>
            <p className="text-[11px] text-white/50 mt-0.5">
              {record.role} · {t.depts[record.department] || record.department}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable Detailed Sections */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Status badge section */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{t.statusTitle}</h3>
            <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
              <StatusIcon size={10} />
              <span>{t.statuses[record.status] || cfg.label}</span>
            </div>
          </div>

          {/* Department Metadata Info Block */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{t.roleDeptTitle}</h3>
            <div className="rounded-sm bg-[#f7f6f3] p-4 space-y-1">
              <p className="font-medium text-[13px] text-[#0f1f3d]">{record.role}</p>
              <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                <Building2 size={10} className="text-[#b89a5a]" />
                <span>{t.depts[record.department] || record.department}</span>
              </p>
              <p className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-1">
                <Clock size={10} className="text-[#b89a5a]" />
                <span dir="ltr" className={isRTL ? 'w-full text-right' : ''}>
                  {t.shiftLabel}: {record.shift}
                </span>
              </p>
              {record.workHours && record.workHours !== '–' && (
                <p className="text-[12px] font-bold text-[#b89a5a] mt-2 pt-1 border-t border-[#e2ddd6]/60">
                  {t.hoursWorkedLabel}: {record.workHours}
                </p>
              )}
            </div>
          </div>

          {/* Core Check-in & Check-out logs */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{t.recordTitle}</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center gap-2 text-[12px]">
                <Calendar size={12} className="text-[#b89a5a]" />
                <span>{fmt(record.date, currentLang)}</span>
              </div>
              <div className="flex items-center gap-2 text-[12px]">
                <Clock size={12} className="text-[#b89a5a]" />
                <span dir="ltr" className={isRTL ? 'w-full text-right' : ''}>
                  {t.checkInLabel}: {record.checkInTime}
                </span>
              </div>
              {record.checkOutTime && (
                <div className="flex items-center gap-2 text-[12px]">
                  <Clock size={12} className="text-[#b89a5a]" />
                  <span dir="ltr" className={isRTL ? 'w-full text-right' : ''}>
                    {t.checkOutLabel}: {record.checkOutTime}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Methods Block */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{t.contactTitle}</h3>
            <div className="space-y-2 text-gray-700">
              {record.employeePhone && (
                <div className="flex items-center gap-2 text-[12px]">
                  <Phone size={12} className="text-[#b89a5a]" />
                  <span dir="ltr" className={`font-mono tracking-normal ${isRTL ? 'w-full text-right' : ''}`}>
                    {record.employeePhone}
                  </span>
                </div>
              )}
              {record.employeeEmail && (
                <div className="flex items-center gap-2 text-[12px]">
                  <Mail size={12} className="text-[#b89a5a]" />
                  <span dir="ltr" className={isRTL ? 'w-full text-right' : ''}>
                    {record.employeeEmail}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Optional Supervisor log notes */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{t.notesTitle}</h3>
            <p className="text-[12px] text-gray-600 bg-gray-50 rounded-sm p-3 border border-dashed border-[#e2ddd6]">
              {record.notes || t.noNotes}
            </p>
          </div>
        </div>

        {/* Dynamic Action Dispatch Footers */}
        <div className="border-t border-[#e2ddd6] p-4 space-y-2 bg-gray-50">
          {record.status === 'late' && (
            <>
              <button 
                onClick={() => updateStatus(record.id, 'present')} 
                className="w-full rounded-sm bg-emerald-50 border border-emerald-200 py-2 text-[10px] font-bold uppercase tracking-widest text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                {t.actions.markPresent}
              </button>
              <button 
                onClick={() => updateStatus(record.id, 'absent')} 
                className="w-full rounded-sm bg-gray-50 border border-gray-200 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {t.actions.markAbsent}
              </button>
            </>
          )}
          
          {record.status === 'present' && (
            <>
              <button 
                onClick={() => updateStatus(record.id, 'checked-out')} 
                className="w-full rounded-sm bg-blue-50 border border-blue-200 py-2 text-[10px] font-bold uppercase tracking-widest text-blue-700 hover:bg-blue-100 transition-colors"
              >
                {t.actions.checkOut}
              </button>
              <button 
                onClick={() => updateStatus(record.id, 'absent')} 
                className="w-full rounded-sm bg-gray-50 border border-gray-200 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {t.actions.markAbsent}
              </button>
              <button 
                onClick={() => updateStatus(record.id, 'on-leave')} 
                className="w-full rounded-sm bg-rose-50 border border-rose-200 py-2 text-[10px] font-bold uppercase tracking-widest text-rose-700 hover:bg-rose-100 transition-colors"
              >
                {t.actions.markLeave}
              </button>
            </>
          )}
          
          {(record.status === 'checked-out' || record.status === 'on-leave' || record.status === 'absent') && (
            <button 
              onClick={() => updateStatus(record.id, 'present')} 
              className="w-full rounded-sm bg-[#f0ede8] border border-[#e2ddd6] py-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:border-[#b89a5a] transition-all flex items-center justify-center gap-1.5"
            >
              <RefreshCw size={10} className={isRTL ? 'transform rotate-180' : ''} /> 
              <span>{t.actions.resetPresent}</span>
            </button>
          )}
        </div>

      </aside>
    </>
  );
}