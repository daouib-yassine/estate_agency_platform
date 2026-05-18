"use client";

import React, { useState, useMemo } from "react";
import {
  Search, Bell, Plus, Filter, Users, Star, UserCheck, 
  Eye, CheckCircle2, X, TrendingUp, Globe
} from "lucide-react";

// Sub-component view imports
import ClientTableView from "@/components/clients/client-table-view";
import ClientCardView from "@/components/clients/client-card-view";
import ClientDetailDrawer from "@/components/clients/client-detail-drawer";

/* ─────────────────────────────────────────────────────────────
   STATIC APP CONFIGURATIONS & INITIAL MOCK DATA
───────────────────────────────────────────────────────────── */
const statusConfig = {
  prospect: { label: "Prospect", color: "text-blue-600", bg: "bg-blue-50 border-blue-100", dot: "bg-blue-500" },
  active: { label: "Active", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100", dot: "bg-emerald-500" },
  vip: { label: "VIP", color: "text-amber-600", bg: "bg-amber-50 border-amber-100", dot: "bg-amber-500" },
  closed: { label: "Closed", color: "text-[#b89a5a]", bg: "bg-[#faf9f7] border-[#e2ddd6]", dot: "bg-[#b89a5a]" },
  inactive: { label: "Inactive", color: "text-gray-500", bg: "bg-gray-50 border-gray-100", dot: "bg-gray-400" },
};

const interestConfig = {
  sale: { label: "For Sale", color: "bg-[#0f1f3d] text-white" },
  rent: { label: "Rental", color: "bg-[#b89a5a]/10 text-[#b89a5a]" },
  investment: { label: "Investment", color: "bg-purple-50 text-purple-700" },
};

const initialClients = [
  { id: "CLT-001", name: "Yassine Daouib", email: "yassine@example.com", phone: "+212 600-000000", location: "Tangier, Morocco", interest: "sale", assetType: "appartement", buildingName: "Résidence Al Mansour", budget: "2,400,000 DH", dealValue: "2,350,000 DH", totalVisits: 4, lastContact: "2026-05-15", status: "vip", avatar: "YD" },
  { id: "CLT-002", name: "Amine El Amrani", email: "amine@example.com", phone: "+212 611-111111", location: "Casablanca, Morocco", interest: "rent", assetType: "appartement", buildingName: "Palais Doré", budget: "12,000 DH/mo", dealValue: null, totalVisits: 2, lastContact: "2026-05-17", status: "active", avatar: "AE" },
  { id: "CLT-003", name: "Sofia Benjelloun", email: "sofia@example.com", phone: "+212 622-222222", location: "Marrakech, Morocco", interest: "investment", assetType: "terrain", buildingName: "TOUS", budget: "5,000,000 DH", dealValue: "4,800,000 DH", totalVisits: 7, lastContact: "2026-05-10", status: "closed", avatar: "SB" },
  { id: "CLT-004", name: "Karim Tazi", email: "karim@example.com", phone: "+212 633-333333", location: "Rabat, Morocco", interest: "sale", assetType: "villa", buildingName: "TOUS", budget: "8,500,000 DH", dealValue: null, totalVisits: 1, lastContact: "2026-05-18", status: "prospect", avatar: "KT" },
];

// ── MULTI-LINGUAL UI DICTIONARY ──
const clientLocales = {
  fr: {
    dir: 'ltr',
    searchPlaceholder: 'Rechercher des clients, emails, emplacements...',
    addClient: 'Ajouter un Client',
    pageTitle: 'Gestion des Clients',
    pageSubtitle: 'Suivez, gérez et nourrissez vos relations clients.',
    viewTable: 'Tableau',
    viewCards: 'Cartes',
    filterLabel: 'Filtrer :',
    clearBtn: 'Effacer',
    foundCount: 'clients trouvés',
    allTypes: 'Tous les types',
    allBuildings: 'Tous les immeubles',
    allInterests: 'Tous les intérêts',
    notifUpdated: 'Statut du client mis à jour à',
    kpis: { total: 'Total Clients', vip: 'Clients VIP', active: 'Actifs', prospects: 'Prospects', closed: 'Transactions Closes' },
    interests: { sale: 'À Vendre', rent: 'Location', investment: 'Investissement' },
    statuses: { TOUS: 'TOUS', prospect: 'Prospect', active: 'Actif', vip: 'VIP', closed: 'Clôturé', inactive: 'Inactif' }
  },
  en: {
    dir: 'ltr',
    searchPlaceholder: 'Search clients, emails, locations...',
    addClient: 'Add Client',
    pageTitle: 'Client Management',
    pageSubtitle: 'Track, manage and nurture your client relationships.',
    viewTable: 'Table',
    viewCards: 'Cards',
    filterLabel: 'Filter:',
    clearBtn: 'Clear',
    foundCount: 'clients found',
    allTypes: 'All Types',
    allBuildings: 'All Buildings',
    allInterests: 'All Interests',
    notifUpdated: 'Client status updated to',
    kpis: { total: 'Total Clients', vip: 'VIP Clients', active: 'Active', prospects: 'Prospects', closed: 'Closed Deals' },
    interests: { sale: 'For Sale', rent: 'Rental', investment: 'Investment' },
    statuses: { TOUS: 'ALL', prospect: 'Prospect', active: 'Active', vip: 'VIP', closed: 'Closed', inactive: 'Inactive' }
  },
  ar: {
    dir: 'rtl',
    searchPlaceholder: 'ابحث عن العملاء، البريد الإلكتروني، المواقع...',
    addClient: 'إضافة عميل',
    pageTitle: 'إدارة العملاء',
    pageSubtitle: 'تتبع وإدارة وتطوير علاقاتك مع العملاء.',
    viewTable: 'جدول',
    viewCards: 'بطاقات',
    filterLabel: 'تصفية:',
    clearBtn: 'مسح التصفية',
    foundCount: 'عملاء تم العثور عليهم',
    allTypes: 'جميع الأنواع',
    allBuildings: 'جميع العقارات/المباني',
    allInterests: 'جميع الاهتمامات',
    notifUpdated: 'تم تحديث حالة العميل إلى',
    kpis: { total: 'إجمالي العملاء', vip: 'عملاء VIP', active: 'نشط', prospects: 'محتمل', closed: 'الصفقات المغلقة' },
    interests: { sale: 'للبيع', rent: 'للإيجار', investment: 'استثمار' },
    statuses: { TOUS: 'الكل', prospect: 'محتمل', active: 'نشط', vip: 'VIP', closed: 'مغلق', inactive: 'غير نشط' }
  }
};

const assetTypes = {
  fr: [
    { value: "TOUS", label: "Tous les types" },
    { value: "appartement", label: "Appartement" },
    { value: "terrain", label: "Terrain" },
    { value: "villa", label: "Villa" },
  ],
  en: [
    { value: "TOUS", label: "All Types" },
    { value: "appartement", label: "Apartment" },
    { value: "terrain", label: "Land / Terrain" },
    { value: "villa", label: "Villa" },
  ],
  ar: [
    { value: "TOUS", label: "جميع الأنواع" },
    { value: "appartement", label: "شقة" },
    { value: "terrain", label: "أرض" },
    { value: "villa", label: "فيلا" },
  ]
};

const buildingNames = ["TOUS", "Résidence Al Mansour", "Palais Doré", "Les Jardins de l'Atlas"];
const statuses = ["TOUS", "prospect", "active", "vip", "closed", "inactive"];

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT CONTEXT ENTRY POINT
───────────────────────────────────────────────────────────── */
export default function ClientDashboard() {
  // --- Internationalization Configuration State ---
  const [lang, setLang] = useState('fr'); 
  const t = clientLocales[lang];
  const isRTL = t.dir === 'rtl';

  // --- Core State Logic ---
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("TOUS");
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
    showNotif(`${t.notifUpdated} ${t.statuses[status] || status}`);
  };

  // Humanize Timestamp Format Helper Function
  const fmt = (dateStr) => {
    if (!dateStr) return "N/A";
    const dateLocale = lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US';
    return new Date(dateStr).toLocaleDateString(dateLocale, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Core Reactive Filter Engine Matrix
  const filtered = useMemo(() => {
    return clients.filter(c => {
      const matchSearch = search === "" || 
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) || 
        c.location.toLowerCase().includes(search.toLowerCase());
        
      const matchStatus = filterStatus === "TOUS" || c.status === filterStatus;
      const matchInterest = filterInterest === "TOUS" || c.interest === filterInterest;
      const matchAssetType = filterAssetType === "TOUS" || c.assetType === filterAssetType;
      const matchBuilding = filterBuilding === "TOUS" || c.buildingName === filterBuilding;
      
      return matchSearch && matchStatus && matchInterest && matchAssetType && matchBuilding;
    });
  }, [clients, search, filterStatus, filterInterest, filterAssetType, filterBuilding]);

  // Real-Time Analytics Counters
  const totalClients = clients.length;
  const vipCount = clients.filter(c => c.status === "vip").length;
  const activeCount = clients.filter(c => c.status === "active").length;
  const closedCount = clients.filter(c => c.status === "closed").length;
  const prospectCount = clients.filter(c => c.status === "prospect").length;
  const pendingBell = clients.filter(c => c.status === "prospect" || c.status === "inactive").length;

  return (
    <div dir={t.dir} className="flex h-screen w-full bg-[#f0ede8] font-sans text-[#0f1f3d] overflow-hidden transition-all duration-300">
      
      {/* VIEWPORT CONTENT BODY CONTROLLER wrapper */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Global Architecture Topbar Header */}
        <header className="flex items-center justify-between border-b border-[#e2ddd6] bg-white px-6 py-3.5 flex-shrink-0">
          <div className="flex items-center gap-3">
            
            {/* Highly Polished Premium Input Box (Matches Screenshot Precisely) */}
            <div className="relative">
              <Search size={15} className={`absolute top-1/2 -translate-y-1/2 text-gray-400 stroke-[1.5] ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-72 rounded-sm border border-gray-200/80 bg-[#f8f6f3] py-2 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] transition-all placeholder:text-gray-400 font-sans ${isRTL ? 'pr-9 pl-4' : 'pl-9 pr-4'}`}
              />
            </div>

          </div>
          <div className="flex items-center gap-4">
            
            {/* Global Language HUD Selector Dropdown Box */}
            <div className="relative flex items-center gap-1.5 bg-[#f7f6f3] border border-gray-200 rounded-sm px-2.5 py-1.5">
              <Globe size={13} className="text-[#b89a5a]" />
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-[11px] font-bold uppercase outline-none cursor-pointer text-[#0f1f3d]"
              >
                <option value="fr">FR</option>
                <option value="en">EN</option>
                <option value="ar">AR</option>
              </select>
            </div>

            <span className="text-[11px] text-gray-400 hidden md:inline">
              {new Date().toLocaleDateString(lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US', { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </span>
            <div className="relative">
              <button className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#f7f6f3] border border-gray-200 text-gray-500 hover:border-[#b89a5a] transition-colors">
                <Bell size={14} />
                {pendingBell > 0 && (
                  <span className={`absolute -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#b89a5a] text-[8px] font-bold text-white ${isRTL ? '-left-0.5' : '-right-0.5'}`}>
                    {pendingBell}
                  </span>
                )}
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors">
              <Plus size={12} /> {t.addClient}
            </button>
          </div>
        </header>

        {/* Interactive Main Board Workspace */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Context Title & Display Controls */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-normal text-[#0f1f3d] ${lang === 'ar' ? 'font-sans font-bold' : 'font-serif'}`}>{t.pageTitle}</h1>
              <p className="mt-0.5 text-[12px] text-gray-500">{t.pageSubtitle}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 rounded-sm border text-[10px] font-bold uppercase tracking-widest transition-all ${
                  viewMode === "table" ? "bg-[#0f1f3d] text-white border-[#0f1f3d]" : "border-[#e2ddd6] text-gray-400 hover:border-[#0f1f3d]"
                }`}
              >
                {t.viewTable}
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`px-3 py-1.5 rounded-sm border text-[10px] font-bold uppercase tracking-widest transition-all ${
                  viewMode === "cards" ? "bg-[#0f1f3d] text-white border-[#0f1f3d]" : "border-[#e2ddd6] text-gray-400 hover:border-[#0f1f3d]"
                }`}
              >
                {t.viewCards}
              </button>
            </div>
          </div>

          {/* Operational Metrics Panel (KPIs) */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {[
              { label: t.kpis.total, val: totalClients, color: "bg-[#0f1f3d]", icon: Users, trend: "Portfolio", up: true },
              { label: t.kpis.vip, val: vipCount, color: "bg-amber-600", icon: Star, trend: "High-value", up: true },
              { label: t.kpis.active, val: activeCount, color: "bg-emerald-700", icon: UserCheck, trend: "Engaged", up: true },
              { label: t.kpis.prospects, val: prospectCount, color: "bg-blue-700", icon: Eye, trend: "In pipeline", up: true },
              { label: t.kpis.closed, val: closedCount, color: "bg-[#b89a5a]", icon: CheckCircle2, trend: "This period", up: true },
            ].map(({ label, val, color, icon: Icon, trend, up }) => (
              <div key={label} className="rounded-sm bg-white border border-[#e2ddd6] p-5 shadow-sm relative overflow-hidden">
                <div className={`absolute top-0 w-1 h-full ${color} ${isRTL ? 'right-0' : 'left-0'}`} />
                <div className="flex items-start justify-between mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
                  <div className={`flex h-7 w-7 items-center justify-center rounded-sm ${color} opacity-90`}>
                    <Icon size={12} className="text-white" />
                  </div>
                </div>
                <div className="font-serif text-4xl text-[#0f1f3d]">{val}</div>
                <div className={`mt-2 flex items-center gap-1 text-[10px] font-medium ${up ? "text-emerald-600" : "text-amber-600"}`}>
                  <TrendingUp size={10} className={isRTL ? "transform scale-x-[-1]" : ""} /> {trend}
                </div>
              </div>
            ))}
          </div>

          {/* Multi-Dimensional Filter Control Hub */}
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <Filter size={10} /> {t.filterLabel}
            </div>

            {/* Status Segment Filtering Pills */}
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
                    {t.statuses[s]}
                  </button>
                );
              })}
            </div>

            <div className={`w-px h-4 bg-[#e2ddd6] hidden sm:block`} />

            {/* Asset Type Dropdown Component */}
            <select
              value={filterAssetType}
              onChange={e => {
                setFilterAssetType(e.target.value);
                setFilterBuilding("TOUS"); 
              }}
              className="rounded-sm border border-[#e2ddd6] bg-white px-3 py-1.5 text-[11px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] cursor-pointer"
            >
              {assetTypes[lang].map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Contextual Building Selector Dropdown */}
            {(filterAssetType === "appartement" || filterBuilding !== "TOUS") && (
              <select
                value={filterBuilding}
                onChange={e => setFilterBuilding(e.target.value)}
                className="rounded-sm border border-[#e2ddd6] bg-white px-3 py-1.5 text-[11px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] cursor-pointer"
              >
                {buildingNames.map(name => (
                  <option key={name} value={name}>
                    {name === "TOUS" ? t.allBuildings : name}
                  </option>
                ))}
              </select>
            )}

            {/* Deal Intent Pipeline Selector */}
            <select
              value={filterInterest}
              onChange={e => setFilterInterest(e.target.value)}
              className="rounded-sm border border-[#e2ddd6] bg-white px-3 py-1.5 text-[11px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] cursor-pointer"
            >
              <option value="TOUS">{t.allInterests}</option>
              <option value="sale">{t.interests.sale}</option>
              <option value="rent">{t.interests.rent}</option>
              <option value="investment">{t.interests.investment}</option>
            </select>

            {/* Current Matching Counter Indicator */}
            <span className={`text-[11px] text-gray-400 font-medium ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
              {filtered.length} {t.foundCount}
            </span>

            {/* Hard Reset Application Trigger */}
            {(search || filterStatus !== "TOUS" || filterInterest !== "TOUS" || filterAssetType !== "TOUS" || filterBuilding !== "TOUS") && (
              <button
                onClick={() => { 
                  setSearch(""); 
                  setFilterStatus("TOUS"); 
                  setFilterInterest("TOUS"); 
                  setFilterAssetType("TOUS"); 
                  setFilterBuilding("TOUS"); 
                }}
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-700 transition-colors"
              >
                <X size={10} /> {t.clearBtn}
              </button>
            )}
          </div>

          {/* Conditional Sub-View Mounting Layer */}
          {viewMode === "table" ? (
            <ClientTableView
              filtered={filtered}
              statusConfig={statusConfig}
              interestConfig={interestConfig}
              fmt={fmt}
              setSelectedClient={setSelectedClient}
              currentLang={lang}
            />
          ) : (
            <ClientCardView
              filtered={filtered}
              statusConfig={statusConfig}
              interestConfig={interestConfig}
              setSelectedClient={setSelectedClient}
              currentLang={lang}
            />
          )}

        </main>
      </div>

      {/* FIXED GLOBAL PORTAL OVERLAYS (Drawer & Toast Contexts) */}
      {selectedClient && (
        <ClientDetailDrawer
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onStatusChange={updateStatus}
          currentLang={lang}
        />
      )}

      {/* Global Toast Alert Layer */}
      {notification && (
        <div className={`fixed bottom-6 z-50 flex items-center gap-3 rounded-sm bg-[#0f1f3d] px-5 py-3.5 shadow-2xl border-y-0 border-r-0 border-l-4 border-[#b89a5a] animate-slide-in ${isRTL ? 'left-6' : 'right-6'}`}>
          <CheckCircle2 size={15} className="text-[#d4b87a] flex-shrink-0" />
          <span className="text-[12px] font-medium text-white tracking-wide">{notification}</span>
        </div>
      )}

      {/* CSS Layout Injection Block */}
      <style>{`
        @keyframes slide-in {
          from { transform: ${isRTL ? 'translateX(-120%)' : 'translateX(120%)'}; opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.28s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

    </div>
  );
}