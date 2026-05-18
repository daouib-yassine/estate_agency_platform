"use client";

import React, { useState, useMemo } from 'react';
import {
  Home, Search, Bell, Plus, ChevronDown, Grid3X3, List,
  SlidersHorizontal, Tag, Building2, Award, TrendingUp, CheckCircle2, Globe
} from 'lucide-react';

import { initialProperties, projects } from "@/constants/properties";
import { locales } from "@/constants/locales";
import PropertyCardView from "@/components/properties/property-card-view";
import PropertyTableView from "@/components/properties/property-table-view";

export default function PropertiesDashboard() {
  // --- Internationalization State ---
  const [lang, setLang] = useState('fr'); // Default language toggle ('en' | 'fr' | 'ar')
  const t = locales[lang]; // Shortcut pointer to active translation dictionary
  const isRTL = t.dir === 'rtl';

  // --- UI Layout and Filter States ---
  const [viewMode, setViewMode] = useState('card');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [notification, setNotification] = useState(null);

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // --- Client-side Filter Pipeline ---
  const filtered = useMemo(() => {
    return initialProperties.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !q || 
        p.title.toLowerCase().includes(q) || 
        p.location.toLowerCase().includes(q) || 
        p.ref.toLowerCase().includes(q) || 
        p.city.toLowerCase().includes(q);
      
      const matchType   = typeFilter === 'all' || p.type === typeFilter;
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchProj   = projectFilter === 'All Projects' || p.project === projectFilter;
      
      return matchSearch && matchType && matchStatus && matchProj;
    });
  }, [search, typeFilter, statusFilter, projectFilter]);

  const totalCount    = initialProperties.length;
  const forSaleCount  = initialProperties.filter(p => !p.forRent && p.status !== 'sold').length;
  const rentalCount   = initialProperties.filter(p => p.forRent).length;
  const vipCount      = initialProperties.filter(p => p.isVIP).length;

  return (
    // Dynamic 'dir' injection maps standard CSS rendering blocks for layout reversal
    <div dir={t.dir} className="flex h-screen bg-[#f0ede8] font-sans text-[#0f1f3d] overflow-hidden transition-all duration-200">
      
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* --- Top Bar Navigation Bar --- */}
        <header className="flex items-center justify-between border-b border-[#e2ddd6] bg-white px-6 py-3.5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Dynamic padding alignment matches right-to-left orientation layout specs */}
              <Search size={14} className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className={`rounded-sm border border-gray-200 bg-[#f7f6f3] py-2 text-[12px] outline-none focus:border-[#b89a5a] w-64 transition-colors placeholder:text-gray-400 ${isRTL ? 'pr-9 pl-4' : 'pl-9 pr-4'}`}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Multi-language selector dropdown container */}
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

            <span className="text-[11px] text-gray-400 hidden sm:inline">
              {new Date().toLocaleDateString(lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            
            <button
              onClick={() => showNotif(t.notifAdd)}
              className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors"
            >
              <Plus size={12} /> {t.addProperty}
            </button>
          </div>
        </header>

        {/* --- Scrollable Content View --- */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Heading Module + View Toggle Matrix */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className={`font-serif text-2xl font-normal ${lang === 'ar' ? 'font-sans font-bold' : ''}`}>{t.portfolioTitle}</h1>
              <p className="mt-0.5 text-[12px] text-gray-500">{t.portfolioSub}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('card')}
                className={`flex items-center gap-1.5 rounded-sm border px-3 py-2 text-[11px] font-bold uppercase tracking-widest transition-all ${viewMode === 'card' ? 'bg-[#0f1f3d] border-[#0f1f3d] text-white' : 'border-[#e2ddd6] text-gray-400 hover:border-[#0f1f3d] hover:text-[#0f1f3d]'}`}
              >
                <Grid3X3 size={12} /> {t.cardsView}
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 rounded-sm border px-3 py-2 text-[11px] font-bold uppercase tracking-widest transition-all ${viewMode === 'table' ? 'bg-[#0f1f3d] border-[#0f1f3d] text-white' : 'border-[#e2ddd6] text-gray-400 hover:border-[#0f1f3d] hover:text-[#0f1f3d]'}`}
              >
                <List size={12} /> {t.tableView}
              </button>
            </div>
          </div>

          {/* KPI Dashboard Grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: t.totalProperties, val: totalCount,    icon: Home,      trend: 'Active listings', color: 'bg-[#0f1f3d]' },
              { label: t.forSale,         val: forSaleCount,  icon: Tag,       trend: 'Available now',   color: 'bg-emerald-700' },
              { label: t.rentalUnits,     val: rentalCount,   icon: Building2, trend: 'Long & short term', color: 'bg-[#b89a5a]' },
              { label: t.vipPortfolio,    val: vipCount,      icon: Award,     trend: 'Luxury tier',     color: 'bg-amber-600' },
            ].map(({ label, val, icon: Icon, trend, color }) => (
              <div key={label} className="rounded-sm bg-white border border-[#e2ddd6] p-5 shadow-sm relative overflow-hidden">
                {/* Border-accent positions mirror contextually on RTL directions */}
                <div className={`absolute top-0 w-1 h-full ${color} ${isRTL ? 'right-0' : 'left-0'}`} />
                <div className="flex items-start justify-between mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-sm ${color} opacity-90`}>
                    <Icon size={14} className="text-white" />
                  </div>
                </div>
                <div className="font-serif text-4xl text-[#0f1f3d]">{val}</div>
                <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                  <TrendingUp size={10} className={isRTL ? "transform scale-x-[-1]" : ""} />
                  {trend}
                </div>
              </div>
            ))}
          </div>

          {/* Filter Toolbar Sub-Matrix */}
          <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm px-5 py-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-48">
                <Search size={13} className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t.searchRef}
                  className={`w-full rounded-sm border border-gray-200 bg-[#f7f6f3] py-2 text-[12px] outline-none focus:border-[#b89a5a] transition-colors placeholder:text-gray-400 ${isRTL ? 'pr-9 pl-4' : 'pl-9 pr-4'}`}
                />
              </div>

              {/* Asset Typology Dropdown Selector */}
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value)}
                  className={`appearance-none rounded-sm border border-gray-200 bg-[#f7f6f3] py-2 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] cursor-pointer transition-colors ${isRTL ? 'pl-8 pr-3' : 'pl-3 pr-8'}`}
                >
                  <option value="all">{t.allTypes}</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="land">Land / Terrain</option>
                  <option value="penthouse">Penthouse</option>
                </select>
                <ChevronDown size={11} className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'left-2.5' : 'right-2.5'}`} />
              </div>

              {/* Transaction State Pipeline Dropdown Selector */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className={`appearance-none rounded-sm border border-gray-200 bg-[#f7f6f3] py-2 text-[12px] text-[#0f1f3d] outline-none focus:border-[#b89a5a] cursor-pointer transition-colors ${isRTL ? 'pl-8 pr-3' : 'pl-3 pr-8'}`}
                >
                  <option value="all">{t.allStatuses}</option>
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                </select>
                <ChevronDown size={11} className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'left-2.5' : 'right-2.5'}`} />
              </div>

              {/* Calculated Counter Threshold Item Element */}
              <div className={`flex items-center gap-2 text-[11px] text-gray-400 border-[#e2ddd6] ${isRTL ? 'mr-auto border-r pr-4' : 'ml-auto border-l pl-4'}`}>
                <SlidersHorizontal size={12} className="text-[#b89a5a]" />
                <span className="font-bold text-[#0f1f3d]">{filtered.length}</span>
                <span>{t.foundCount}</span>
              </div>
            </div>
          </div>

          {/* --- Render Conditionals: Card Grid vs Tabular Row list --- */}
          {viewMode === 'card' ? (
            <PropertyCardView properties={filtered} onAction={showNotif} currentLang={lang} />
          ) : (
            <PropertyTableView properties={filtered} onAction={showNotif} currentLang={lang} />
          )}
        </main>
      </div>

      {/* --- Notification Toast System --- */}
      {notification && (
        <div className={`fixed bottom-6 z-50 flex items-center gap-3 rounded-sm bg-[#0f1f3d] px-5 py-3.5 shadow-2xl border-y-0 border-r-0 border-l-4 border-[#b89a5a] ${isRTL ? 'left-6' : 'right-6'}`}>
          <CheckCircle2 size={15} className="text-[#d4b87a]" />
          <span className="text-[12px] font-medium text-white">{notification}</span>
        </div>
      )}
    </div>
  );
}