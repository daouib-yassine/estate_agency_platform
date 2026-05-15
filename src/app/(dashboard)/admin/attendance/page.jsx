"use client";
import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, Bell } from 'lucide-react';

// Component Imports
import MonthlyHoursPanel from '@/components/admin/MonthlyHoursPanel';
import AttendanceDetailDrawer from '@/components/admin/AttendanceDetailDrawer';

// Constants & Helpers
import { STATUS_CONFIG, DEPARTMENTS, parseWorkHoursToMinutes } from '@/constants/attendance';

// --- MOCK DATA (Move to a separate file later if preferred) ---
const initialAttendances = [
  { 
    id:'ATT-001', 
    employeeName:'James Thornton', 
    role:'Senior Sales Agent', 
    department:'Sales', 
    date: '2024-05-15', 
    checkInTime:'8:55 AM', 
    shift:'9:00 AM – 6:00 PM', 
    status:'present', 
    workHours:'8h 30m',
    employeePhone: '+1 (555) 010-8899',
    employeeEmail: 'james.t@company.com',
    notes: 'Arrived early for client meeting.'
  },
  { 
    id:'ATT-002', 
    employeeName:'Nadia Bellamy', 
    role:'Marketing Manager', 
    department:'Marketing', 
    date: '2024-05-15', 
    checkInTime:'9:42 AM', 
    shift:'9:00 AM – 6:00 PM', 
    status:'late', 
    workHours:'7h 15m',
    employeePhone: '+1 (555) 010-4422',
    employeeEmail: 'n.bellamy@company.com',
    notes: 'Heavy traffic on I-95.'
  },
  { 
    id:'ATT-003', 
    employeeName:'Carlos Rivera', 
    role:'Operations Lead', 
    department:'Operations', 
    date: '2024-05-15', 
    checkInTime:'8:58 AM', 
    shift:'9:00 AM – 5:30 PM', 
    status:'checked-out', 
    workHours:'8h 32m',
    employeePhone: '+1 (555) 010-3311',
    employeeEmail: 'c.rivera@company.com'
  },
];

export default function AttendanceDashboard() {
  // 1. State Management
  const [attendances, setAttendances] = useState(initialAttendances);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All Departments');
  const [filterStatus, setFilterStatus] = useState('all');

  const currentMonth = new Date().toISOString().slice(0, 7);

  // 2. Update Status Logic (Passed to Drawer)
  const handleUpdateStatus = (id, newStatus) => {
    setAttendances(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
    
    // Update the selected record locally so the drawer updates instantly
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord(prev => ({ ...prev, status: newStatus }));
    }
  };

  // 3. Filtered Data for the Grid
  const filtered = useMemo(() => {
    return attendances.filter(a => {
      const matchStatus = filterStatus === 'all' || a.status === filterStatus;
      const matchDept = filterDept === 'All Departments' || a.department === filterDept;
      const matchSearch = a.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchDept && matchSearch;
    });
  }, [attendances, filterStatus, filterDept, searchQuery]);

  // 4. Monthly Summary Calculation
  const monthlySummaries = useMemo(() => {
    const map = new Map();
    attendances.filter(a => a.date.startsWith(currentMonth)).forEach(a => {
      if (!map.has(a.employeeName)) {
        map.set(a.employeeName, { 
          employeeName: a.employeeName, role: a.role, department: a.department,
          totalMinutes: 0, daysPresent: 0, daysAbsent: 0, daysOnLeave: 0 
        });
      }
      const rec = map.get(a.employeeName);
      rec.totalMinutes += parseWorkHoursToMinutes(a.workHours);
      if (['present', 'late', 'checked-out'].includes(a.status)) rec.daysPresent++;
      else if (a.status === 'absent') rec.daysAbsent++;
      else if (a.status === 'on-leave') rec.daysOnLeave++;
    });
    return Array.from(map.values()).sort((a, b) => b.totalMinutes - a.totalMinutes);
  }, [attendances, currentMonth]);

  return (
    <div className="flex flex-col h-full bg-[#f8f7f4]">
      {/* Search & Action Header */}
      <header className="flex items-center justify-between border-b border-[#e2ddd6] bg-white px-8 py-4 flex-shrink-0 z-10">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search employees..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-sm border border-gray-100 bg-[#f7f6f3] pl-9 pr-4 py-2.5 text-[12px] outline-none focus:ring-1 ring-[#b89a5a] w-80 text-[#0f1f3d]" 
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f6f3] border border-gray-200 text-gray-500 hover:text-[#b89a5a] transition-colors">
            <Bell size={16} />
          </button>
          <button className="bg-[#0f1f3d] text-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 rounded-sm hover:bg-[#1a2e52] transition-all">
            <Plus size={14}/> Log Attendance
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-serif text-3xl text-[#0f1f3d]">Attendance Control</h1>
            <p className="text-sm text-gray-500 mt-1">Review daily presence and cumulative monthly hours.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white border border-[#e2ddd6] px-4 py-2 rounded-sm shadow-sm">
            <Filter size={14} className="text-gray-400" />
            <select 
              className="text-[11px] font-bold uppercase border-none outline-none bg-transparent cursor-pointer text-[#0f1f3d]"
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Top Summary Section */}
        <MonthlyHoursPanel summaries={monthlySummaries} currentMonth={currentMonth} />

        {/* Daily Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map(record => (
              <div key={record.id} onClick={() => setSelectedRecord(record)} className="cursor-pointer">
                <AttendanceCard record={record} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white border border-[#e2ddd6] border-dashed rounded-sm text-gray-400">
              No records found for the current selection.
            </div>
          )}
        </div>
      </main>

      {/* Floating Detail Drawer */}
      <AttendanceDetailDrawer 
        record={selectedRecord} 
        onClose={() => setSelectedRecord(null)}
        updateStatus={handleUpdateStatus}
      />
    </div>
  );
}

// Internal Sub-component for individual cards
function AttendanceCard({ record }) {
  const cfg = STATUS_CONFIG[record.status] || STATUS_CONFIG.absent;
  const StatusIcon = cfg.icon;

  return (
    <div className="bg-white border border-[#e2ddd6] rounded-sm p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-[15px] font-bold text-[#0f1f3d] group-hover:text-[#b89a5a] transition-colors">{record.employeeName}</h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-0.5">{record.role}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase flex items-center gap-2 border ${cfg.bg} ${cfg.color}`}>
          <StatusIcon size={10} /> {cfg.label}
        </div>
      </div>
      
      <div className="bg-[#faf9f7] p-4 rounded-sm space-y-3 border border-[#f0ede8]">
        <div className="flex justify-between text-[12px]">
          <span className="text-gray-400">Shift</span>
          <span className="text-[#0f1f3d] font-medium">{record.shift}</span>
        </div>
        <div className="flex justify-between text-[12px]">
          <span className="text-gray-400">Checked-in</span>
          <span className="text-[#0f1f3d] font-medium">{record.checkInTime}</span>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center text-[10px] uppercase font-bold tracking-tighter text-gray-400">
        <span>{record.department}</span>
        <span className="text-[#b89a5a]">View Details →</span>
      </div>
    </div>
  );
}