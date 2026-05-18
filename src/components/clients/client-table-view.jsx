"use client";

import React from "react";
import { Mail, Phone, MapPin, Eye } from "lucide-react";

// ── MULTI-LINGUAL TABLE DICTIONARY ──
const tableLocales = {
  fr: {
    headers: ["Client", "Contact", "Emplacement", "Intérêt", "Budget", "Visites", "Dernier Contact", "Statut", ""],
    noMatch: "Aucun client ne correspond à vos critères.",
    dealLabel: "Transaction :",
    viewBtn: "Voir",
    interests: { sale: "À Vendre", rent: "Location", investment: "Investissement" },
    statuses: { prospect: "Prospect", active: "Actif", vip: "VIP", closed: "Clôturé", inactive: "Inactif" }
  },
  en: {
    headers: ["Client", "Contact", "Location", "Interest", "Budget", "Visits", "Last Contact", "Status", ""],
    noMatch: "No clients match your filters.",
    dealLabel: "Deal:",
    viewBtn: "View",
    interests: { sale: "For Sale", rent: "Rental", investment: "Investment" },
    statuses: { prospect: "Prospect", active: "Active", vip: "VIP", closed: "Closed", inactive: "Inactive" }
  },
  ar: {
    headers: ["العميل", "بيانات الاتصال", "الموقع", "الاهتمام", "الميزانية", "الزيارات", "آخر اتصال", "الحالة", ""],
    noMatch: "لا يوجد عملاء يطابقون خيارات التصفية.",
    dealLabel: "قيمة الصفقة:",
    viewBtn: "عرض",
    interests: { sale: "للبيع", rent: "للإيجار", investment: "استثمار" },
    statuses: { prospect: "محتمل", active: "نشط", vip: "VIP", closed: "مغلق", inactive: "غير نشط" }
  }
};

export default function ClientTableView({ 
  filtered = [], 
  statusConfig, 
  interestConfig, 
  fmt, 
  setSelectedClient,
  currentLang = "fr" // Defaults cleanly to French fallback context
}) {
  const t = tableLocales[currentLang] || tableLocales.fr;
  const isRTL = currentLang === "ar";

  return (
    <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#f0ede8] bg-[#faf9f7]">
              {t.headers.map((h, index) => (
                <th 
                  key={index} 
                  className={`px-5 py-3 text-[9px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap ${
                    index === 8 ? "text-end" : "text-start"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f7f5f2]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-5 py-16 text-center text-gray-400 text-sm">
                  {t.noMatch}
                </td>
              </tr>
            ) : (
              filtered.map((c) => {
                const cfg = statusConfig[c.status] || { label: c.status, color: "text-gray-400", bg: "bg-gray-100", dot: "bg-gray-300" };
                const int = interestConfig[c.interest] || { label: c.interest, color: "bg-gray-100 text-gray-600" };
                
                return (
                  <tr
                    key={c.id}
                    className="hover:bg-[#faf9f7] transition-colors cursor-pointer"
                    onClick={() => setSelectedClient(c)}
                  >
                    {/* Identity Profile Badge */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#0f1f3d] flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-bold text-[#d4b87a]">{c.avatar}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[12px] font-medium whitespace-nowrap truncate">{c.name}</p>
                          <p className="text-[10px] text-gray-400 font-mono">{c.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact Details Grid */}
                    <td className="px-5 py-3.5">
                      <p className="text-[11px] text-gray-600 flex items-center gap-1.5">
                        <Mail size={9} className="text-[#b89a5a] flex-shrink-0" /> 
                        <span className="truncate max-w-[160px]">{c.email}</span>
                      </p>
                      <p className="text-[11px] text-gray-600 flex items-center gap-1.5 mt-0.5">
                        <Phone size={9} className="text-[#b89a5a] flex-shrink-0" /> 
                        <span dir="ltr" className={isRTL ? "text-right" : ""}>{c.phone}</span>
                      </p>
                    </td>

                    {/* Location Markers */}
                    <td className="px-5 py-3.5">
                      <p className="text-[12px] text-gray-600 flex items-center gap-1 whitespace-nowrap">
                        <MapPin size={9} className="text-[#b89a5a] flex-shrink-0" /> {c.location}
                      </p>
                    </td>

                    {/* Localized Interest Badges */}
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${int.color} whitespace-nowrap`}>
                        {t.interests[c.interest] || int.label}
                      </span>
                    </td>

                    {/* Finances budgeting metrics */}
                    <td className="px-5 py-3.5">
                      <p className="text-[12px] font-medium whitespace-nowrap" dir="ltr">{c.budget}</p>
                      {c.dealValue && (
                        <p className="text-[10px] text-[#b89a5a] font-medium whitespace-nowrap">
                          {t.dealLabel} <span dir="ltr">{c.dealValue}</span>
                        </p>
                      )}
                    </td>

                    {/* Visits Metrics Totals */}
                    <td className="px-5 py-3.5 text-center">
                      <span className="font-serif text-lg text-[#0f1f3d] block">{c.totalVisits}</span>
                    </td>

                    {/* Contextual Last Contact Logs */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <p className="text-[12px] text-gray-500">{fmt(c.lastContact)}</p>
                    </td>

                    {/* Localized Status Badge Rows */}
                    <td className="px-5 py-3.5">
                      <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap ${cfg.bg} ${cfg.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                        {t.statuses[c.status] || cfg.label}
                      </div>
                    </td>

                    {/* Administrative View Portal Operations Trigger */}
                    <td className="px-5 py-3.5">
                      <div className={`flex ${isRTL ? "justify-start" : "justify-end"}`}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedClient(c);
                          }}
                          className="flex items-center gap-1 rounded-sm border border-[#e2ddd6] px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:border-[#b89a5a] hover:text-[#b89a5a] transition-colors whitespace-nowrap"
                        >
                          <Eye size={10} /> {t.viewBtn}
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}