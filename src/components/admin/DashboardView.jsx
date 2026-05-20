"use client";

import React from 'react';
import { Calendar, UserCheck, Clock, Star, Check } from 'lucide-react';

// --- Extended Translation Matrix ---
const viewLocales = {
  fr: {
    client: 'Client',
    property: 'Propriété',
    agent: 'Agent',
    status: 'Statut',
    actions: 'Actions',
    confirmed: 'Confirmé',
    pending: 'En attente',
    cancelled: 'Annulé',
    // KPIs Labels
    kpiToday: "Visites d'aujourd'hui",
    kpiConfirmed: "Confirmé",
    kpiPending: "En attente",
    kpiClosed: "Ventes Clôturées",
    // KPIs Trends
    trendToday: "+2 vs hier",
    trendConfirmed: "Sessions actives",
    trendPending: "Action requise",
    trendClosed: "Ce mois-ci"
  },
  en: {
    client: 'Client',
    property: 'Property',
    agent: 'Agent',
    status: 'Status',
    actions: 'Actions',
    confirmed: 'Confirmed',
    pending: 'Pending',
    cancelled: 'Cancelled',
    // KPIs Labels
    kpiToday: "Today's Visits",
    kpiConfirmed: "Confirmed",
    kpiPending: "Pending",
    kpiClosed: "Deals Closed",
    // KPIs Trends
    trendToday: "+2 vs yesterday",
    trendConfirmed: "Active sessions",
    trendPending: "Needs action",
    trendClosed: "This month"
  },
  ar: {
    client: 'العميل',
    property: 'العقار',
    agent: 'الوكيل',
    status: 'الحالة',
    actions: 'إجراءات',
    confirmed: 'مؤكد',
    pending: 'قيد الانتظار',
    cancelled: 'ملغي',
    // KPIs Labels
    kpiToday: "زيارات اليوم",
    kpiConfirmed: "المؤكدة",
    kpiPending: "قيد الانتظار",
    kpiClosed: "الصفقات المغلقة",
    // KPIs Trends
    trendToday: "+2 مقارنة بالأمس",
    trendConfirmed: "الجلسات النشطة",
    trendPending: "يتطلب اتخاذ إجراء",
    trendClosed: "هذا الشهر"
  }
};

const DashboardView = ({ visits = [], updateStatus, currentLang = 'fr' }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayVisits = visits.filter(v => v.date === today);
  const t = viewLocales[currentLang];
  const isRTL = currentLang === 'ar';
  
  // Dynamic KPIs definition matching localized system tags
  const kpis = [
    { 
      label: t.kpiToday, 
      val: todayVisits.length, 
      icon: Calendar, 
      trend: t.trendToday, 
      color: 'bg-[#0f1f3d]' 
    },
    { 
      label: t.kpiConfirmed, 
      val: visits.filter(v => v.status === 'confirmed').length, 
      icon: UserCheck, 
      trend: t.trendConfirmed, 
      color: 'bg-emerald-700' 
    },
    { 
      label: t.kpiPending, 
      val: visits.filter(v => v.status === 'pending').length, 
      icon: Clock, 
      trend: t.trendPending, 
      color: 'bg-amber-600' 
    },
    { 
      label: t.kpiClosed, 
      val: visits.filter(v => v.status === 'completed').length, 
      icon: Star, 
      trend: t.trendClosed, 
      color: 'bg-[#b89a5a]' 
    },
  ];

  return (  
    <div className="p-6 space-y-6">
      
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ label, val, icon: Icon, trend, color }) => (
          <div key={label} className="relative overflow-hidden rounded-sm border border-[#e2ddd6] bg-white p-5 shadow-sm">
            {/* Mirror accent color layouts beautifully depending on script rules */}
            <div className={`absolute top-0 h-full w-1 ${color} ${isRTL ? 'right-0' : 'left-0'}`} />
            
            <div className="mb-3 flex items-start justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
              <div className={`flex h-8 w-8 items-center justify-center rounded-sm ${color}`}>
                <Icon size={14} className="text-white" />
              </div>
            </div>
            
            <div className={`font-serif text-4xl text-[#0f1f3d] ${isRTL ? 'font-sans font-bold' : ''}`}>
              {val}
            </div>
            <div className="mt-2 text-[10px] font-medium text-emerald-600">{trend}</div>
          </div>
        ))}
      </div>

      {/* Recent Property Showings Table */}
      <div className="overflow-x-auto bg-white rounded-sm border border-[#e2ddd6] shadow-sm">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-[#f7f6f3] border-b border-[#e2ddd6] text-gray-400 font-bold uppercase text-[10px] tracking-wider">
              <th className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>{t.client}</th>
              <th className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>{t.property}</th>
              <th className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>{t.agent}</th>
              <th className={`p-4 ${isRTL ? 'text-right' : 'text-left'}`}>{t.status}</th>
              <th className={`p-4 ${isRTL ? 'text-left' : 'text-right'}`}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr key={visit.id} className="border-b border-[#e2ddd6] hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-[#0f1f3d]">{visit.clientName}</td>
                <td className="p-4 text-gray-500">{visit.property}</td>
                <td className="p-4 text-gray-500">{visit.agent}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                    visit.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {t[visit.status] || visit.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className={`flex items-center gap-2 ${isRTL ? 'justify-start' : 'justify-end'}`}>
                    <button 
                      onClick={() => updateStatus(visit.id, 'confirmed')}
                      className="p-1 rounded-sm text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <Check size={16} />
                    </button>
                    <button 
                      onClick={() => updateStatus(visit.id, 'pending')}
                      className="p-1 rounded-sm text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                    >
                      <Clock size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DashboardView;