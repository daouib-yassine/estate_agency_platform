"use client";

import React from 'react';
import { Plus, Filter, Search, X, Calendar, CalendarCheck } from 'lucide-react';
import { MonthlyHoursPanel } from './monthly-hours-panel';
import { statusConfig, today } from '@/constants/attendance';

// ── MULTI-LINGUAL UI DICTIONARY ──
const viewLocales = {
  fr: {
    dir: 'ltr',
    title: 'Présence des Employés',
    subtitle: 'Suivez et gérez la présence et les absences quotidiennes des agents.',
    btnLog: 'Enregistrer Présence',
    searchPlaceholder: 'Rechercher employé ou poste...',
    clearBtn: 'Effacer',
    recordsCount: 'enregistrement',
    recordsCountPlural: 'enregistrements',
    noRecords: 'Aucun enregistrement ne correspond à vos critères',
    todayLabel: "Aujourd'hui",
    shift: 'Équipe',
    checkIn: 'Arrivée',
    checkOut: 'Départ',
    hoursWorked: 'Heures Travaillées',
    allStatuses: 'Tous les statuts',
    statuses: { present: 'Présent', absent: 'Absent', late: 'En Retard', 'on-leave': 'En Congé' },
    depts: { 'All Departments': 'Tous les départements', 'Sales': 'Ventes', 'Management': 'Direction', 'Marketing': 'Marketing' }
  },
  en: {
    dir: 'ltr',
    title: 'Employee Attendance',
    subtitle: 'Track and manage daily employee presence and absences.',
    btnLog: 'Log Attendance',
    searchPlaceholder: 'Search employee or role...',
    clearBtn: 'Clear',
    recordsCount: 'record',
    recordsCountPlural: 'records',
    noRecords: 'No attendance records match your filters',
    todayLabel: 'Today',
    shift: 'Shift',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    hoursWorked: 'Hours Worked',
    allStatuses: 'All Statuses',
    statuses: { present: 'Present', absent: 'Absent', late: 'Late', 'on-leave': 'On Leave' },
    depts: { 'All Departments': 'All Departments', 'Sales': 'Sales', 'Management': 'Management', 'Marketing': 'Marketing' }
  },
  ar: {
    dir: 'rtl',
    title: 'حضور الموظفين',
    subtitle: 'تتبع وإدارة الحضور والغياب اليومي للوكلاء والموظفين.',
    btnLog: 'تسجيل الحضور',
    searchPlaceholder: 'ابحث عن الموظف أو المسمى الوظيفي...',
    clearBtn: 'مسح التصفية',
    recordsCount: 'سجل',
    recordsCountPlural: 'سجلات',
    noRecords: 'لا توجد سجلات حضور تطابق خيارات التصفية',
    todayLabel: 'اليوم',
    shift: 'الفترة',
    checkIn: 'تسجيل الدخول',
    checkOut: 'تسجيل الخروج',
    hoursWorked: 'ساعات العمل',
    allStatuses: 'جميع الحالات',
    statuses: { present: 'حاضر', absent: 'غائب', late: 'متأخر', 'on-leave': 'في إجازة' },
    depts: { 'All Departments': 'جميع الأقسام', 'Sales': 'المبيعات', 'Management': 'الإدارة', 'Marketing': 'التسويق' }
  }
};

