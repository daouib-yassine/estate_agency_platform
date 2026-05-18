"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Bell, 
  CheckCircle2,
  Globe
} from 'lucide-react';

// ── DATA & HOOK IMPORTS ──
import { useMonthlyHours } from '@/hooks/use-monthly-hours';
import { MonthlyHoursPanel } from '@/components/attendance/monthly-hours-panel';
import { initialAttendances, departments, statusConfig, currentMonth, today } from '@/constants/attendance';

// ── MULTI-LINGUAL UI DICTIONARY ──
const attendanceLocales = {
  fr: {
    dir: 'ltr',
    title: 'Présence des Employés',
    subtitle: 'Suivez et gérez la présence et les absences quotidiennes des agents.',
    searchPlaceholder: 'Rechercher un agent, département...',
    btnLog: 'Enregistrer Présence',
    allDepts: 'Tous les départements',
    allStatuses: 'Tous les statuts',
    shift: 'Équipe',
    checkIn: 'Arrivée',
    checkOut: 'Départ',
    todayLabel: "Aujourd'hui",
    notifUpdated: 'Statut mis à jour à',
    statuses: { present: 'Présent', absent: 'Absent', late: 'En Retard', 'on-leave': 'En Congé' },
    depts: { 'All Departments': 'Tous les départements', 'Sales': 'Ventes', 'Management': 'Direction', 'Marketing': 'Marketing' }
  },
  en: {
    dir: 'ltr',
    title: 'Employee Attendance',
    subtitle: 'Track and manage daily employee presence and absences.',
    searchPlaceholder: 'Search agent name, department...',
    btnLog: 'Log Attendance',
    allDepts: 'All Departments',
    allStatuses: 'All Statuses',
    shift: 'Shift',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    todayLabel: 'Today',
    notifUpdated: 'Status updated to',
    statuses: { present: 'Present', absent: 'Absent', late: 'Late', 'on-leave': 'On Leave' },
    depts: { 'All Departments': 'All Departments', 'Sales': 'Sales', 'Management': 'Management', 'Marketing': 'Marketing' }
  },
  ar: {
    dir: 'rtl',
    title: 'حضور الموظفين',
    subtitle: 'تتبع وإدارة الحضور والغياب اليومي للوكلاء والموظفين.',
    searchPlaceholder: 'ابحث عن اسم الوكيل، القسم...',
    btnLog: 'تسجيل الحضور',
    allDepts: 'جميع الأقسام',
    allStatuses: 'جميع الحالات',
    shift: 'الفترة',
    checkIn: 'تسجيل الدخول',
    checkOut: 'تسجيل الخروج',
    todayLabel: 'اليوم',
    notifUpdated: 'تم تحديث الحالة إلى',
    statuses: { present: 'حاضر', absent: 'غائب', late: 'متأخر', 'on-leave': 'في إجازة' },
    depts: { 'All Departments': 'جميع الأقسام', 'Sales': 'المبيعات', 'Management': 'الإدارة', 'Marketing': 'التسويق' }
  }
};

