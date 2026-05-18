import React from 'react';
import { Plus, Filter, Search, X, Calendar, CalendarCheck } from 'lucide-react';
import { MonthlyHoursPanel } from './monthly-hours-panel';
import { statusConfig, today } from '@/constants/attendance';

/**
 * Quick date formatter helper for cards
 */
function fmt(dateString) {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
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
}) {
  return (
    <div className="p-6 space-y-5">
      {/* Header Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-normal">Employee Attendance</h1>
          <p className="mt-0.5 text-[12px] text-gray-500">Track and manage daily employee presence and absences.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors"
        >
          <Plus size={13} /> Log Attendance
        </button>
      </div>

      {/* ── MONTHLY HOURS PANEL INJECTION ── */}
      <MonthlyHoursPanel summaries={monthlySummaries} />

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
              className={`rounded-sm border p-4 text-left transition-all ${
                isSelected 
                  ? `${cfg.bg} ${cfg.color} shadow-md scale-[1.02]` 
                  : 'bg-white border-[#e2ddd6] hover:border-[#b89a5a]/40'
              }`}
            >
              <Icon size={16} className={isSelected ? cfg.color : 'text-gray-400'} />
              <div className="mt-2 font-serif text-2xl text-[#0f1f3d]">{count}</div>
              <div className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-gray-500">{cfg.label}</div>
            </button>
          );
        })}
      </div>

      {/* Granular Filtering Control Matrix */}
      <div className="flex flex-wrap items-center gap-3 rounded-sm bg-white border border-[#e2ddd6] px-5 py-3.5 shadow-sm">
        <Filter size={13} className="text-gray-400" />
        
        <div className="relative">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search employee or role..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)}
            className="rounded-sm border border-gray-200 bg-[#f7f6f3] pl-8 pr-4 py-1.5 text-[11px] outline-none focus:border-[#b89a5a] transition-colors w-52 placeholder:text-gray-400" 
          />
        </div>

        <select 
          value={filterDept} 
          onChange={e => setFilterDept(e.target.value)}
          className="rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-1.5 text-[11px] outline-none focus:border-[#b89a5a] text-gray-600 transition-colors"
        >
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
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
            <X size={10} /> Clear
          </button>
        )}
        
        <span className="ml-auto text-[10px] text-gray-400">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Agent Performance Card Workspace */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center text-gray-400">
          <CalendarCheck size={40} className="mb-3 text-gray-200" />
          <p className="text-sm">No attendance records match your filters</p>
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
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {isToday && <span className="rounded-full bg-[#b89a5a]/10 border border-[#b89a5a]/30 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#b89a5a]">Today</span>}
                        <span className="rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest bg-[#0f1f3d]/5 border-[#0f1f3d]/10 text-[#0f1f3d]">{record.department}</span>
                      </div>
                      <p className="font-medium text-[13px] text-[#0f1f3d]">{record.employeeName}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{record.role}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
                      <StatusIcon size={9} />{cfg.label}
                    </div>
                  </div>

                  <div className="mb-4 rounded-sm bg-[#f7f6f3] px-3 py-2.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Shift</span>
                      <span className="text-[11px] font-medium text-[#0f1f3d]">{record.shift}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Check-in</span>
                      <span className="text-[11px] font-medium text-[#0f1f3d]">{record.checkInTime}</span>
                    </div>
                    {record.checkOutTime && (
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Check-out</span>
                        <span className="text-[11px] font-medium text-[#0f1f3d]">{record.checkOutTime}</span>
                      </div>
                    )}
                    {record.workHours && record.workHours !== '–' && (
                      <div className="flex items-center justify-between border-t border-[#e2ddd6] pt-1 mt-1">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Hours Worked</span>
                        <span className="text-[11px] font-bold text-[#b89a5a]">{record.workHours}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center text-[11px] text-gray-500 gap-1.5">
                    <Calendar size={11} className="text-[#b89a5a]" />{fmt(record.date)}
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