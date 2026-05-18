"use client";

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Calendar, 
  Clock, 
  Download, 
  LogOut, 
  ChevronRight, 
  LayoutDashboard, 
  Home, 
  Building2, 
  BarChart2, 
  Settings, 
  Bell, 
  ChevronDown,
  X,
  CheckCircle2
} from 'lucide-react';

// ── EXTRACTED HOOKS & COMPONENTS ──
import { useMonthlyHours } from '@/hooks/use-monthly-hours';
import { MonthlyHoursPanel } from '@/components/attendance/monthly-hours-panel';
import { initialAttendances, departments, statusConfig, currentMonth, today, navItems } from '@/constants/attendance';

export default function AttendanceDashboard() {
  // ── STATE ──
  const [sidebarOpen, setSidebarOpen]       = useState(true);
  const [attendances, setAttendances]       = useState(initialAttendances);
  const [filterStatus, setFilterStatus]     = useState('all');
  const [filterDept, setFilterDept]         = useState('All Departments');
  const [filterDate, setFilterDate]         = useState('');
  const [searchQuery, setSearchQuery]       = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddModal, setShowAddModal]     = useState(false);
  const [notification, setNotification]    = useState(null);

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

  // ── ACTION STATE HANDLERS ──
  const updateStatus = (id, status) => {
    setAttendances(prev => prev.map(a => (a.id === id ? { ...a, status } : a)));
    setSelectedRecord(prev => (prev?.id === id ? { ...prev, status } : prev));
    showNotif(`Status updated to ${statusConfig[status]?.label || status}`);
  };

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex h-screen bg-[#f0ede8] font-sans text-[#0f1f3d] overflow-hidden">
      
      {/* ── NOTIFICATION TOAST OVERLAY ── */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-4 py-3 text-[11px] text-white shadow-xl border-l-2 border-[#b89a5a] animate-in slide-in-from-bottom-2">
          <CheckCircle2 size={14} className="text-[#b89a5a]" />
          <span>{notification}</span>
        </div>
      )}

      {/* ── SIDEBAR NAV ── */}
      <aside className={`relative flex flex-col bg-[#0f1f3d] transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-16'} flex-shrink-0 z-20`}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-[#b89a5a]">
            <span className="font-serif text-sm font-bold text-white">A</span>
          </div>
          {sidebarOpen && <span className="font-serif text-lg text-white tracking-wider">Altis<span className="text-[#d4b87a]">.</span></span>}
        </div>
        
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, id }) => {
            const isActive = id === 'attendance';
            return (
              <button key={id}
                className={`flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-all ${isActive ? 'bg-[#b89a5a] text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}`}
              >
                <Icon size={16} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-[12px] font-medium tracking-wide">{label}</span>}
                {sidebarOpen && isActive && <ChevronRight size={12} className="ml-auto" />}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3 space-y-1">
          <div className={`flex items-center gap-3 px-3 py-2.5 ${sidebarOpen ? '' : 'justify-center'}`}>
            <div className="h-7 w-7 flex-shrink-0 rounded-full bg-[#b89a5a] flex items-center justify-center text-white text-[10px] font-bold uppercase">JA</div>
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-white">Jonathan Altis</p>
                <p className="text-[9px] text-white/40">Administrator</p>
              </div>
            )}
          </div>
          <button className={`flex w-full items-center gap-3 rounded-sm px-3 py-2 text-white/40 hover:text-rose-400 transition-colors ${!sidebarOpen ? 'justify-center' : ''}`}>
            <LogOut size={14} />
            {sidebarOpen && <span className="text-[11px]">Sign Out</span>}
          </button>
        </div>
        
        <button onClick={() => setSidebarOpen(s => !s)}
          className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-[#b89a5a] text-white shadow-lg z-30">
          {sidebarOpen ? <ChevronDown size={10} className="-rotate-90" /> : <ChevronDown size={10} className="rotate-90" />}
        </button>
      </aside>

      {/* {MAIN CONTENT} */}
      <div className="flex h-screen bg-[#f0ede8] font-sans text-[#0f1f3d] overflow-hidden">
      
      {/* ── 1. SIDEBAR NAV ELEMENT ── */}
      <aside className={`relative flex flex-col bg-[#0f1f3d] transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-16'} flex-shrink-0 z-20`}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-[#b89a5a]">
            <span className="font-serif text-sm font-bold text-white">A</span>
          </div>
          {sidebarOpen && <span className="font-serif text-lg text-white tracking-wider">Altis<span className="text-[#d4b87a]">.</span></span>}
        </div>
        
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, id }) => {
            const isActive = id === 'attendance';
            return (
              <button key={id}
                className={`flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-all ${isActive ? 'bg-[#b89a5a] text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}`}
              >
                <Icon size={16} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-[12px] font-medium tracking-wide">{label}</span>}
                {sidebarOpen && isActive && <ChevronRight size={12} className="ml-auto" />}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3 space-y-1">
          <div className={`flex items-center gap-3 px-3 py-2.5 ${sidebarOpen ? '' : 'justify-center'}`}>
            <div className="h-7 w-7 flex-shrink-0 rounded-full bg-[#b89a5a] flex items-center justify-center text-white text-[10px] font-bold uppercase">JA</div>
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-white">Jonathan Altis</p>
                <p className="text-[9px] text-white/40">Administrator</p>
              </div>
            )}
          </div>
          <button className={`flex w-full items-center gap-3 rounded-sm px-3 py-2 text-white/40 hover:text-rose-400 transition-colors ${!sidebarOpen ? 'justify-center' : ''}`}>
            <LogOut size={14} />
            {sidebarOpen && <span className="text-[11px]">Sign Out</span>}
          </button>
        </div>
        
        <button onClick={() => setSidebarOpen(s => !s)}
          className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-[#b89a5a] text-white shadow-lg z-30">
          {sidebarOpen ? <ChevronDown size={10} className="-rotate-90" /> : <ChevronDown size={10} className="rotate-90" />}
        </button>
      </aside>

      {/* ── 2. MAIN WORKSPACE CONTAINER (PLACE NEW CODE DIRECTLY HERE) ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* Dynamic Top Header */}
        <header className="flex items-center justify-between border-b border-[#e2ddd6] bg-white px-6 py-3.5 flex-shrink-0">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search employees, departments..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)}
              className="rounded-sm border border-gray-200 bg-[#f7f6f3] pl-9 pr-4 py-2 text-[12px] outline-none focus:border-[#b89a5a] w-64 transition-colors placeholder:text-gray-400" 
            />
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f7f6f3] border border-gray-200 text-gray-500 hover:border-[#b89a5a] transition-colors">
              <Bell size={14} />
            </button>
            <button onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors">
              <Plus size={12} /> Log Attendance
            </button>
          </div>
        </header>

              {/* Core Sub-View Loader */}
              <main className="flex-1 overflow-y-auto">
                <AttendanceView
                  attendances={attendances}
                  filtered={filtered}
                  monthlySummaries={monthlySummaries}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  filterDept={filterDept}
                  setFilterDept={setFilterDept}
                  filterDate={filterDate}
                  setFilterDate={setFilterDate}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  setSelectedRecord={setSelectedRecord}
                  updateStatus={updateStatus}
                  setShowAddModal={setShowAddModal}
                  departments={departments}
                />
              </main>
            </div>

            {/* ── 3. OVERLAYS & MODAL DRAWERS LAYER ── */}
            {selectedRecord && (
              <AttendanceDetailDrawer 
                record={selectedRecord} 
                onClose={() => setSelectedRecord(null)} 
                updateStatus={updateStatus} 
              />
            )}

            {showAddModal && (
              <AddAttendanceModal
                onClose={() => setShowAddModal(false)}
                onAdd={record => {
                  setAttendances(prev => [record, ...prev]);
                  setShowAddModal(false);
                  showNotif('Attendance record added successfully!');
                }}
              />
            )}

            {notification && (
              <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-sm bg-[#0f1f3d] px-5 py-3.5 shadow-2xl border-l-4 border-[#b89a5a]">
                <CheckCircle2 size={15} className="text-[#d4b87a]" />
                <span className="text-[12px] font-medium text-white">{notification}</span>
              </div>
            )}

          </div>
        

      {/* ── WORKSPACE FRAME ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#e2ddd6] bg-white px-6 py-3.5 flex-shrink-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Monday, May 18, 2026</span>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors">
              <Plus size={12} /> Log Attendance
            </button>
          </div>
        </header>

        {/* Dashboard Content Workspace */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h1 className="font-serif text-2xl font-normal">Employee Attendance</h1>
            <p className="text-[12px] text-gray-500 mt-0.5">Track and manage daily employee presence and absences.</p>
          </div>

          {/* ── MONTHLY HOURS INTEGRATION ── */}
          <MonthlyHoursPanel summaries={monthlySummaries} currentMonth={currentMonth} />

          {/* ── FILTER UTILITIES BAR ── */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-[#e2ddd6] bg-white p-4 shadow-xs">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search agent name, department..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-sm border border-[#e2ddd6] pl-9 pr-3 py-1.5 text-[11px] outline-none focus:border-[#b89a5a]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
                className="rounded-sm border border-[#e2ddd6] bg-white px-3 py-1.5 text-[11px] text-gray-600 outline-none">
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>

              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                className="rounded-sm border border-[#e2ddd6] bg-white px-3 py-1.5 text-[11px] text-gray-600 outline-none">
                <option value="all">All Statuses</option>
                {Object.entries(statusConfig).map(([key, value]) => (
                  <option key={key} value={key}>{value.label}</option>
                ))}
              </select>

              <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
                className="rounded-sm border border-[#e2ddd6] bg-white px-3 py-1 text-[11px] text-gray-600 outline-none" />
            </div>
          </div>

          {/* ── MINIMALIST LUXURY CARD GRID ── */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map(record => {
              const cfg = statusConfig[record.status] || { label: record.status, color: 'text-gray-500', bg: 'bg-gray-50' };
              return (
                <div key={record.id} onClick={() => setSelectedRecord(record)} className="group cursor-pointer rounded-sm border border-[#e2ddd6] bg-white shadow-xs overflow-hidden hover:border-[#b89a5a] transition-colors">
                  <div className="h-[3px] bg-[#b89a5a]" />
                  <div className="p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[10px] text-gray-400 font-mono mb-1">{record.date === today ? "Today" : record.date}</div>
                        <h3 className="text-[13px] font-bold text-[#0f1f3d] group-hover:text-[#b89a5a] transition-colors">{record.employeeName}</h3>
                        <p className="text-[11px] text-gray-400">{record.role}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold ${cfg.color} ${cfg.bg}`}>
                        {cfg.label}
                      </span>
                    </div>

                    <div className="border-t border-[#f0ede8] pt-3 space-y-2 text-[11px]">
                      <div className="flex justify-between"><span className="text-gray-400">Shift</span><span className="font-mono text-gray-700">{record.shift}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Check-in</span><span className="font-mono text-[#0f1f3d]">{record.checkInTime}</span></div>
                      {record.checkOutTime && <div className="flex justify-between"><span className="text-gray-400">Check-out</span><span className="font-mono text-gray-700">{record.checkOutTime}</span></div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}