/**
 * Local date string formatter synced with app language runtime context
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

export function AttendanceView({
  attendances = [],
  filtered = [],
  monthlySummaries = [],
  filterStatus,
  setFilterStatus,
  filterDept,
  setFilterDept,
  filterDate,
  setFilterDate,
  searchQuery,
  setSearchQuery,
  setSelectedRecord,
  updateStatus,
  setShowAddModal,
  departments = [],
  currentLang = 'fr'
}) {
  const t = viewLocales[currentLang] || viewLocales.fr;
  const isRTL = t.dir === 'rtl';

  return (
    <div dir={t.dir} className="p-6 space-y-5 transition-all duration-300">
      
      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-normal text-[#0f1f3d] ${isRTL ? 'font-sans font-bold' : 'font-serif'}`}>
            {t.title}
          </h1>
          <p className="mt-0.5 text-[12px] text-gray-500">{t.subtitle}</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors"
        >
          <Plus size={13} /> {t.btnLog}
        </button>
      </div>

      {/* ── MONTHLY HOURS PANEL INJECTION WITH LANG PASSTHROUGH ── */}
      <MonthlyHoursPanel summaries={monthlySummaries} currentLang={currentLang} />

      {/* Dynamic Metric Status Buttons */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {Object.entries(statusConfig).map(([key, cfg]) => {
          const count = attendances.filter(a => a.status === key).length;
          const Icon = cfg.icon;
          const isSelected = filterStatus === key;
          
          return (
            <button 
              key={key}
              onClick={() => setFilterStatus(isSelected ? 'all' : key)}
              className={`rounded-sm border p-4 transition-all ${isRTL ? 'text-right' : 'text-left'} ${
                isSelected 
                  ? `${cfg.bg} ${cfg.color} shadow-md scale-[1.02]` 
                  : 'bg-white border-[#e2ddd6] hover:border-[#b89a5a]/40'
              }`}
            >
              <Icon size={16} className={isSelected ? cfg.color : 'text-gray-400'} />
              <div className="mt-2 font-serif text-2xl text-[#0f1f3d]">{count}</div>
              <div className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-gray-500">
                {t.statuses[key] || cfg.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Granular Filtering Control Matrix */}
      <div className="flex flex-wrap items-center gap-3 rounded-sm bg-white border border-[#e2ddd6] px-5 py-3.5 shadow-sm">
        <Filter size={13} className="text-gray-400" />
        
        <div className="relative">
          <Search size={12} className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
          <input 
            type="text" 
            placeholder={t.searchPlaceholder} 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)}
            className={`rounded-sm border border-gray-200 bg-[#f7f6f3] py-1.5 text-[11px] outline-none focus:border-[#b89a5a] transition-colors w-52 placeholder:text-gray-400 ${
              isRTL ? 'pr-8 pl-4' : 'pl-8 pr-4'
            }`} 
          />
        </div>

        <select 
          value={filterDept} 
          onChange={e => setFilterDept(e.target.value)}
          className="rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-1.5 text-[11px] outline-none focus:border-[#b89a5a] text-gray-600 transition-colors cursor-pointer"
        >
          {departments.map(d => (
            <option key={d} value={d}>
              {t.depts[d] || d}
            </option>
          ))}
        </select>

        <input 
          type="date" 
          value={filterDate} 
          onChange={e => setFilterDate(e.target.value)}
          className="rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-1.5 text-[11px] outline-none focus:border-[#b89a5a] text-gray-600 transition-colors" 
        />

        {(filterStatus !== 'all' || filterDept !== 'All Departments' || filterDate || searchQuery) && (
          <button 
            onClick={() => { setFilterStatus('all'); setFilterDept('All Departments'); setFilterDate(''); setSearchQuery(''); }}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-700 transition-colors"
          >
            <X size={10} /> {t.clearBtn}
          </button>
        )}
        
        <span className={`text-[10px] text-gray-400 ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
          {filtered.length} {filtered.length !== 1 ? t.recordsCountPlural : t.recordsCount}
        </span>
      </div>

      {/* Agent Performance Card Workspace */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center text-gray-400">
          <CalendarCheck size={40} className="mb-3 text-gray-200" />
          <p className="text-sm">{t.noRecords}</p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(record => {
            const cfg = statusConfig[record.status] || { label: record.status, color: 'text-gray-500', bg: 'bg-gray-50', icon: Calendar };
            const StatusIcon = cfg.icon;
            const isToday = record.date === today;

            return (
              <div 
                key={record.id} 
                onClick={() => setSelectedRecord(record)}
                className={`group cursor-pointer rounded-sm bg-white border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                  isToday ? 'border-[#b89a5a]/40 shadow-[#b89a5a]/5' : 'border-[#e2ddd6]'
                }`}
              >
                <div className="h-1 w-full rounded-t-sm bg-[#0f1f3d]" />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4 gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {isToday && (
                          <span className="rounded-full bg-[#b89a5a]/10 border border-[#b89a5a]/30 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#b89a5a]">
                            {t.todayLabel}
                          </span>
                        )}
                        <span className="rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest bg-[#0f1f3d]/5 border-[#0f1f3d]/10 text-[#0f1f3d]">
                          {t.depts[record.department] || record.department}
                        </span>
                      </div>
                      <p className="font-medium text-[13px] text-[#0f1f3d]">{record.employeeName}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{record.role}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest shrink-0 ${cfg.bg} ${cfg.color}`}>
                      <StatusIcon size={9} />
                      <span>{t.statuses[record.status] || cfg.label}</span>
                    </div>
                  </div>

                  <div className="mb-4 rounded-sm bg-[#f7f6f3] px-3 py-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t.shift}</span>
                      <span className="text-[11px] font-medium text-[#0f1f3d]">{record.shift}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t.checkIn}</span>
                      <span dir="ltr" className="text-[11px] font-medium text-[#0f1f3d]">{record.checkInTime}</span>
                    </div>
                    {record.checkOutTime && (
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t.checkOut}</span>
                        <span dir="ltr" className="text-[11px] font-medium text-[#0f1f3d]">{record.checkOutTime}</span>
                      </div>
                    )}
                    {record.workHours && record.workHours !== '–' && (
                      <div className="flex items-center justify-between border-t border-[#e2ddd6] pt-1 mt-1">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t.hoursWorked}</span>
                        <span dir="ltr" className="text-[11px] font-bold text-[#b89a5a]">{record.workHours}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center text-[11px] text-gray-500 gap-1.5">
                    <Calendar size={11} className="text-[#b89a5a]" />
                    <span>{fmt(record.date, currentLang)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}