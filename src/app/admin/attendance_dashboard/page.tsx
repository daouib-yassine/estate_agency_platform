"use client";
import React, { useState } from 'react';
import {
  CalendarCheck, CheckCircle2, XCircle, AlertCircle, Plus,
  ChevronDown, Filter, MoreHorizontal, Phone, Mail,
  MapPin, DollarSign, ArrowRight, Star, Activity,
  UserCheck, UserX, Calendar, BarChart2, PieChart,
  Layers, ChevronRight, Menu, X, RefreshCw, Search, Clock,
  LayoutDashboard, Home, Building2, Users, Bell, Settings, LogOut,
  TrendingUp, TrendingDown, Eye
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
export default function AttendanceDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [visits, setVisits] = useState<Visit[]>(initialVisits);
  const [filterStatus, setFilterStatus] = useState<AttendanceStatus | 'all'>('all');
  const [filterAgent, setFilterAgent] = useState('All Agents');
  const [filterDate, setFilterDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Filtered visits
  const filtered = visits.filter(v => {
    const matchStatus = filterStatus === 'all' || v.status === filterStatus;
    const matchAgent = filterAgent === 'All Agents' || v.agent === filterAgent;
    const matchDate = !filterDate || v.date === filterDate;
    const matchSearch = !searchQuery || v.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || v.property.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchAgent && matchDate && matchSearch;
  });

  const updateStatus = (id: string, status: AttendanceStatus) => {
    setVisits(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    setSelectedVisit(prev => prev?.id === id ? { ...prev, status } : prev);
    showNotif(`Status updated to ${statusConfig[status].label}`);
  };

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
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
            const isActive = id === 'attendance';
            return (
              <button
                key={id}
                onClick={() => { 
                  if (id === 'dashboard') window.location.href = '/admin/dashboard';
                  if (id === 'attendance') window.location.href = '/admin/attendance';
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
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
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
              </button>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors"
            >
              <Plus size={12} /> New Visit
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <AttendanceView
            visits={visits}
            filtered={filtered}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterAgent={filterAgent}
            setFilterAgent={setFilterAgent}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedVisit={selectedVisit}
            setSelectedVisit={setSelectedVisit}
            updateStatus={updateStatus}
            setShowAddModal={setShowAddModal}
            agents={agents}
          />
        </main>
      </div>

      {/* ── DETAIL DRAWER ── */}
      {selectedVisit && (
        <VisitDetailDrawer
          visit={selectedVisit}
          onClose={() => setSelectedVisit(null)}
          updateStatus={updateStatus}
        />
      )}

      {/* ── ADD VISIT MODAL ── */}
      {showAddModal && (
        <AddVisitModal onClose={() => setShowAddModal(false)} onAdd={(v) => { setVisits(prev => [v, ...prev]); setShowAddModal(false); showNotif('Visit scheduled successfully!'); }} />
      )}

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
   ATTENDANCE VIEW
───────────────────────────────────────────── */
function AttendanceView({ visits, filtered, filterStatus, setFilterStatus, filterAgent, setFilterAgent, filterDate, setFilterDate, searchQuery, setSearchQuery, selectedVisit, setSelectedVisit, updateStatus, setShowAddModal, agents }: any) {

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-normal">Attendance Management</h1>
          <p className="mt-0.5 text-[12px] text-gray-500">Track, confirm, and manage all property visit appointments.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors">
          <Plus size={13} /> Schedule Visit
        </button>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {(Object.entries(statusConfig) as [AttendanceStatus, typeof statusConfig[AttendanceStatus]][]).map(([key, cfg]) => {
          const count = visits.filter((v: Visit) => v.status === key).length;
          const Icon = cfg.icon;
          return (
            <button
              key={key}
              onClick={() => setFilterStatus(filterStatus === key ? 'all' : key)}
              className={`rounded-sm border p-4 text-left transition-all ${filterStatus === key ? `${cfg.bg} ${cfg.color} shadow-md scale-[1.02]` : 'bg-white border-[#e2ddd6] hover:border-[#b89a5a]/40'}`}
            >
              <Icon size={16} className={filterStatus === key ? cfg.color : 'text-gray-400'} />
              <div className="mt-2 font-serif text-2xl text-[#0f1f3d]">{count}</div>
              <div className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-gray-500">{cfg.label}</div>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-sm bg-white border border-[#e2ddd6] px-5 py-3.5 shadow-sm">
        <Filter size={13} className="text-gray-400" />
        <div className="relative">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search client or property..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="rounded-sm border border-gray-200 bg-[#f7f6f3] pl-8 pr-4 py-1.5 text-[11px] outline-none focus:border-[#b89a5a] transition-colors w-52 placeholder:text-gray-400" />
        </div>
        <select value={filterAgent} onChange={e => setFilterAgent(e.target.value)}
          className="rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-1.5 text-[11px] outline-none focus:border-[#b89a5a] text-gray-600 transition-colors">
          {agents.map((a: string) => <option key={a}>{a}</option>)}
        </select>
        <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
          className="rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-1.5 text-[11px] outline-none focus:border-[#b89a5a] text-gray-600 transition-colors" />
        {(filterStatus !== 'all' || filterAgent !== 'All Agents' || filterDate || searchQuery) && (
          <button onClick={() => { setFilterStatus('all'); setFilterAgent('All Agents'); setFilterDate(''); setSearchQuery(''); }}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-700 transition-colors">
            <X size={10} /> Clear
          </button>
        )}
        <span className="ml-auto text-[10px] text-gray-400">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Visit cards grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center text-gray-400">
          <CalendarCheck size={40} className="mb-3 text-gray-200" />
          <p className="text-sm">No visits match your filters</p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((v: Visit) => {
            const cfg = statusConfig[v.status];
            const StatusIcon = cfg.icon;
            const isToday = v.date === today;
            return (
              <div
                key={v.id}
                onClick={() => setSelectedVisit(v)}
                className={`group cursor-pointer rounded-sm bg-white border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${isToday ? 'border-[#b89a5a]/40' : 'border-[#e2ddd6]'}`}
              >
                {/* Color bar */}
                <div className={`h-1 w-full rounded-t-sm ${v.type === 'sale' ? 'bg-[#0f1f3d]' : 'bg-[#b89a5a]'}`} />

                <div className="p-5">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {isToday && <span className="rounded-full bg-[#b89a5a]/10 border border-[#b89a5a]/30 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#b89a5a]">Today</span>}
                        <span className={`rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest ${v.type === 'sale' ? 'bg-[#0f1f3d]/5 border-[#0f1f3d]/10 text-[#0f1f3d]' : 'bg-[#b89a5a]/5 border-[#b89a5a]/20 text-[#b89a5a]'}`}>
                          {v.type}
                        </span>
                      </div>
                      <p className="font-medium text-[13px]">{v.clientName}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
                      <StatusIcon size={9} />{cfg.label}
                    </div>
                  </div>

                  {/* Property */}
                  <div className="mb-4 rounded-sm bg-[#f7f6f3] px-3 py-2.5">
                    <p className="text-[12px] font-medium text-[#0f1f3d]">{v.property}</p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5"><MapPin size={9} className="text-[#b89a5a]" />{v.propertyLoc}</p>
                    <p className="text-[11px] font-medium text-[#b89a5a] mt-1">{v.price}</p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-[#b89a5a]" />
                      {fmt(v.date)} · {v.time}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <img src={v.agentImg} alt={v.agent} className="h-5 w-5 rounded-full object-cover object-top" />
                      {v.agent.split(' ')[0]}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 border-t border-[#f0ede8] pt-3" onClick={e => e.stopPropagation()}>
                    {v.status === 'pending' && (
                      <>
                        <button onClick={() => updateStatus(v.id, 'confirmed')} className="flex-1 rounded-sm bg-emerald-50 border border-emerald-200 py-1.5 text-[9px] font-bold uppercase tracking-widest text-emerald-700 hover:bg-emerald-100 transition-colors">
                          ✓ Confirm
                        </button>
                        <button onClick={() => updateStatus(v.id, 'cancelled')} className="flex-1 rounded-sm bg-rose-50 border border-rose-200 py-1.5 text-[9px] font-bold uppercase tracking-widest text-rose-700 hover:bg-rose-100 transition-colors">
                          ✕ Cancel
                        </button>
                      </>
                    )}
                    {v.status === 'confirmed' && (
                      <>
                        <button onClick={() => updateStatus(v.id, 'completed')} className="flex-1 rounded-sm bg-blue-50 border border-blue-200 py-1.5 text-[9px] font-bold uppercase tracking-widest text-blue-700 hover:bg-blue-100 transition-colors">
                          ★ Complete
                        </button>
                        <button onClick={() => updateStatus(v.id, 'no-show')} className="flex-1 rounded-sm bg-gray-50 border border-gray-200 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-100 transition-colors">
                          No-Show
                        </button>
                        <button onClick={() => updateStatus(v.id, 'cancelled')} className="rounded-sm bg-rose-50 border border-rose-200 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-rose-700 hover:bg-rose-100 transition-colors">
                          ✕
                        </button>
                      </>
                    )}
                    {(v.status === 'completed' || v.status === 'cancelled' || v.status === 'no-show') && (
                      <button onClick={() => updateStatus(v.id, 'pending')} className="flex items-center gap-1.5 rounded-sm bg-[#f0ede8] border border-[#e2ddd6] px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-600 hover:border-[#b89a5a] transition-all">
                        <RefreshCw size={9} /> Reopen
                      </button>
                    )}
                    <button onClick={() => setSelectedVisit(v)} className="rounded-sm border border-[#e2ddd6] px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-500 hover:border-[#b89a5a] transition-all">
                      Details
                    </button>
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

/* ─────────────────────────────────────────────
   VISIT DETAIL DRAWER
───────────────────────────────────────────── */
function VisitDetailDrawer({ visit, onClose, updateStatus }: { visit: Visit; onClose: () => void; updateStatus: (id: string, s: AttendanceStatus) => void }) {
  const cfg = statusConfig[visit.status];
  const StatusIcon = cfg.icon;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-30 backdrop-blur-sm" onClick={onClose} />
      <aside className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-40 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#0f1f3d]">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#b89a5a]">Visit · {visit.id}</p>
            <h2 className="mt-1 font-serif text-xl text-white">{visit.clientName}</h2>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-white transition-colors">
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Status</h3>
            <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
              <StatusIcon size={10} />{cfg.label}
            </div>
          </div>

          {/* Property */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Property</h3>
            <div className="rounded-sm bg-[#f7f6f3] p-4">
              <p className="font-medium text-[13px]">{visit.property}</p>
              <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-1"><MapPin size={10} className="text-[#b89a5a]" />{visit.propertyLoc}</p>
              <p className="text-[12px] font-medium text-[#b89a5a] mt-2">{visit.price}</p>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Schedule</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[12px]">
                <Calendar size={12} className="text-[#b89a5a]" />
                {fmt(visit.date)}
              </div>
              <div className="flex items-center gap-2 text-[12px]">
                <Clock size={12} className="text-[#b89a5a]" />
                {visit.time}
              </div>
            </div>
          </div>

          {/* Client */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Client</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[12px]">
                <Phone size={12} className="text-[#b89a5a]" />
                {visit.clientPhone}
              </div>
              <div className="flex items-center gap-2 text-[12px]">
                <Mail size={12} className="text-[#b89a5a]" />
                {visit.clientEmail}
              </div>
            </div>
          </div>

          {/* Agent */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Agent</h3>
            <div className="flex items-center gap-3">
              <img src={visit.agentImg} alt={visit.agent} className="h-8 w-8 rounded-full object-cover object-top" />
              <div>
                <p className="font-medium text-[12px]">{visit.agent}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Notes</h3>
            <p className="text-[12px] text-gray-600">{visit.notes}</p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-[#e2ddd6] p-4 space-y-2">
          {visit.status === 'pending' && (
            <>
              <button onClick={() => updateStatus(visit.id, 'confirmed')} className="w-full rounded-sm bg-emerald-50 border border-emerald-200 py-2 text-[10px] font-bold uppercase tracking-widest text-emerald-700 hover:bg-emerald-100 transition-colors">
                ✓ Confirm Visit
              </button>
              <button onClick={() => updateStatus(visit.id, 'cancelled')} className="w-full rounded-sm bg-rose-50 border border-rose-200 py-2 text-[10px] font-bold uppercase tracking-widest text-rose-700 hover:bg-rose-100 transition-colors">
                ✕ Cancel Visit
              </button>
            </>
          )}
          {visit.status === 'confirmed' && (
            <>
              <button onClick={() => updateStatus(visit.id, 'completed')} className="w-full rounded-sm bg-blue-50 border border-blue-200 py-2 text-[10px] font-bold uppercase tracking-widest text-blue-700 hover:bg-blue-100 transition-colors">
                ★ Mark Complete
              </button>
              <button onClick={() => updateStatus(visit.id, 'no-show')} className="w-full rounded-sm bg-gray-50 border border-gray-200 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-100 transition-colors">
                No-Show
              </button>
              <button onClick={() => updateStatus(visit.id, 'cancelled')} className="w-full rounded-sm bg-rose-50 border border-rose-200 py-2 text-[10px] font-bold uppercase tracking-widest text-rose-700 hover:bg-rose-100 transition-colors">
                ✕ Cancel Visit
              </button>
            </>
          )}
          {(visit.status === 'completed' || visit.status === 'cancelled' || visit.status === 'no-show') && (
            <button onClick={() => updateStatus(visit.id, 'pending')} className="w-full rounded-sm bg-[#f0ede8] border border-[#e2ddd6] py-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:border-[#b89a5a] transition-all">
              <RefreshCw size={10} className="inline mr-1" /> Reopen Visit
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

/* ─────────────────────────────────────────────
   ADD VISIT MODAL
───────────────────────────────────────────── */
function AddVisitModal({ onClose, onAdd }: { onClose: () => void; onAdd: (visit: Visit) => void }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    property: '',
    propertyLoc: '',
    agent: 'Sophia Laurent',
    date: '',
    time: '',
    type: 'sale' as VisitType,
    notes: '',
    price: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVisit: Visit = {
      id: `V${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      ...formData,
      agentImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&q=80',
      status: 'pending'
    };
    onAdd(newVisit);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-30 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-sm shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2ddd6]">
            <h2 className="font-serif text-lg">Schedule New Visit</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Client Name</label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] outline-none focus:border-[#b89a5a]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.clientPhone}
                  onChange={e => setFormData({ ...formData, clientPhone: e.target.value })}
                  className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] outline-none focus:border-[#b89a5a]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.clientEmail}
                  onChange={e => setFormData({ ...formData, clientEmail: e.target.value })}
                  className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] outline-none focus:border-[#b89a5a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Property</label>
              <input
                type="text"
                required
                value={formData.property}
                onChange={e => setFormData({ ...formData, property: e.target.value })}
                className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] outline-none focus:border-[#b89a5a]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Location</label>
              <input
                type="text"
                required
                value={formData.propertyLoc}
                onChange={e => setFormData({ ...formData, propertyLoc: e.target.value })}
                className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] outline-none focus:border-[#b89a5a]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] outline-none focus:border-[#b89a5a]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Time</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 2:00 PM"
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                  className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] outline-none focus:border-[#b89a5a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value as VisitType })}
                  className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] outline-none focus:border-[#b89a5a]"
                >
                  <option value="sale">Sale</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Price</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., $2,450,000"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] outline-none focus:border-[#b89a5a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Agent</label>
              <select
                value={formData.agent}
                onChange={e => setFormData({ ...formData, agent: e.target.value })}
                className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] outline-none focus:border-[#b89a5a]"
              >
                <option value="Sophia Laurent">Sophia Laurent</option>
                <option value="Marcus Webb">Marcus Webb</option>
                <option value="Jonathan Altis">Jonathan Altis</option>
                <option value="Isabelle Fontaine">Isabelle Fontaine</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Notes</label>
              <textarea
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                className="w-full rounded-sm border border-gray-200 bg-[#f7f6f3] px-3 py-2 text-[12px] outline-none focus:border-[#b89a5a] resize-none"
                rows={3}
                placeholder="Additional notes about the visit..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-sm border border-[#e2ddd6] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-gray-600 hover:border-[#b89a5a] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors"
              >
                Schedule Visit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