export default function AttendanceDashboard() {
  // ── INTERNATIONALIZATION STATE ──
  const [lang, setLang] = useState('fr');
  const t = attendanceLocales[lang];
  const isRTL = t.dir === 'rtl';

  // ── STATE ──
  const [attendances, setAttendances]       = useState(initialAttendances);
  const [filterStatus, setFilterStatus]     = useState('all');
  const [filterDept, setFilterDept]         = useState('All Departments');
  const [filterDate, setFilterDate]         = useState('');
  const [searchQuery, setSearchQuery]       = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddModal, setShowAddModal]     = useState(false);
  const [notification, setNotification]     = useState(null);

  // ── HOOK PIPELINE ──
  const monthlySummaries = useMonthlyHours(attendances, currentMonth);

  // ── FILTER SYSTEM ──
  const filtered = attendances.filter(a => {
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    const matchDept   = filterDept === 'All Departments' || a.department === filterDept;
    const matchDate   = !filterDate || a.date === filterDate;
    const matchSearch = !searchQuery ||
      a.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchDept && matchDate && matchSearch;
  });

  // ── INTERCEPT & LOCALIZE DATA STREAM FOR THE CARDS ──
  const localizedRecords = filtered.map(record => ({
    ...record,
    displayStatus: t.statuses[record.status] || statusConfig[record.status]?.label || record.status,
    displayDept: t.depts[record.department] || record.department
  }));

  // ── ACTION STATE HANDLERS ──
  const updateStatus = (id, status) => {
    setAttendances(prev => prev.map(a => (a.id === id ? { ...a, status } : a)));
    setSelectedRecord(prev => (prev?.id === id ? { ...prev, status } : prev));
    
    const statusLabel = t.statuses[status] || statusConfig[status]?.label || status;
    showNotif(`${t.notifUpdated} ${statusLabel}`);
  };

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div dir={t.dir} className="flex flex-col min-h-screen bg-[#f0ede8] text-[#0f1f3d] transition-all duration-300">
      
      {/* ── NOTIFICATION TOAST OVERLAY ── */}
      {notification && (
        <div className={`fixed bottom-5 z-50 flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-4 py-3 text-[11px] text-white shadow-xl border-l-2 border-[#b89a5a] animate-in slide-in-from-bottom-2 ${isRTL ? 'left-5' : 'right-5'}`}>
          <CheckCircle2 size={14} className="text-[#b89a5a]" />
          <span>{notification}</span>
        </div>
      )}

      {/* ── HEADER ── */}
      <header className="flex items-center justify-between border-b border-[#e2ddd6] bg-white px-6 py-3.5 flex-shrink-0">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
          {new Date().toLocaleDateString(lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
        
        <div className="flex items-center gap-4">
          {/* Global Language Switcher */}
          <div className="relative flex items-center gap-1.5 bg-[#f7f6f3] border border-gray-200 rounded-sm px-2.5 py-1.5">
            <Globe size={13} className="text-[#b89a5a]" />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-[11px] font-bold uppercase outline-none cursor-pointer text-[#0f1f3d]"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
              <option value="ar">AR</option>
            </select>
          </div>

          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7f6f3] border border-gray-200 text-gray-500 hover:border-[#b89a5a] transition-colors">
            <Bell size={14} />
          </button>
          
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors">
            <Plus size={12} /> {t.btnLog}
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT WORKSPACE ── */}
      <main className="flex-1 p-6 space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-normal">{t.title}</h1>
          <p className="text-[12px] text-gray-500 mt-0.5">{t.subtitle}</p>
        </div>

        {/* ── MONTHLY HOURS INTEGRATION ── */}
        <MonthlyHoursPanel summaries={monthlySummaries} currentMonth={currentMonth} currentLang={lang} />

        {/* ── FILTER UTILITIES BAR ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-[#e2ddd6] bg-white p-4 shadow-xs">
          <div className="relative w-full max-w-xs">
            <Search className={`absolute top-2.5 h-3.5 w-3.5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`w-full rounded-sm border border-[#e2ddd6] py-1.5 text-[11px] outline-none focus:border-[#b89a5a] ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
              className="rounded-sm border border-[#e2ddd6] bg-white px-3 py-1.5 text-[11px] text-gray-600 outline-none">
              {departments.map(d => <option key={d} value={d}>{t.depts[d] || d}</option>)}
            </select>

            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              className="rounded-sm border border-[#e2ddd6] bg-white px-3 py-1.5 text-[11px] text-gray-600 outline-none">
              <option value="all">{t.allStatuses}</option>
              {Object.entries(statusConfig).map(([key, value]) => (
                <option key={key} value={key}>{t.statuses[key] || value.label}</option>
              ))}
            </select>

            <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
              className="rounded-sm border border-[#e2ddd6] bg-white px-3 py-1 text-[11px] text-gray-600 outline-none" />
          </div>
        </div>

        {/* ── MINIMALIST CARD GRID ── */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {localizedRecords.map(record => {
            const cfg = statusConfig[record.status] || { color: 'text-gray-500', bg: 'bg-gray-50' };
            return (
              <div key={record.id} onClick={() => setSelectedRecord(record)} className="group cursor-pointer rounded-sm border border-[#e2ddd6] bg-white shadow-xs overflow-hidden hover:border-[#b89a5a] transition-colors">
                <div className="h-[3px] bg-[#b89a5a]" />
                <div className="p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] text-gray-400 font-mono mb-1">
                        {record.date === today ? t.todayLabel : record.date}
                      </div>
                      <h3 className="text-[13px] font-bold text-[#0f1f3d] group-hover:text-[#b89a5a] transition-colors">{record.employeeName}</h3>
                      <p className="text-[11px] text-gray-400">{record.role} • <span className="text-[10px] italic">{record.displayDept}</span></p>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold ${cfg.color} ${cfg.bg}`}>
                      {record.displayStatus}
                    </span>
                  </div>

                  <div className="border-t border-[#f0ede8] pt-3 space-y-2 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t.shift}</span>
                      <span className="font-mono text-gray-700">{record.shift}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t.checkIn}</span>
                      <span className="font-mono text-[#0f1f3d]">{record.checkInTime}</span>
                    </div>
                    {record.checkOutTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t.checkOut}</span>
                        <span className="font-mono text-gray-700">{record.checkOutTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}