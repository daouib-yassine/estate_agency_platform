"use client";
import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Home, Building2, Users, CalendarCheck,
  Bell, Settings, LogOut, Search, TrendingUp, TrendingDown,
  Eye, Clock, CheckCircle2, XCircle, AlertCircle, Plus,
  ChevronDown, Filter, MoreHorizontal, Phone, Mail,
  MapPin, DollarSign, ArrowRight, Star, Activity,
  UserCheck, UserX, Calendar, BarChart2, PieChart,
  Layers, ChevronRight, Menu, X, RefreshCw
} from 'lucide-react';

/* ─────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────── */
type AttendanceStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no-show';
type VisitType = 'sale' | 'rent';

interface Visit {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  property: string;
  propertyLoc: string;
  agent: string;
  agentImg: string;
  date: string;
  time: string;
  type: VisitType;
  status: AttendanceStatus;
  notes: string;
  price: string;
}

const initialVisits: Visit[] = [
  { id: 'V001', clientName: 'James Thornton', clientPhone: '+1 310 555-0122', clientEmail: 'james.t@email.com', property: 'Elysian Heights Villa', propertyLoc: 'Beverly Hills, CA', agent: 'Sophia Laurent', agentImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&q=80', date: '2026-05-13', time: '10:00 AM', type: 'sale', status: 'confirmed', notes: 'Interested in 5-bed. Budget $2.8M.', price: '$2,450,000' },
  { id: 'V002', clientName: 'Nadia Bellamy', clientPhone: '+1 310 555-0198', clientEmail: 'nadia.b@email.com', property: 'Meridian Sky Apt #14B', propertyLoc: 'Manhattan, NY', agent: 'Marcus Webb', agentImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80', date: '2026-05-13', time: '2:00 PM', type: 'rent', status: 'pending', notes: 'Looking for 12-month lease. Remote worker.', price: '$8,500/mo' },
  { id: 'V003', clientName: 'Carlos Rivera', clientPhone: '+1 310 555-0177', clientEmail: 'carlos.r@email.com', property: 'Pinnacle Tower — Ofc 8', propertyLoc: 'Downtown Miami, FL', agent: 'Sophia Laurent', agentImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&q=80', date: '2026-05-12', time: '11:30 AM', type: 'sale', status: 'completed', notes: 'Deal agreed. Paperwork in progress.', price: '$4,200,000' },
  { id: 'V004', clientName: 'Amara Okafor', clientPhone: '+1 213 555-0144', clientEmail: 'amara.o@email.com', property: 'Azure Shores Villa 3', propertyLoc: 'Malibu, CA', agent: 'Jonathan Altis', agentImg: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&q=80', date: '2026-05-14', time: '9:00 AM', type: 'sale', status: 'confirmed', notes: 'High-net-worth client. Pre-approved $6M.', price: '$4,800,000' },
  { id: 'V005', clientName: 'Felix Hoffman', clientPhone: '+1 213 555-0163', clientEmail: 'felix.h@email.com', property: 'The Elm Quarter #32A', propertyLoc: 'Santa Monica, CA', agent: 'Marcus Webb', agentImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80', date: '2026-05-11', time: '3:30 PM', type: 'rent', status: 'no-show', notes: 'Did not attend. Follow-up needed.', price: '$3,200/mo' },
  { id: 'V006', clientName: 'Priya Nair', clientPhone: '+1 310 555-0199', clientEmail: 'priya.n@email.com', property: 'Verdant Heights Villa 2', propertyLoc: 'Bel Air, CA', agent: 'Sophia Laurent', agentImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&q=80', date: '2026-05-15', time: '1:00 PM', type: 'sale', status: 'pending', notes: 'Referred by existing client. Motivated buyer.', price: '$6,200,000' },
  { id: 'V007', clientName: 'Oliver Stern', clientPhone: '+1 213 555-0181', clientEmail: 'oliver.s@email.com', property: 'Solaris Gardens TH-07', propertyLoc: 'Pasadena, CA', agent: 'Jonathan Altis', agentImg: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&q=80', date: '2026-05-12', time: '4:00 PM', type: 'sale', status: 'cancelled', notes: 'Client postponed due to travel.', price: '$1,150,000' },
  { id: 'V008', clientName: 'Hana Yoshida', clientPhone: '+1 310 555-0155', clientEmail: 'hana.y@email.com', property: 'Meridian Residences #8F', propertyLoc: 'Downtown LA, CA', agent: 'Isabelle Fontaine', agentImg: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&q=80', date: '2026-05-13', time: '11:00 AM', type: 'sale', status: 'confirmed', notes: 'Off-plan interest. Wants floor 8+.', price: '$680,000' },
];

const statusConfig: Record<AttendanceStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  confirmed:  { label: 'Confirmed',  color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200',  icon: CheckCircle2 },
  pending:    { label: 'Pending',    color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200',    icon: Clock },
  completed:  { label: 'Completed',  color: 'text-blue-700',    bg: 'bg-blue-50 border-blue-200',    icon: Star },
  cancelled:  { label: 'Cancelled',  color: 'text-rose-700',    bg: 'bg-rose-50 border-rose-200',    icon: XCircle },
  'no-show':  { label: 'No-Show',    color: 'text-gray-500',    bg: 'bg-gray-50 border-gray-200',    icon: AlertCircle },
};

const agents = ['All Agents', 'Sophia Laurent', 'Marcus Webb', 'Jonathan Altis', 'Isabelle Fontaine'];
const statuses: (AttendanceStatus | 'all')[] = ['all', 'confirmed', 'pending', 'completed', 'cancelled', 'no-show'];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
const today = new Date().toISOString().split('T')[0];

/* ─────────────────────────────────────────────
   SIDEBAR NAV
───────────────────────────────────────────── */
const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',   id: 'dashboard' },
  { icon: Home,            label: 'Properties',  id: 'properties' },
  { icon: Building2,       label: 'Developments',id: 'developments' },
  { icon: CalendarCheck,   label: 'Attendance',  id: 'attendance' },
  { icon: Users,           label: 'Clients',     id: 'clients' },
  { icon: BarChart2,       label: 'Reports',     id: 'reports' },
  { icon: Settings,        label: 'Settings',    id: 'settings' },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [visits, setVisits] = useState<Visit[]>(initialVisits);
  const [notification, setNotification] = useState<string | null>(null);

  // KPI calculations
  const todayVisits = visits.filter(v => v.date === today);
  const confirmedCount = visits.filter(v => v.status === 'confirmed').length;
  const pendingCount = visits.filter(v => v.status === 'pending').length;
  const completedCount = visits.filter(v => v.status === 'completed').length;
  const noShowCount = visits.filter(v => v.status === 'no-show').length;
  const conversionRate = Math.round((completedCount / (completedCount + noShowCount + 1)) * 100);

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const updateStatus = (id: string, status: AttendanceStatus) => {
    setVisits(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    showNotif(`Status updated to ${statusConfig[status].label}`);
  };

  return (
    <div className="flex h-screen bg-[#f0ede8] font-sans text-[#0f1f3d] overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside className={`relative flex flex-col bg-[#0f1f3d] transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-16'} flex-shrink-0 z-20`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-[#b89a5a]">
            <span className="font-serif text-sm font-bold text-white">A</span>
          </div>
          {sidebarOpen && (
            <span className="font-serif text-lg text-white tracking-wider">Altis<span className="text-[#d4b87a]">.</span></span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, id }) => {
            const isActive = id === 'dashboard';
            return (
              <button
                key={id}
                onClick={() => { 
                  if (id === 'dashboard') window.location.href = '/admin/dashboard';
                  else if (id === 'attendance') window.location.href = '/admin/attendance_dashboard';
                  else if (id === 'properties') window.location.href = '/admin/properties_management';
                  else if (id === 'developments') window.location.href = '/admin/development_dashboard';
                  else if (id === 'clients') window.location.href = '/admin/client_dashboard';
                  else if (id === 'reports') window.location.href = '/admin/reports_dashboard';
                  else if (id === 'settings') window.location.href = '/admin/settings_dashboard';
                 }}
                className={`flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-all ${isActive ? 'bg-[#b89a5a] text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}`}
              >
                <Icon size={16} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-[12px] font-medium tracking-wide">{label}</span>}
                {sidebarOpen && isActive && <ChevronRight size={12} className="ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-3 space-y-1">
          <div className={`flex items-center gap-3 px-3 py-2.5 ${sidebarOpen ? '' : 'justify-center'}`}>
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&q=80" alt="Admin" className="h-7 w-7 flex-shrink-0 rounded-full object-cover object-top" />
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

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(s => !s)}
          className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-[#b89a5a] text-white shadow-lg"
        >
          {sidebarOpen ? <ChevronDown size={10} className="-rotate-90" /> : <ChevronDown size={10} className="rotate-90" />}
        </button>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-[#e2ddd6] bg-white px-6 py-3.5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients, properties..."
                className="rounded-sm border border-gray-200 bg-[#f7f6f3] pl-9 pr-4 py-2 text-[12px] outline-none focus:border-[#b89a5a] w-64 transition-colors placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <div className="relative">
              <button className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#f7f6f3] border border-gray-200 text-gray-500 hover:border-[#b89a5a] transition-colors">
                <Bell size={14} />
                {pendingCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#b89a5a] text-[8px] font-bold text-white">{pendingCount}</span>
                )}
              </button>
            </div>
            <button
              onClick={() => window.location.href = '/admin/attendance'}
              className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors"
            >
              <Plus size={12} /> New Visit
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <DashboardView visits={visits} updateStatus={updateStatus} />
        </main>
      </div>


      {/* ── NOTIFICATION TOAST ── */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-sm bg-[#0f1f3d] px-5 py-3.5 shadow-2xl border-l-4 border-[#b89a5a]">
          <CheckCircle2 size={15} className="text-[#d4b87a]" />
          <span className="text-[12px] font-medium text-white">{notification}</span>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD VIEW
───────────────────────────────────────────── */
function DashboardView({ visits, updateStatus }: {
  visits: Visit[];
  updateStatus: (id: string, s: AttendanceStatus) => void;
}) {
  const confirmedCount = visits.filter(v => v.status === 'confirmed').length;
  const pendingCount   = visits.filter(v => v.status === 'pending').length;
  const completedCount = visits.filter(v => v.status === 'completed').length;
  const noShowCount    = visits.filter(v => v.status === 'no-show').length;
  const todayVisits    = visits.filter(v => v.date === today);
  const upcomingVisits = visits.filter(v => v.date > today && (v.status === 'confirmed' || v.status === 'pending'));

  const kpis = [
    { label: "Today's Visits",   val: todayVisits.length,   icon: Calendar,    trend: '+2 vs yesterday', up: true,  color: 'bg-[#0f1f3d]' },
    { label: 'Confirmed',        val: confirmedCount,        icon: UserCheck,   trend: 'Active visits',    up: true,  color: 'bg-emerald-700' },
    { label: 'Pending Approval', val: pendingCount,          icon: Clock,       trend: 'Needs action',     up: false, color: 'bg-amber-600' },
    { label: 'Completed Deals',  val: completedCount,        icon: Star,        trend: 'This month',       up: true,  color: 'bg-[#b89a5a]' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-normal">Good morning, Jonathan</h1>
          <p className="mt-0.5 text-[12px] text-gray-500">Here's what's happening today across your portfolio.</p>
        </div>
        <button onClick={() => window.location.href = '/admin/attendance'} className="flex items-center gap-2 rounded-sm border border-[#0f1f3d]/20 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[#0f1f3d] hover:bg-[#0f1f3d] hover:text-white transition-all">
          Manage Attendance <ArrowRight size={12} />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map(({ label, val, icon: Icon, trend, up, color }) => (
          <div key={label} className="rounded-sm bg-white border border-[#e2ddd6] p-5 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${color}`} />
            <div className="flex items-start justify-between mb-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
              <div className={`flex h-8 w-8 items-center justify-center rounded-sm ${color} opacity-90`}>
                <Icon size={14} className="text-white" />
              </div>
            </div>
            <div className="font-serif text-4xl text-[#0f1f3d]">{val}</div>
            <div className={`mt-2 flex items-center gap-1 text-[10px] font-medium ${up ? 'text-emerald-600' : 'text-amber-600'}`}>
              {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">

        {/* Today's schedule */}
        <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2ddd6]">
            <h2 className="font-serif text-lg font-normal">Today's Schedule</h2>
            <span className="rounded-full bg-[#f0ede8] px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">{todayVisits.length} visits</span>
          </div>
          <div className="divide-y divide-[#f0ede8]">
            {todayVisits.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-center text-gray-400">
                <Calendar size={32} className="mb-3 text-gray-200" />
                <p className="text-sm">No visits scheduled for today</p>
              </div>
            ) : todayVisits.map(v => {
              const cfg = statusConfig[v.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={v.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#f7f6f3] transition-colors cursor-pointer group">
                  <div className="flex-shrink-0 text-center w-14">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#b89a5a]">{v.time.split(' ')[0]}</p>
                    <p className="text-[9px] text-gray-400">{v.time.split(' ')[1]}</p>
                  </div>
                  <div className="w-px h-10 bg-[#e2ddd6]" />
                  <img src={v.agentImg} alt={v.agent} className="h-9 w-9 flex-shrink-0 rounded-full object-cover object-top" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium truncate">{v.clientName}</p>
                    <p className="text-[11px] text-gray-400 truncate">{v.property}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
                    <StatusIcon size={9} />
                    {cfg.label}
                  </div>
                  {/* Quick actions on hover */}
                  {v.status === 'confirmed' && (
                    <div className="hidden group-hover:flex gap-1">
                      <button onClick={() => updateStatus(v.id, 'completed')} className="rounded-sm bg-emerald-50 border border-emerald-200 px-2 py-1 text-[9px] font-bold text-emerald-700 hover:bg-emerald-100">Done</button>
                      <button onClick={() => updateStatus(v.id, 'no-show')} className="rounded-sm bg-rose-50 border border-rose-200 px-2 py-1 text-[9px] font-bold text-rose-700 hover:bg-rose-100">No-Show</button>
                    </div>
                  )}
                  {v.status === 'pending' && (
                    <div className="hidden group-hover:flex gap-1">
                      <button onClick={() => updateStatus(v.id, 'confirmed')} className="rounded-sm bg-emerald-50 border border-emerald-200 px-2 py-1 text-[9px] font-bold text-emerald-700 hover:bg-emerald-100">Confirm</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Attendance breakdown */}
          <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-5">
            <h3 className="mb-4 font-serif text-base font-normal">Attendance Overview</h3>
            <div className="space-y-3">
              {[
                { label: 'Confirmed', count: visits.filter(v => v.status === 'confirmed').length, total: visits.length, color: 'bg-emerald-500' },
                { label: 'Completed', count: visits.filter(v => v.status === 'completed').length, total: visits.length, color: 'bg-[#b89a5a]' },
                { label: 'Pending',   count: visits.filter(v => v.status === 'pending').length,   total: visits.length, color: 'bg-amber-500' },
                { label: 'No-Show',   count: visits.filter(v => v.status === 'no-show').length,   total: visits.length, color: 'bg-rose-400' },
                { label: 'Cancelled', count: visits.filter(v => v.status === 'cancelled').length, total: visits.length, color: 'bg-gray-300' },
              ].map(({ label, count, total, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[11px] text-gray-500">{label}</span>
                    <span className="text-[11px] font-bold text-[#0f1f3d]">{count}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#f0ede8]">
                    <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${(count / total) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming visits */}
          <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e2ddd6]">
              <h3 className="font-serif text-base font-normal">Upcoming</h3>
              <button onClick={() => window.location.href = '/admin/attendance'} className="text-[10px] font-bold uppercase tracking-widest text-[#b89a5a] hover:text-[#0f1f3d] transition-colors">See All</button>
            </div>
            <div className="divide-y divide-[#f0ede8]">
              {upcomingVisits.slice(0, 4).map(v => (
                <div key={v.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="h-8 w-8 rounded-full bg-[#f0ede8] flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-[#b89a5a]">{v.clientName[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium truncate">{v.clientName}</p>
                    <p className="text-[10px] text-gray-400">{fmt(v.date)} · {v.time}</p>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${statusConfig[v.status].color}`}>{statusConfig[v.status].label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2ddd6]">
          <h2 className="font-serif text-lg font-normal">All Visits</h2>
          <button onClick={() => window.location.href = '/admin/attendance'} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#b89a5a] hover:text-[#0f1f3d] transition-colors">
            Manage <ArrowRight size={10} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f0ede8] bg-[#faf9f7]">
                {['Client', 'Property', 'Agent', 'Date & Time', 'Type', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f7f5f2]">
              {visits.slice(0, 6).map(v => {
                const cfg = statusConfig[v.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr key={v.id} className="hover:bg-[#faf9f7] transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="text-[12px] font-medium">{v.clientName}</p>
                      <p className="text-[10px] text-gray-400">{v.clientPhone}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-[12px] truncate max-w-[160px]">{v.property}</p>
                      <p className="text-[10px] text-gray-400 flex items-center gap-1"><MapPin size={9} className="text-[#b89a5a]" />{v.propertyLoc}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <img src={v.agentImg} alt={v.agent} className="h-6 w-6 rounded-full object-cover object-top" />
                        <span className="text-[12px]">{v.agent.split(' ')[0]}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-[12px]">{fmt(v.date)}</p>
                      <p className="text-[10px] text-gray-400">{v.time}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${v.type === 'sale' ? 'bg-[#0f1f3d] text-white' : 'bg-[#b89a5a] text-white'}`}>
                        {v.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
                        <StatusIcon size={9} />{cfg.label}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1.5">
                        {v.status === 'pending' && <button onClick={() => updateStatus(v.id, 'confirmed')} className="rounded-sm bg-emerald-50 border border-emerald-200 px-2 py-1 text-[9px] font-bold text-emerald-700 hover:bg-emerald-100 whitespace-nowrap">Confirm</button>}
                        {v.status === 'confirmed' && <button onClick={() => updateStatus(v.id, 'completed')} className="rounded-sm bg-blue-50 border border-blue-200 px-2 py-1 text-[9px] font-bold text-blue-700 hover:bg-blue-100 whitespace-nowrap">Complete</button>}
                        {(v.status === 'confirmed' || v.status === 'pending') && <button onClick={() => updateStatus(v.id, 'cancelled')} className="rounded-sm bg-rose-50 border border-rose-200 px-2 py-1 text-[9px] font-bold text-rose-700 hover:bg-rose-100 whitespace-nowrap">Cancel</button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}