import React from 'react';
import { TrendingUp, CheckCircle2, UserX, AlertCircle } from 'lucide-react';
import { formatMinutes } from '@/constants/attendance';

const TARGET_MINUTES = 160 * 60;

const MonthlyHoursPanel = ({ summaries, currentMonth }) => {
  const monthLabel = new Date(currentMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const totalOrgMinutes = summaries.reduce((s, e) => s + e.totalMinutes, 0);

  return (
    <div className="rounded-sm border border-[#e2ddd6] bg-white shadow-sm overflow-hidden mb-6">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0ede8]">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-[#b89a5a]" />
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#0f1f3d]">Monthly Hours — {monthLabel}</h2>
        </div>
        <div className="text-[10px] text-gray-400">
          Org total: <span className="font-bold text-[#0f1f3d]">{formatMinutes(totalOrgMinutes)}</span>
        </div>
      </div>
      <div className="divide-y divide-[#f0ede8]">
        {summaries.map(emp => {
          const pct = Math.min(100, Math.round((emp.totalMinutes / TARGET_MINUTES) * 100));
          return (
            <div key={emp.employeeName} className="flex items-center gap-4 px-5 py-3 hover:bg-[#faf9f7] transition-colors">
              <div className="w-44 flex-shrink-0">
                <p className="text-[12px] font-semibold text-[#0f1f3d]">{emp.employeeName}</p>
                <p className="text-[10px] text-gray-400">{emp.role}</p>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#b89a5a]">{formatMinutes(emp.totalMinutes)}</span>
                  <span className="text-[9px] text-gray-400">{pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#f0ede8]">
                  <div className="h-full bg-[#b89a5a] transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="flex gap-3 text-[9px] font-bold uppercase">
                <span className="text-emerald-600">{emp.daysPresent}P</span>
                <span className="text-rose-500">{emp.daysOnLeave}L</span>
                <span className="text-gray-400">{emp.daysAbsent}A</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyHoursPanel;