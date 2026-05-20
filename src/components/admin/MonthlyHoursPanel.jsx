"use client";

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { formatMinutes } from '@/constants/attendance';

const TARGET_MINUTES = 160 * 60;

// --- Multi-lingual UI Dictionary Matrix ---
const panelLocales = {
  fr: {
    dir: 'ltr',
    titleLabel: 'Heures Mensuelles',
    orgTotalLabel: 'Total de l\'organisation',
    presentSuffix: 'P',
    leaveSuffix: 'C',
    absentSuffix: 'A',
    calendarLocale: 'fr-FR'
  },
  en: {
    dir: 'ltr',
    titleLabel: 'Monthly Hours',
    orgTotalLabel: 'Org total',
    presentSuffix: 'P',
    leaveSuffix: 'L',
    absentSuffix: 'A',
    calendarLocale: 'en-US'
  },
  ar: {
    dir: 'rtl',
    titleLabel: 'الساعات الشهرية',
    orgTotalLabel: 'مجموع المؤسسة',
    presentSuffix: 'حضور',
    leaveSuffix: 'إجازة',
    absentSuffix: 'غياب',
    calendarLocale: 'ar-MA'
  }
};

const MonthlyHoursPanel = ({ summaries = [], currentMonth, currentLang = 'fr' }) => {
  const t = panelLocales[currentLang] || panelLocales.fr;
  const isRTL = t.dir === 'rtl';

  // Format the calendar month context dynamically
  const monthLabel = currentMonth 
    ? new Date(currentMonth + '-01').toLocaleDateString(t.calendarLocale, { month: 'long', year: 'numeric' })
    : '';

  const totalOrgMinutes = summaries.reduce((s, e) => s + e.totalMinutes, 0);

  return (
    <div dir={t.dir} className="rounded-sm border border-[#e2ddd6] bg-white shadow-sm overflow-hidden mb-6">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0ede8]">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-[#b89a5a]" />
          <h2 className={`text-[11px] font-bold uppercase tracking-widest text-[#0f1f3d] ${isRTL ? 'font-sans' : ''}`}>
            {t.titleLabel} — {monthLabel}
          </h2>
        </div>
        <div className="text-[10px] text-gray-400">
          {t.orgTotalLabel}: <span className="font-bold text-[#0f1f3d]">{formatMinutes(totalOrgMinutes)}</span>
        </div>
      </div>

      {/* Employee Breakdown Segment List */}
      <div className="divide-y divide-[#f0ede8]">
        {summaries.map(emp => {
          const pct = Math.min(100, Math.round((emp.totalMinutes / TARGET_MINUTES) * 100));
          return (
            <div key={emp.employeeName} className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 sm:py-3 hover:bg-[#faf9f7] transition-colors">
              
              {/* Profile Block */}
              <div className="w-44 flex-shrink-0">
                <p className="text-[12px] font-semibold text-[#0f1f3d]">{emp.employeeName}</p>
                <p className="text-[10px] text-gray-400">{emp.role}</p>
              </div>
              
              {/* Progress Bar Gauge Segment */}
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#b89a5a]">{formatMinutes(emp.totalMinutes)}</span>
                  <span className="text-[9px] text-gray-400">{pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#f0ede8] overflow-hidden">
                  <div 
                    className="h-full bg-[#b89a5a] transition-all duration-500 ease-out rounded-full" 
                    style={{ width: `${pct}%` }} 
                  />
                </div>
              </div>
              
              {/* Counters Badges Row */}
              <div className="flex gap-3 text-[9px] font-bold uppercase">
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                  {emp.daysPresent}{isRTL ? ` ${t.presentSuffix}` : t.presentSuffix}
                </span>
                <span className="text-rose-500 bg-rose-50 px-2 py-0.5 rounded-sm">
                  {emp.daysOnLeave}{isRTL ? ` ${t.leaveSuffix}` : t.leaveSuffix}
                </span>
                <span className="text-gray-400 bg-gray-50 px-2 py-0.5 rounded-sm">
                  {emp.daysAbsent}{isRTL ? ` ${t.absentSuffix}` : t.absentSuffix}
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default MonthlyHoursPanel;