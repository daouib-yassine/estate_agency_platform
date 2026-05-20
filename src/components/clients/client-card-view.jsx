"use client";

import React from "react";
import { Mail, MapPin, DollarSign } from "lucide-react";

// ── MULTI-LINGUAL CARDS DICTIONARY ──
const cardLocales = {
  fr: {
    noMatch: "Aucun client ne correspond à vos critères.",
    visitsSuffix: "visites",
    dealLabel: "Transaction",
    interests: { sale: "À Vendre", rent: "Location", investment: "Investissement" },
    statuses: { prospect: "Prospect", active: "Actif", vip: "VIP", closed: "Clôturé", inactive: "Inactif" }
  },
  en: {
    noMatch: "No clients match your filters.",
    visitsSuffix: "visits",
    dealLabel: "Deal",
    interests: { sale: "For Sale", rent: "Rental", investment: "Investment" },
    statuses: { prospect: "Prospect", active: "Active", vip: "VIP", closed: "Closed", inactive: "Inactive" }
  },
  ar: {
    noMatch: "لا يوجد عملاء يطابقون خيارات التصفية.",
    visitsSuffix: "زيارات",
    dealLabel: "صفقة",
    interests: { sale: "للبيع", rent: "للإيجار", investment: "استثمار" },
    statuses: { prospect: "محتمل", active: "نشط", vip: "VIP", closed: "مغلق", inactive: "غير نشط" }
  }
};

export default function ClientCardView({
  filtered = [],
  statusConfig,
  interestConfig,
  setSelectedClient,
  currentLang = "fr"
}) {
  const t = cardLocales[currentLang] || cardLocales.fr;
  const isRTL = currentLang === "ar";

  if (filtered.length === 0) {
    return (
      <div 
        dir={isRTL ? "rtl" : "ltr"} 
        className="w-full text-center py-16 text-gray-400 text-sm rounded-sm border border-dashed border-[#e2ddd6] bg-white px-4"
      >
        {t.noMatch}
      </div>
    );
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((c) => {
        const cfg = statusConfig[c.status] || { label: c.status, color: "text-gray-400", bg: "bg-gray-100", dot: "bg-gray-300" };
        const int = interestConfig[c.interest] || { label: c.interest, color: "bg-gray-100 text-gray-600" };

        return (
          <div
            key={c.id}
            onClick={() => setSelectedClient(c)}
            className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm p-5 cursor-pointer hover:shadow-md hover:border-[#b89a5a] transition-all group relative overflow-hidden flex flex-col justify-between"
          >
            {/* 🌟 AUDITED: Swapped absolute position to logical inline start (start-0) */}
            <div className={`absolute top-0 h-full w-1 ${cfg.dot} start-0`} />

            {/* 🌟 AUDITED: Swapped 'pl-2/pr-2' to logical padding inline start (ps-2) */}
            <div className="ps-2">
              
              {/* Profile Card Header */}
              <div className="flex items-start justify-between mb-4 gap-2">
                <div className="flex items-center gap-3 truncate">
                  <div className="h-10 w-10 rounded-full bg-[#0f1f3d] flex items-center justify-center flex-shrink-0">
                    <span className="font-serif text-sm text-[#d4b87a]">{c.avatar}</span>
                  </div>
                  <div className="truncate">
                    <p className="text-[13px] font-medium text-[#0f1f3d] truncate leading-tight">{c.name}</p>
                    {/* 🌟 AUDITED: Replaced conditional right/left check with logical 'text-start' */}
                    <p dir="ltr" className="text-[10px] text-gray-400 font-mono mt-0.5 text-start">{c.id}</p>
                  </div>
                </div>

                {/* Pipeline Status Pill */}
                <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-widest shrink-0 ${cfg.bg} ${cfg.color}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                  <span>{t.statuses[c.status] || cfg.label}</span>
                </div>
              </div>

              {/* Core Attributes Panel Layout */}
              <div className="space-y-1.5 mb-4">
                <p className="text-[11px] text-gray-500 flex items-center gap-1.5 break-all">
                  <Mail size={9} className="text-[#b89a5a] flex-shrink-0" />
                  <span dir="ltr">{c.email}</span>
                </p>
                <p className="text-[11px] text-gray-500 flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  <MapPin size={9} className="text-[#b89a5a] flex-shrink-0" />
                  <span>{c.location}</span>
                </p>
                <p className="text-[11px] text-gray-500 flex items-center gap-1.5">
                  <DollarSign size={9} className="text-[#b89a5a] flex-shrink-0" />
                  <span dir="ltr">{c.budget}</span>
                </p>
              </div>
            </div>

            {/* Bottom Target Parameters */}
            {/* 🌟 AUDITED: Swapped physical layout check to logical inline start padding (ps-2) */}
            <div className="pt-3 border-t border-[#f0ede8] ps-2">
              <div className="flex items-center justify-between gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${int.color} whitespace-nowrap`}>
                  {t.interests[c.interest] || int.label}
                </span>
                <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap flex items-center gap-1">
                  <span dir="ltr">{c.totalVisits}</span>
                  <span>{t.visitsSuffix}</span>
                </span>
              </div>

              {/* Conditional Deal Metric Panel */}
              {c.dealValue && (
                <div className="mt-3 rounded-sm bg-[#faf9f7] border border-[#e2ddd6] px-3 py-1.5 flex items-center justify-between gap-2">
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold whitespace-nowrap">
                    {t.dealLabel}
                  </span>
                  <span className="text-[11px] font-bold text-[#b89a5a]" dir="ltr">
                    {c.dealValue}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}