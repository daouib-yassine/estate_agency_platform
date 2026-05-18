import React from 'react';
import { TrendingUp, CheckCircle2, UserX, AlertCircle } from 'lucide-react';

const MONTHLY_TARGET_MINUTES = 160 * 60;

/**
 * Helper function to format total minutes into "Xh Ym" or "Xh"
 */
function formatMinutes(total) {
  if (!total || total === 0) return '0h';
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function MonthlyHoursPanel({ summaries, currentMonth = "2026-05" }) {
  // Gracefully generate the header month label safely
  const monthLabel = React.useMemo(() => {
    try {
      return new Date(currentMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch (e) {
      return 'Current Month';
    }
  }, [currentMonth]);

  const totalOrgMinutes = React.useMemo(() => {
    return summaries ? summaries.reduce((s, e) => s + (e.totalMinutes || 0), 0) : 0;
  }, [summaries]);

  return (
    <div className="rounded-sm border border-[#e2ddd6] bg-white shadow-sm overflow-hidden w-full">
      {/* Panel header */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-[#f0ede8] gap-2">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-[#b89a5a]" />
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#0f1f3d]">
            Monthly Hours — {monthLabel}
          </h2>
        </div>
        <div className="text-[10px] text-gray-400">
          Org total:&nbsp;
          <span className="font-bold text-[#0f1f3d]">{formatMinutes(totalOrgMinutes)}</span>
          &nbsp;·&nbsp;target 160h / employee
        </div>
      </div>

      {/* Employee rows */}
      <div className="divide-y divide-[#f0ede8]">
        {!summaries || summaries.length === 0 ? (
          <p className="py-8 text-center text-[12px] text-gray-400">No records this month.</p>
        ) : (
          summaries.map(emp => {
            const pct = Math.min(100, Math.round(((emp.totalMinutes || 0) / MONTHLY_TARGET_MINUTES) * 100));
            const overTarget = (emp.totalMinutes || 0) >= MONTHLY_TARGET_MINUTES;
            return (
              <div key={emp.employeeName} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 sm:py-3 hover:bg-[#faf9f7] transition-colors">
                
                {/* Profile Identity block */}
                <div className="flex items-center gap-3 min-w-[200px]">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0f1f3d] text-white text-[11px] font-bold">
                    {emp.employeeName ? emp.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2) : '??'}
                  </div>
                  <div className="truncate">
                    <p className="text-[12px] font-semibold text-[#0f1f3d] leading-tight">{emp.employeeName}</p>
                    <p className="text-[10px] text-gray-400 truncate">{emp.role}</p>
                  </div>
                </div>

                {/* Progress tracking bar */}
                <div className="flex-1 min-w-[120px] sm:min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold ${overTarget ? 'text-emerald-600' : 'text-[#b89a5a]'}`}>
                      {formatMinutes(emp.totalMinutes)}
                    </span>
                    <span className="text-[9px] text-gray-400">{pct}% of 160h</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#f0ede8] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${overTarget ? 'bg-emerald-500' : 'bg-[#b89a5a]'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Performance stats & tags alignment */}
                <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0">
                  <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1 text-emerald-600"><CheckCircle2 size={9} />{emp.daysPresent || 0}d</span>
                    <span className="flex items-center gap-1 text-rose-500"><UserX size={9} />{emp.daysOnLeave || 0}d</span>
                    <span className="flex items-center gap-1 text-gray-400"><AlertCircle size={9} />{emp.daysAbsent || 0}d</span>
                  </div>

                  <span className="rounded-full border border-[#0f1f3d]/10 bg-[#0f1f3d]/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#0f1f3d]">
                    {emp.department}
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