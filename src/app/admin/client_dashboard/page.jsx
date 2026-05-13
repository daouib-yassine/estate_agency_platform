"use client";
import React, { useState, useMemo } from "react";
import {
  LayoutDashboard, Home, Building2, Users, CalendarCheck,
  Bell, Settings, LogOut, Search, TrendingUp, TrendingDown,
  CheckCircle2, XCircle, AlertCircle, Plus, ChevronDown,
  MoreHorizontal, Phone, Mail, MapPin, DollarSign,
  ArrowRight, Star, UserCheck, UserX, Calendar, BarChart2,
  ChevronRight, X, Filter, Eye, Edit2, Trash2,
  MessageSquare, RefreshCw, Tag, Globe, Clock,
  CreditCard, Briefcase, Heart, Home as HomeIcon,
  TrendingUp as Budget, Users as Group
} from "lucide-react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
const ClientStatus =  ["Paye", "EnAttente", "Partiel", "inactive"];
const ClientInterest = ["sale", "rent"];

const Client = {
  id: String,
  name: String,
  email: String,
  phone: String,
  location: String,
  status: ClientStatus,
  interest: ClientInterest,
  budget: String,
//   assignedAgent: String,
//   agentImg: String,
  joinedDate: String,
  lastContact: String,
  totalVisits: Number,
  notes: String,
  avatar: String,
  tags: String,
  dealValue:String
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const initialClients = [
  {
    id: "C001", name: "James Thornton", email: "james.t@email.com", phone: "+1 310 555-0122",
    location: "Beverly Hills, CA", status: "Paye", interest: "sale", budget: "$2,800,000",
    assetType: "appartement", buildingName: "chaimae Residence",
    joinedDate: "2025-11-14", lastContact: "2026-05-13", totalVisits: 7,
    notes: "Interested in 5-bed. Pre-approved. Serious buyer.", avatar: "JT",
    tags: ["Pre-approved", "Motivated"], dealValue: "$2,450,000",
  },
  {
    id: "C002", name: "Nadia Bellamy", email: "nadia.b@email.com", phone: "+1 310 555-0198",
    location: "Manhattan, NY", status: "EnAttente", interest: "rent", budget: "$9,000/mo",
    assetType: "maison",buildingName: "EL Taleb Residence",joinedDate: "2026-01-08", lastContact: "2026-05-12", totalVisits: 3,
    notes: "Remote worker, 12-month lease preferred.", avatar: "NB",
    tags: ["Long-term", "Remote"],
  },
  {
    id: "C003", name: "Carlos Rivera", email: "carlos.r@email.com", phone: "+1 310 555-0177",
    location: "Downtown Miami, FL", status: "inactive", interest: "sale", budget: "$4,500,000",
    assetType: "garage",buildingName: "Al Warda Residence",joinedDate: "2025-09-22", lastContact: "2026-05-12", totalVisits: 12,
    notes: "Deal agreed. Paperwork in progress.", avatar: "CR",
    tags: ["Closed deal"], dealValue: "$4,200,000",
  },
  {
    id: "C004", name: "Amara Okafor", email: "amara.o@email.com", phone: "+1 213 555-0144",
    location: "Malibu, CA", status: "Partiel", interest: "sale", budget: "$6,000,000",
    assetType: "land",buildingName: "Chaimae Residence",
    joinedDate: "2026-02-01", lastContact: "2026-05-10", totalVisits: 5,
    notes: "High-net-worth. Pre-approved $6M. Very decisive.", avatar: "AO",
    tags: ["HNW", "Pre-approved"],
  },
  {
    id: "C005", name: "Felix Hoffman", email: "felix.h@email.com", phone: "+1 213 555-0163",
    location: "Santa Monica, CA", status: "Paye", interest: "rent", budget: "$3,500/mo",
    assetType: "appartement",buildingName: "EL Taleb Residence",
    joinedDate: "2026-03-15", lastContact: "2026-05-11", totalVisits: 1,
    notes: "No-show on first visit. Follow-up needed.", avatar: "FH",
    tags: ["Follow-up"],
  },
  {
    id: "C006", name: "Priya Nair", email: "priya.n@email.com", phone: "+1 310 555-0199",
    location: "Bel Air, CA", status: "EnAttente", interest: "sale", budget: "$6,500,000",
    assetType: "maison",buildingName: "Al Warda Residence",
    joinedDate: "2026-04-20", lastContact: "2026-05-09", totalVisits: 2,
    notes: "Referral from existing client. Motivated buyer.", avatar: "PN",
    tags: ["Referral", "Motivated"],
  },
  {
    id: "C007", name: "Oliver Stern", email: "oliver.s@email.com", phone: "+1 213 555-0181",
    location: "Pasadena, CA", status: "Partiel", interest: "sale", budget: "$1,200,000",
    assetType: "garage",buildingName: "Chaimae Residence",joinedDate: "2026-01-30", lastContact: "2026-05-12", totalVisits: 4,
    notes: "Postponed visit due to travel. Rescheduling.", avatar: "OS",
    tags: ["Rescheduled"],
  },
  {
    id: "C008", name: "Hana Yoshida", email: "hana.y@email.com", phone: "+1 310 555-0155",
    location: "Downtown LA, CA", status: "inactive", interest: "sale", budget: "$750,000",
    assetType: "land",buildingName: "El Taleb Residence",joinedDate: "2026-03-05", lastContact: "2026-05-13", totalVisits: 3,
    notes: "Off-plan interest. Wants floor 8+.", avatar: "HY",
    tags: ["Off-plan"],
  },
  {
    id: "C009", name: "Marcus Lee", email: "marcus.l@email.com", phone: "+1 415 555-0211",
    location: "San Francisco, CA", status: "Paye", interest: "investment", budget: "$3,000,000",
    assetType: "appartement",buildingName: "Al Warda Residence",joinedDate: "2026-05-01", lastContact: "2026-05-08", totalVisits: 1,
    notes: "Looking for rental-yield properties. Portfolio buyer.", avatar: "ML",
    tags: ["Investor", "Portfolio"],
  },
];

const statusConfig = {
  Paye:      { label: "Payé",       color: "text-amber-700",   bg: "bg-amber-50 border-amber-200",   dot: "bg-amber-500" },
  EnAttente: { label: "En Attente", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
  Partiel:   { label: "Partiel",    color: "text-blue-700",    bg: "bg-blue-50 border-blue-200",      dot: "bg-blue-500" },
  inactive:  { label: "inactive",   color: "text-[#0f1f3d]",   bg: "bg-[#f0ede8] border-[#d4c9b8]",  dot: "bg-[#b89a5a]" },
};

const interestConfig = {
  sale:       { label: "For Sale",    color: "bg-[#0f1f3d] text-white" },
  rent:       { label: "Rental",      color: "bg-[#b89a5a] text-white" },
  investment: { label: "Investment",  color: "bg-emerald-700 text-white" },
};

const assetTypes = [
  { label: "Tous les types", value: "TOUS" },
  { label: "Maison", value: "maison" },
  { label: "Appartement", value: "appartement" },
  { label: "Garage", value: "garage" },
  { label: "Terrain", value: "land" },
  { label: "Commercial", value: "commercial" },
];const statuses = ["TOUS", "Paye", "EnAttente", "Partiel", "inactive"];

const buildingNames = [
  "TOUS",
  "Chaimae Residence",
  "El Taleb Residence",
  "Al Warda Residence",
];
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",    id: "dashboard" },
  { icon: Home,            label: "Properties",   id: "properties" },
  { icon: Building2,       label: "Developments", id: "developments" },
  { icon: CalendarCheck,   label: "Attendance",   id: "attendance" },
  { icon: Users,           label: "Clients",      id: "clients" },
  { icon: BarChart2,       label: "Reports",      id: "reports" },
  { icon: Settings,        label: "Settings",     id: "settings" },
];

const fmt = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/* ─────────────────────────────────────────────
   CLIENT DETAIL DRAWER
───────────────────────────────────────────── */
function ClientDrawer({ client, onClose, onStatusChange }) {
  const cfg = statusConfig[client.status];
  const int = interestConfig[client.interest];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="w-[480px] flex flex-col bg-white shadow-2xl overflow-y-auto animate-slide-in">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#e2ddd6]">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-[#0f1f3d] flex items-center justify-center flex-shrink-0">
              <span className="font-serif text-xl text-[#d4b87a]">{client.avatar}</span>
            </div>
            <div>
              <h2 className="font-serif text-xl">{client.name}</h2>
              <p className="text-[11px] text-gray-400 mt-0.5">{client.id} · Joined {fmt(client.joinedDate)}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-[#0f1f3d] transition-colors mt-1">
            <X size={18} />
          </button>
        </div>

        {/* Badges */}
        <div className="flex gap-2 px-6 pt-4 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
          <span className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${int.color}`}>
            {int.label}
          </span>
          {client.tags.map(tag => (
            <span key={tag} className="rounded-full bg-[#f0ede8] px-3 py-1 text-[9px] font-medium text-[#b89a5a]">{tag}</span>
          ))}
        </div>

        {/* Contact info */}
        <div className="px-6 pt-5 space-y-3">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">Contact Information</h3>
          {[
            { icon: Mail, label: client.email },
            { icon: Phone, label: client.phone },
            { icon: MapPin, label: client.location },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-sm bg-[#f0ede8] flex items-center justify-center flex-shrink-0">
                <Icon size={12} className="text-[#b89a5a]" />
              </div>
              <span className="text-[12px] text-[#0f1f3d]">{label}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mx-6 mt-5 grid grid-cols-3 gap-3">
          {[
            { label: "Total Visits", val: client.totalVisits, icon: CalendarCheck },
            { label: "Budget", val: client.budget, icon: DollarSign },
            { label: "Last Contact", val: fmt(client.lastContact), icon: Clock },
          ].map(({ label, val, icon: Icon }) => (
            <div key={label} className="rounded-sm bg-[#f7f6f3] border border-[#e2ddd6] p-3 text-center">
              <Icon size={12} className="text-[#b89a5a] mx-auto mb-1" />
              <p className="text-[11px] font-bold text-[#0f1f3d]">{val}</p>
              <p className="text-[9px] text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Assigned agent */}
        {/* <div className="px-6 mt-5">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">Assigned Agent</h3>
          <div className="flex items-center gap-3 rounded-sm bg-[#f7f6f3] border border-[#e2ddd6] p-3">
            <img src={client.agentImg} alt={client.assignedAgent} className="h-9 w-9 rounded-full object-cover object-top" />
            <div>
              <p className="text-[12px] font-medium">{client.assignedAgent}</p>
              <p className="text-[10px] text-gray-400">Real Estate Agent</p>
            </div>
          </div>
        </div> */}

        {/* Deal value */}
        {client.dealValue && (
          <div className="mx-6 mt-4 rounded-sm bg-[#0f1f3d] p-4 border-l-4 border-[#b89a5a]">
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 mb-1">Deal Value</p>
            <p className="font-serif text-2xl text-[#d4b87a]">{client.dealValue}</p>
          </div>
        )}

        {/* Notes */}
        <div className="px-6 mt-5">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Notes</h3>
          <p className="text-[12px] text-gray-600 leading-relaxed bg-[#f7f6f3] rounded-sm p-3 border border-[#e2ddd6]">
            {client.notes}
          </p>
        </div>

        {/* Status change */}
        <div className="px-6 mt-5 mb-6">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">Update Status</h3>
          <div className="flex flex-wrap gap-2">
            {(["Paye", "EnAttente", "Partiel", "inactive"]).map(s => {
              const c = statusConfig[s];
              if (!c) return null;
              return (
                <button
                  key={s}
                  onClick={() => onStatusChange(client.id, s)}
                  className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-widest transition-all ${
                    client.status === s ? `${c.bg} ${c.color} shadow-sm` : "border-[#e2ddd6] text-gray-400 hover:border-[#b89a5a] hover:text-[#b89a5a]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-[#e2ddd6] p-4 flex gap-2 mt-auto">
          <button className="flex-1 flex items-center justify-center gap-2 rounded-sm bg-[#0f1f3d] py-2.5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors">
            <Phone size={11} /> Call
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 rounded-sm border border-[#0f1f3d] py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#0f1f3d] hover:bg-[#f0ede8] transition-colors">
            <Mail size={11} /> Email
          </button>
          <button className="flex items-center justify-center gap-2 rounded-sm border border-[#e2ddd6] px-3 py-2.5 text-gray-400 hover:border-[#b89a5a] hover:text-[#b89a5a] transition-colors">
            <CalendarCheck size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function ClientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("TOUS");//all
  const [filterAssetType, setFilterAssetType] = useState("TOUS");
  const [filterInterest, setFilterInterest] = useState("TOUS");
  const [filterBuilding, setFilterBuilding] = useState("TOUS");
  const [selectedClient, setSelectedClient] = useState(null);
  const [notification, setNotification] = useState(null);
  const [viewMode, setViewMode] = useState("table");

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const updateStatus = (id, status) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    setSelectedClient(prev => prev?.id === id ? { ...prev, status } : prev);
    showNotif(`Client status updated to ${statusConfig[status].label}`);
  };

  const filtered = useMemo(() => clients.filter(c => {
    const matchSearch = search === "" || c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "TOUS" || c.status === filterStatus;
    // const matchAgent = filterAgent === "All Agents" || c.assignedAgent === filterAgent;
    const matchInterest =
        filterInterest === "TOUS" || c.interest === filterInterest;

    const matchAssetType =
        filterAssetType === "TOUS" || c.assetType === filterAssetType;
    
    const matchBuilding =
        filterBuilding === "TOUS" || c.buildingName === filterBuilding;
    
    return matchSearch && matchStatus && matchInterest && matchAssetType && matchBuilding;
  }), [clients, search, filterStatus, filterInterest, filterAssetType, filterBuilding]);

  // KPIs
  const totalClients = clients.length;
  const vipCount = clients.filter(c => c.status === "vip").length;
  const activeCount = clients.filter(c => c.status === "active").length;
  const closedCount = clients.filter(c => c.status === "closed").length;
  const prospectCount = clients.filter(c => c.status === "prospect").length;
  const pendingBell = clients.filter(c => c.status === "prospect" || c.status === "inactive").length;

  return (
    <div className="flex h-screen bg-[#f0ede8] font-sans text-[#0f1f3d] overflow-hidden">

      {/* SIDEBAR */}
      <aside className={`relative flex flex-col bg-[#0f1f3d] transition-all duration-300 ${sidebarOpen ? "w-60" : "w-16"} flex-shrink-0 z-20`}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-[#b89a5a]">
            <span className="font-serif text-sm font-bold text-white">A</span>
          </div>
          {sidebarOpen && (
            <span className="font-serif text-lg text-white tracking-wider">Altis<span className="text-[#d4b87a]">.</span></span>
          )}
        </div>
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, id }) => {
            const isActive = id === "clients";
            return (
              <button
                key={id}
                onClick={() => {
                  if (id === "dashboard") window.location.href = "/admin/dashboard";
                  else if (id === "attendance") window.location.href = "/admin/attendance_dashboard";
                  else if (id === "properties") window.location.href = "/admin/properties_management";
                  else if (id === "developments") window.location.href = "/admin/development_dashboard";
                  else if (id === "clients") window.location.href = "/admin/client_dashboard";
                  else if (id === "reports") window.location.href = "/admin/reports_dashboard";
                  else if (id === "settings") window.location.href = "/admin/settings_dashboard";
                }}
                className={`flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-all ${isActive ? "bg-[#b89a5a] text-white" : "text-white/50 hover:bg-white/5 hover:text-white/80"}`}
              >
                <Icon size={16} className="flex-shrink-0" />
                {sidebarOpen && <span className="text-[12px] font-medium tracking-wide">{label}</span>}
                {sidebarOpen && isActive && <ChevronRight size={12} className="ml-auto" />}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3 space-y-1">
          <div className={`flex items-center gap-3 px-3 py-2.5 ${sidebarOpen ? "" : "justify-center"}`}>
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&q=80" alt="Admin" className="h-7 w-7 flex-shrink-0 rounded-full object-cover object-top" />
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-white">Jonathan Altis</p>
                <p className="text-[9px] text-white/40">Administrator</p>
              </div>
            )}
          </div>
          <button className={`flex w-full items-center gap-3 rounded-sm px-3 py-2 text-white/40 hover:text-rose-400 transition-colors ${!sidebarOpen ? "justify-center" : ""}`}>
            <LogOut size={14} />
            {sidebarOpen && <span className="text-[11px]">Sign Out</span>}
          </button>
        </div>
        <button
          onClick={() => setSidebarOpen(s => !s)}
          className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-[#b89a5a] text-white shadow-lg"
        >
          {sidebarOpen ? <ChevronDown size={10} className="-rotate-90" /> : <ChevronDown size={10} className="rotate-90" />}
        </button>
      </aside>

      {/* MAIN */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Topbar */}
        <header className="flex items-center justify-between border-b border-[#e2ddd6] bg-white px-6 py-3.5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search clients, emails, locations..."
                className="rounded-sm border border-gray-200 bg-[#f7f6f3] pl-9 pr-4 py-2 text-[12px] outline-none focus:border-[#b89a5a] w-72 transition-colors placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-gray-400">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </span>
            <div className="relative">
              <button className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#f7f6f3] border border-gray-200 text-gray-500 hover:border-[#b89a5a] transition-colors">
                <Bell size={14} />
                {pendingBell > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#b89a5a] text-[8px] font-bold text-white">{pendingBell}</span>
                )}
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors">
              <Plus size={12} /> Add Client
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Page title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl font-normal">Client Management</h1>
              <p className="mt-0.5 text-[12px] text-gray-500">Track, manage and nurture your client relationships.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 rounded-sm border text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === "table" ? "bg-[#0f1f3d] text-white border-[#0f1f3d]" : "border-[#e2ddd6] text-gray-400 hover:border-[#0f1f3d]"}`}
              >Table</button>
              <button
                onClick={() => setViewMode("cards")}
                className={`px-3 py-1.5 rounded-sm border text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === "cards" ? "bg-[#0f1f3d] text-white border-[#0f1f3d]" : "border-[#e2ddd6] text-gray-400 hover:border-[#0f1f3d]"}`}
              >Cards</button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {[
              { label: "Total Clients",  val: totalClients,   color: "bg-[#0f1f3d]",    icon: Users,      trend: "Portfolio",     up: true },
              { label: "VIP Clients",    val: vipCount,       color: "bg-amber-600",     icon: Star,       trend: "High-value",    up: true },
              { label: "Active",         val: activeCount,    color: "bg-emerald-700",   icon: UserCheck,  trend: "Engaged",       up: true },
              { label: "Prospects",      val: prospectCount,  color: "bg-blue-700",      icon: Eye,        trend: "In pipeline",   up: true },
              { label: "Closed Deals",   val: closedCount,    color: "bg-[#b89a5a]",     icon: CheckCircle2, trend: "This period",  up: true },
            ].map(({ label, val, color, icon: Icon, trend, up }) => (
              <div key={label} className="rounded-sm bg-white border border-[#e2ddd6] p-5 shadow-sm relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${color}`} />
                <div className="flex items-start justify-between mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
                  <div className={`flex h-7 w-7 items-center justify-center rounded-sm ${color} opacity-90`}>
                    <Icon size={12} className="text-white" />
                  </div>
                </div>
                <div className="font-serif text-4xl text-[#0f1f3d]">{val}</div>
                <div className={`mt-2 flex items-center gap-1 text-[10px] font-medium ${up ? "text-emerald-600" : "text-amber-600"}`}>
                  <TrendingUp size={10} /> {trend}
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <Filter size={10} /> Filter:
            </div>

            {/* Status filter */}
            <div className="flex gap-1 flex-wrap">
              {statuses.map(s => {
                const isAll = s === "TOUS";
                const active = filterStatus === s;
                return (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-widest transition-all ${
                      active
                        ? isAll ? "bg-[#0f1f3d] text-white border-[#0f1f3d]" : `${statusConfig[s].bg} ${statusConfig[s].color}`
                        : "border-[#e2ddd6] text-gray-400 hover:border-[#b89a5a]"
                    }`}
                  >
                    {isAll ? "TOUS" : statusConfig[s].label}
                  </button>
                );
              })}
            </div>

            <div className="w-px h-4 bg-[#e2ddd6]" />

            {/* Essets Type filter */}
           {/* Asset Type filter */}
            <select
            value={filterAssetType}
            onChange={e => setFilterAssetType(e.target.value)}
            className="rounded-sm border border-[#e2ddd6] bg-white px-3 py-1.5 text-[11px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] cursor-pointer"
            >
            {assetTypes.map(type => (
                <option key={type.value} value={type.value}>
                {type.label}
                </option>
            ))}
            </select>
            {/* Building filter */}
            {filterAssetType === "appartement" && (
            <select
                value={filterBuilding}
                onChange={e => setFilterBuilding(e.target.value)}
                className="rounded-sm border border-[#e2ddd6] bg-white px-3 py-1.5 text-[11px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] cursor-pointer"
            >
                {buildingNames.map(name => (
                <option key={name} value={name}>
                    {name === "TOUS" ? "Tous les immeubles" : name}
                </option>
                ))}
            </select>
            )}
            {/* Interest filter */}
            <select
            value={filterInterest}
            onChange={e => setFilterInterest(e.target.value)}
            className="rounded-sm border border-[#e2ddd6] bg-white px-3 py-1.5 text-[11px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] cursor-pointer"
            >
            <option value="TOUS">All Interests</option>
            <option value="sale">For Sale</option>
            <option value="rent">Rental</option>
            <option value="investment">Investment</option>
            </select>

            <span className="ml-auto text-[11px] text-gray-400">{filtered.length} client{filtered.length !== 1 ? "s" : ""}</span>

            {(search || filterStatus !== "TOUS" || filterInterest !== "TOUS" || filterAssetType !== "TOUS" || filterBuilding !== "TOUS") && (
              <button
                onClick={() => { setSearch(""); setFilterStatus("TOUS"); setFilterInterest("TOUS"); setFilterAssetType("TOUS"); setFilterBuilding("TOUS"); }}
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-700"
              >
                <X size={10} /> Clear
              </button>
            )}
          </div>

          {/* TABLE VIEW */}
          {viewMode === "table" && (
            <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f0ede8] bg-[#faf9f7]">
                      {["Client", "Contact", "Location", "Interest", "Budget", "Visits", "Last Contact", "Status", ""].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-[9px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f7f5f2]">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="px-5 py-16 text-center text-gray-400 text-sm">No clients match your filters.</td>
                      </tr>
                    ) : filtered.map(c => {
                      const cfg = statusConfig[c.status];
                      const int = interestConfig[c.interest];
                      return (
                        <tr
                          key={c.id}
                          className="hover:bg-[#faf9f7] transition-colors cursor-pointer"
                          onClick={() => setSelectedClient(c)}
                        >
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-[#0f1f3d] flex items-center justify-center flex-shrink-0">
                                <span className="text-[10px] font-bold text-[#d4b87a]">{c.avatar}</span>
                              </div>
                              <div>
                                <p className="text-[12px] font-medium whitespace-nowrap">{c.name}</p>
                                <p className="text-[10px] text-gray-400">{c.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <p className="text-[11px] text-gray-600 flex items-center gap-1"><Mail size={9} className="text-[#b89a5a]" /> {c.email}</p>
                            <p className="text-[11px] text-gray-600 flex items-center gap-1 mt-0.5"><Phone size={9} className="text-[#b89a5a]" /> {c.phone}</p>
                          </td>
                          <td className="px-5 py-3.5">
                            <p className="text-[12px] text-gray-600 flex items-center gap-1 whitespace-nowrap">
                              <MapPin size={9} className="text-[#b89a5a] flex-shrink-0" /> {c.location}
                            </p>
                          </td>
                          {/* <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <img src={c.agentImg} alt={c.assignedAgent} className="h-6 w-6 rounded-full object-cover object-top" />
                              <span className="text-[12px] whitespace-nowrap">{c.assignedAgent.split(" ")[0]}</span>
                            </div>
                          </td> */}
                          <td className="px-5 py-3.5">
                            <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${int.color}`}>
                              {int.label}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <p className="text-[12px] font-medium whitespace-nowrap">{c.budget}</p>
                            {c.dealValue && <p className="text-[10px] text-[#b89a5a] font-medium">Deal: {c.dealValue}</p>}
                          </td>
                          <td className="px-5 py-3.5 text-center">
                            <span className="font-serif text-lg text-[#0f1f3d]">{c.totalVisits}</span>
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <p className="text-[12px] text-gray-500">{fmt(c.lastContact)}</p>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                              {cfg.label}
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <button
                              onClick={e => { e.stopPropagation(); setSelectedClient(c); }}
                              className="flex items-center gap-1 rounded-sm border border-[#e2ddd6] px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:border-[#b89a5a] hover:text-[#b89a5a] transition-colors whitespace-nowrap"
                            >
                              <Eye size={10} /> View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CARD VIEW */}
          {viewMode === "cards" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.length === 0 ? (
                <div className="col-span-3 py-16 text-center text-gray-400">No clients match your filters.</div>
              ) : filtered.map(c => {
                const cfg = statusConfig[c.status];
                const int = interestConfig[c.interest];
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedClient(c)}
                    className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-5 cursor-pointer hover:shadow-md hover:border-[#b89a5a] transition-all group relative overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-1 h-full ${cfg.dot}`} />
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#0f1f3d] flex items-center justify-center">
                          <span className="font-serif text-sm text-[#d4b87a]">{c.avatar}</span>
                        </div>
                        <div>
                          <p className="text-[13px] font-medium">{c.name}</p>
                          <p className="text-[10px] text-gray-400">{c.id}</p>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-4">
                      <p className="text-[11px] text-gray-500 flex items-center gap-1.5"><Mail size={9} className="text-[#b89a5a]" />{c.email}</p>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1.5"><MapPin size={9} className="text-[#b89a5a]" />{c.location}</p>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1.5"><DollarSign size={9} className="text-[#b89a5a]" />{c.budget}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#f0ede8]">
                      {/* <div className="flex items-center gap-2">
                        <img src={c.agentImg} alt={c.assignedAgent} className="h-5 w-5 rounded-full object-cover object-top" />
                        <span className="text-[10px] text-gray-400">{c.assignedAgent.split(" ")[0]}</span>
                      </div> */}
                      <div className="flex gap-1.5 items-center">
                        <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold uppercase ${int.color}`}>{int.label}</span>
                        <span className="text-[10px] text-gray-400">{c.totalVisits} visits</span>
                      </div>
                    </div>

                    {c.dealValue && (
                      <div className="mt-3 rounded-sm bg-[#f0ede8] px-3 py-1.5 flex items-center justify-between">
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest">Deal</span>
                        <span className="text-[11px] font-bold text-[#b89a5a]">{c.dealValue}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* DRAWER */}
      {selectedClient && (
        <ClientDrawer
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onStatusChange={updateStatus}
        />
      )}

      {/* TOAST */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-sm bg-[#0f1f3d] px-5 py-3.5 shadow-2xl border-l-4 border-[#b89a5a]">
          <CheckCircle2 size={15} className="text-[#d4b87a]" />
          <span className="text-[12px] font-medium text-white">{notification}</span>
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.25s ease-out; }
      `}</style>
    </div>
  );
}