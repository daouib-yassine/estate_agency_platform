"use client";

import React, { useState } from 'react';
import { Search, Bell, Plus, CheckCircle2, Globe } from 'lucide-react';
import DashboardView from '@/components/admin/DashboardView';

// --- Multi-lingual UI Dictionary Matrix ---
const dashboardLocales = {
  fr: {
    dir: 'ltr',
    searchPlaceholder: 'Rechercher des annonces, clients, agents...',
    newVisit: 'Nouvelle Visite',
    notifUpdated: 'Statut mis à jour à',
    welcomeBack: 'Tableau de Bord',
    statusLabels: {
      confirmed: 'Confirmé',
      pending: 'En attente'
    }
  },
  en: {
    dir: 'ltr',
    searchPlaceholder: 'Search listings, clients, agents...',
    newVisit: 'New Visit',
    notifUpdated: 'Status updated to',
    welcomeBack: 'Admin Dashboard',
    statusLabels: {
      confirmed: 'Confirmed',
      pending: 'Pending'
    }
  },
  ar: {
    dir: 'rtl',
    searchPlaceholder: 'ابحث عن القوائم، العملاء، والوكلاء...',
    newVisit: 'زيارة جديدة',
    notifUpdated: 'تم تحديث الحالة إلى',
    welcomeBack: 'لوحة التحكم الرئيسية',
    statusLabels: {
      confirmed: 'مؤكد',
      pending: 'قيد الانتظار'
    }
  }
};

// --- Multi-lingual Translation Map for Mock Property Data ---
const PROPERTY_TRANSLATIONS = {
  '1': {
    fr: 'Les Résidences Meridian - Unité 4B',
    en: 'The Meridian Residences - Unit 4B',
    ar: 'مساكن ميريديان - وحدة 4B'
  },
  '2': {
    fr: 'Tour Pinnacle - Étage 12',
    en: 'Pinnacle Tower - Floor 12',
    ar: 'برج بيناكيل - الطابق 12'
  }
};

// Seed raw base data using unique system IDs for properties instead of raw English text
const INITIAL_VISITS = [
  {
    id: '1',
    clientName: 'Sarah Jenkins',
    propertyId: '1', 
    agent: 'Sophia Laurent',
    date: new Date().toISOString().split('T')[0],
    status: 'confirmed',
  },
  {
    id: '2',
    clientName: 'Michael Chen',
    propertyId: '2', 
    agent: 'Marcus Webb',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
  }
];

export default function AdminDashboard() {
  // --- Internationalization Configuration State ---
  const [lang, setLang] = useState('fr'); 
  const t = dashboardLocales[lang];
  const isRTL = t.dir === 'rtl';

  // --- Core Workspace States ---
  const [visits, setVisVisits] = useState(INITIAL_VISITS);
  const [notification, setNotification] = useState(null);

  // Derive status counters for dynamic header badges
  const pendingCount = visits.filter(v => v.status === 'pending').length;

  /**
   * Dispatches updates across viewing slots and reads localized label schemas
   */
  const updateStatus = (id, status) => {
    setVisVisits(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    
    // Fallback path checks localized context strings first
    const label = t.statusLabels[status] || status;
    setNotification(`${t.notifUpdated} ${label}`);
    
    setTimeout(() => setNotification(null), 3000);
  };

  // --- INTERCEPT AND MAP LOCALIZED STRINGS ---
  // Transforms propertyId into the localized language target before passing it down
  const translatedVisits = visits.map(visit => ({
    ...visit,
    property: PROPERTY_TRANSLATIONS[visit.propertyId]?.[lang] || visit.propertyId
  }));

  return (
    <div dir={t.dir} className="flex h-full w-full bg-[#f0ede8] font-sans text-[#0f1f3d] overflow-hidden transition-all duration-300">
      
      {/* Primary Workspace View Structure */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* Workspace Operations Action Header */}
        <header className="flex items-center justify-between border-b border-[#e2ddd6] bg-white px-6 py-3.5 flex-shrink-0">
          
          {/* Search Box Input Wrapper */}
          <div className="relative">
            <Search size={14} className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              className={`rounded-sm border border-gray-200 bg-[#f7f6f3] py-2 text-[12px] outline-none focus:border-[#b89a5a] w-64 transition-colors placeholder:text-gray-400 ${isRTL ? 'pr-9 pl-4' : 'pl-9 pr-4'}`} 
            />
          </div>
          
          <div className="flex items-center gap-4">
            
            {/* Global Language HUD Selector Control Box */}
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

            {/* Live Contextual Calendar Component */}
            <span className="text-[11px] text-gray-400 hidden md:inline">
              {new Date().toLocaleDateString(lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            
            {/* Notification Badge Bell */}
            <button className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#f7f6f3] border border-gray-200 hover:border-[#b89a5a]/40 transition-colors text-[#0f1f3d]">
              <Bell size={14} />
              {pendingCount > 0 && (
                <span className={`absolute -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#b89a5a] text-[8px] font-bold text-white tracking-tighter ${isRTL ? '-left-0.5' : '-right-0.5'}`}>
                  {pendingCount}
                </span>
              )}
            </button>
            
            <button className="flex items-center gap-2 rounded-sm bg-[#0f1f3d] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors shadow-sm">
              <Plus size={12} /> {t.newVisit}
            </button>
          </div>
        </header>

        {/* Scrollable Agency Metrics Dashboard Panel */}
        <main className="flex-1 overflow-y-auto">
          {/* Passing translatedVisits dynamic content downward instead of INITIAL_VISITS */}
          <DashboardView visits={translatedVisits} updateStatus={updateStatus} currentLang={lang} />
        </main>
      </div>

      {/* Persistent Notification Layer */}
      {notification && (
        <div className={`fixed bottom-6 z-50 flex items-center gap-3 rounded-sm bg-[#0f1f3d] px-5 py-3.5 shadow-2xl border-y-0 border-r-0 border-l-4 border-[#b89a5a] animate-in fade-in slide-in-from-bottom-4 duration-200 ${isRTL ? 'left-6' : 'right-6'}`}>
          <CheckCircle2 size={15} className="text-[#d4b87a]" />
          <span className="text-[12px] font-medium text-white tracking-wide">{notification}</span>
        </div>
      )}
      
    </div>
  );
}