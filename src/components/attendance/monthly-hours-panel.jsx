"use client";

import React from 'react';
import { TrendingUp, CheckCircle2, UserX, AlertCircle } from 'lucide-react';

const MONTHLY_TARGET_MINUTES = 160 * 60;

// ── MULTI-LINGUAL UI DICTIONARY ──
const panelLocales = {
  fr: {
    dir: 'ltr',
    title: 'Heures Mensuelles',
    orgTotal: "Total de l'agence :",
    targetLabel: 'objectif 160h / employé',
    noRecords: 'Aucun enregistrement ce mois-ci.',
    ofTarget: 'sur 160h',
    daysSuffix: 'j',
    depts: { 'Sales': 'Ventes', 'Management': 'Direction', 'Marketing': 'Marketing' }
  },
  en: {
    dir: 'ltr',
    title: 'Monthly Hours',
    orgTotal: 'Org total:',
    targetLabel: 'target 160h / employee',
    noRecords: 'No records this month.',
    ofTarget: 'of 160h',
    daysSuffix: 'd',
    depts: { 'Sales': 'Sales', 'Management': 'Management', 'Marketing': 'Marketing' }
  },
  ar: {
    dir: 'rtl',
    title: 'الساعات الشهرية',
    orgTotal: 'إجمالي الوكالة:',
    targetLabel: 'الهدف 160 ساعة / موظف',
    noRecords: 'لا توجد سجلات لهذا الشهر.',
    ofTarget: 'من 160 ساعة',
    daysSuffix: 'يوم',
    depts: { 'Sales': 'المبيعات', 'Management': 'الإدارة', 'Marketing': 'التسويق' }
  }
};

/**
 * Helper function to format total minutes into "Xh Ym" or "Xh"
 */
function formatMinutes(total) {
  if (!total || total === 0) return '0h';
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function MonthlyHoursPanel({ summaries, currentMonth = "2026-05", currentLang = 'fr' }) {
  const t = panelLocales[currentLang] || panelLocales.fr;
  const isRTL = t.dir === 'rtl';

  // Localized Month-Year Date string formatter
  const monthLabel = React.useMemo(() => {
    try {
      const dateLocale = currentLang === 'ar' ? 'ar-MA' : currentLang === 'fr' ? 'fr-FR' : 'en-US';
      return new Date(currentMonth + '-01').toLocaleDateString(dateLocale, { month: 'long', year: 'numeric' });
    } catch (e) {
      return currentMonth;
    }
  }, [currentMonth, currentLang]);

  const totalOrgMinutes = React.useMemo(() => {
    return summaries ? summaries.reduce((s, e) => s + (e.totalMinutes || 0), 0) : 0;
  }, [summaries]);

  return (
    <div dir={t.dir} className="rounded-sm border border-[#e2ddd6] bg-white shadow-sm overflow-hidden w-full transition-all duration-300">
      
      {/* Panel Header Banner */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-[#f0ede8] gap-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-[#b89a5a]" />
          <h2 className={`text-[11px] font-bold uppercase tracking-widest text-[#0f1f3d] ${isRTL ? 'font-sans' : ''}`}>
            {t.title} — {monthLabel}
          </h2>
        </div>
        <div className="text-[10px] text-gray-400 flex items-center gap-1.5 wrap">
          <span>{t.orgTotal}</span>
          <span dir="ltr" className="font-bold text-[#0f1f3d]">{formatMinutes(totalOrgMinutes)}</span>
          <span className="text-gray-300">·</span>
          <span>{t.targetLabel}</span>
        </div>
      </div>

      {/* Employee Rows Block */}
      <div className="divide-y divide-[#f0ede8]">
        {!summaries || summaries.length === 0 ? (
          <p className="py-8 text-center text-[12px] text-gray-400">{t.noRecords}</p>
        ) : (
          summaries.map(emp => {
            const pct = Math.min(100, Math.round(((emp.totalMinutes || 0) / MONTHLY_TARGET_MINUTES) * 100));
            const overTarget = (emp.totalMinutes || 0) >= MONTHLY_TARGET_MINUTES;
            
            return (
              <div key={emp.employeeName} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 sm:py-3 hover:bg-[#faf9f7] transition-colors">
                
                {/* Profile Identity Block */}
                <div className="flex items-center gap-3 min-w-[200px]">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0f1f3d] text-white text-[11px] font-bold font-sans" dir="ltr">
                    {emp.employeeName ? emp.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??'}
                  </div>
                  <div className="truncate">
                    <p className="text-[12px] font-semibold text-[#0f1f3d] leading-tight">{emp.employeeName}</p>
                    <p className="text-[10px] text-gray-400 truncate mt-0.5">{emp.role}</p>
                  </div>
                </div>

                {/* Progress Tracking Metric Bar */}
                <div className="flex-1 min-w-[120px] sm:min-w-0">
                  <div className="flex items-center justify-between mb-1" dir="ltr">
                    <span className={`text-[10px] font-bold ${overTarget ? 'text-emerald-600' : 'text-[#b89a5a]'}`}>
                      {formatMinutes(emp.totalMinutes)}
                    </span>
                    <span className="text-[9px] text-gray-400">
                      {pct}% {t.ofTarget}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#f0ede8] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${overTarget ? 'bg-emerald-500' : 'bg-[#b89a5a]'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Performance Stats Counters & Badges */}
                <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0">
                  <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-wider" dir="ltr">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 size={9} />
                      <span>{emp.daysPresent || 0}{t.daysSuffix}</span>
                    </span>
                    <span className="flex items-center gap-1 text-amber-600">
                      <UserX size={9} />
                      <span>{emp.daysOnLeave || 0}{t.daysSuffix}</span>
                    </span>
                    <span className="flex items-center gap-1 text-rose-500">
                      <AlertCircle size={9} />
                      <span>{emp.daysAbsent || 0}{t.daysSuffix}</span>
                    </span>
                  </div>

                  <span className="rounded-full border border-[#0f1f3d]/10 bg-[#0f1f3d]/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#0f1f3d]">
                    {t.depts[emp.department] || emp.department}
                  </span>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}