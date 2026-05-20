"use client";

import React from "react";
import { Mail, Phone, MapPin, Eye, FileText, Wallet } from "lucide-react";

// ── MULTI-LINGUAL TABLE DICTIONARY ──
const tableLocales = {
  fr: {
    headers: {
      client: "Client",
      contact: "Contact",
      location: "Emplacement",
      interest: "Intérêt",
      budget: "Budget",
      reste: "Le Reste",
      contrat: "Contrat",
      lastContact: "Dernier Contact",
      status: "Statut",
      actions: ""
    },
    noMatch: "Aucun client ne correspond à vos critères.",
    dealLabel: "Transaction :",
    viewBtn: "Voir",
    interests: { sale: "À Vendre", rent: "Location", investment: "Investissement" },
    statuses: { Paye: "Payé", EnAttente: "En Attente", Partiel: "Partiel", inactive: "Inactif" },
    contractStates: { active: "Actif", pending: "En cours", expired: "Expiré", none: "Aucun" }
  },
  en: {
    headers: {
      client: "Client",
      contact: "Contact",
      location: "Location",
      interest: "Interest",
      budget: "Budget",
      reste: "Remaining Balance",
      contrat: "Contract",
      lastContact: "Last Contact",
      status: "Status",
      actions: ""
    },
    noMatch: "No clients match your filters.",
    dealLabel: "Deal:",
    viewBtn: "View",
    interests: { sale: "For Sale", rent: "Rental", investment: "Investment" },
    statuses: { Paye: "Paid", EnAttente: "Pending", Partiel: "Partial", inactive: "Inactive" },
    contractStates: { active: "Active", pending: "Pending", expired: "Expired", none: "None" }
  },
  ar: {
    headers: {
      client: "العميل",
      contact: "بيانات الاتصال",
      location: "الموقع",
      interest: "الاهتمام",
      budget: "الميزانية",
      reste: "المبلغ المتبقي",
      contrat: "العقد",
      lastContact: "آخر اتصال",
      status: "الحالة",
      actions: ""
    },
    noMatch: "لا يوجد عملاء يطابقون خيارات التصفية.",
    dealLabel: "قيمة الصفقة:",
    viewBtn: "عرض",
    interests: { sale: "للبيع", rent: "للإيجار", investment: "استثمار" },
    statuses: { Paye: "تم الدفع", EnAttente: "قيد الانتظار", Partiel: "دفع جزئي", inactive: "غير نشط" },
    contractStates: { active: "نشط", pending: "قيد المراجعة", expired: "منتهي", none: "لا يوجد" }
  }
};

export default function ClientTableView({ 
  filtered = [], 
  statusConfig = {}, 
  interestConfig = {}, 
  fmt, 
  setSelectedClient,
  currentLang = "fr"
}) {
  const t = tableLocales[currentLang] || tableLocales.fr;
  const isRTL = currentLang === "ar";

  // Check if any visible item in the current filtered state contains a partial status flag
  const hasAnyPartialItem = filtered.some(c => c.status === "Partiel");

  return (
    <div className="rounded-sm bg-white border border-[#e2ddd6] shadow-sm overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table dir={isRTL ? "rtl" : "ltr"} className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#f0ede8] bg-[#faf9f7]">
              <th className={`px-5 py-3 text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap text-start ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.client}
              </th>
              <th className={`px-5 py-3 text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap text-start ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.contact}
              </th>
              <th className={`px-5 py-3 text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap text-start ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.location}
              </th>
              <th className={`px-5 py-3 text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap text-start ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.interest}
              </th>
              <th className={`px-5 py-3 text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap text-start ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.budget}
              </th>

              {/* Dynamic Columns injected selectively if Partiel structural context is present */}
              {hasAnyPartialItem && (
                <>
                  <th className={`px-5 py-3 text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap text-start ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                    {t.headers.reste}
                  </th>
                  <th className={`px-5 py-3 text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap text-start ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                    {t.headers.contrat}
                  </th>
                </>
              )}

              <th className={`px-5 py-3 text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap text-start ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.lastContact}
              </th>
              <th className={`px-5 py-3 text-[9px] font-bold uppercase text-gray-400 whitespace-nowrap text-start ${isRTL ? "tracking-normal" : "tracking-widest"}`}>
                {t.headers.status}
              </th>
              <th className="px-5 py-3 text-[9px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap text-end">
                {t.headers.actions}
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-[#f7f5f2]">
            {filtered.length === 0 ? (
              <tr>
                <td 
                  colSpan={hasAnyPartialItem ? 10 : 8} 
                  className="px-5 py-16 text-center text-gray-400 text-sm"
                >
                  {t.noMatch}
                </td>
              </tr>
            ) : (
              filtered.map((c) => {
                const cfg = statusConfig[c.status] || { color: "text-gray-400", bg: "bg-gray-100", dot: "bg-gray-300" };
                const int = interestConfig[c.interest] || { color: "bg-gray-100 text-gray-600" };
                
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
                          <span className="text-[10px] font-bold text-[#d4b87a] font-sans">{c.avatar}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[12px] font-medium whitespace-nowrap truncate text-[#0f1f3d]">{c.name}</p>
                          <p dir="ltr" className="text-[10px] text-gray-400 font-mono mt-0.5 text-left">{c.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact Details Grid */}
                    <td className="px-5 py-3.5">
                      <div className="inline-flex flex-col gap-0.5 max-w-[180px]">
                        <p className="text-[11px] text-gray-600 flex items-center gap-1.5" dir="ltr">
                          <Mail size={9} className="text-[#b89a5a] flex-shrink-0" /> 
                          <span className="truncate">{c.email}</span>
                        </p>
                        <p className="text-[11px] text-gray-600 flex items-center gap-1.5" dir="ltr">
                          <Phone size={9} className="text-[#b89a5a] flex-shrink-0" /> 
                          <span className="truncate">{c.phone}</span>
                        </p>
                      </div>
                    </td>

                    {/* Location Markers */}
                    <td className="px-5 py-3.5">
                      <p className="text-[12px] text-gray-600 flex items-center gap-1.5 whitespace-nowrap">
                        <MapPin size={9} className="text-[#b89a5a] flex-shrink-0" /> 
                        <span>{c.location}</span>
                      </p>
                    </td>

                    {/* Localized Interest Badges */}
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${int.color} whitespace-nowrap`}>
                        {t.interests[c.interest] || c.interest}
                      </span>
                    </td>

                    {/* Finances budgeting metrics */}
                    <td className="px-5 py-3.5">
                      <div className="inline-flex flex-col gap-0.5">
                        <p className="text-[12px] font-semibold text-[#0f1f3d] whitespace-nowrap" dir="ltr">{c.budget}</p>
                        {c.dealValue && (
                          <p className="text-[10px] text-[#b89a5a] font-medium whitespace-nowrap flex items-center gap-1">
                            <span>{t.dealLabel}</span> 
                            <span dir="ltr">{c.dealValue}</span>
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Conditionally padded table row data fields targeting Partial clients */}
                    {hasAnyPartialItem && (
                      <>
                        {/* Le Reste (Remaining Balance Column) */}
                        <td className="px-5 py-3.5">
                          {c.status === "Partiel" && c.remainingBalance ? (
                            <p className="text-[12px] font-bold text-amber-700 flex items-center gap-1.5" dir="ltr">
                              <Wallet size={10} className="text-amber-600 flex-shrink-0" /> 
                              <span>{c.remainingBalance}</span>
                            </p>
                          ) : (
                            <p className="text-[12px] text-gray-300 font-mono">—</p>
                          )}
                        </td>

                        {/* Contrat Status Data Tracker */}
                        <td className="px-5 py-3.5">
                          {c.status === "Partiel" && c.contractStatus ? (
                            <p className="text-[11px] text-gray-700 font-medium flex items-center gap-1.5 whitespace-nowrap">
                              <FileText size={10} className="text-gray-400 flex-shrink-0" />
                              <span>{t.contractStates[c.contractStatus] || c.contractStatus}</span>
                            </p>
                          ) : (
                            <p className="text-[12px] text-gray-300 font-mono">—</p>
                          )}
                        </td>
                      </>
                    )}

                    {/* Contextual Last Contact Logs */}
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <p className="text-[12px] text-gray-500" dir={isRTL ? "rtl" : "ltr"}>
                        {fmt ? fmt(c.lastContact) : c.lastContact}
                      </p>
                    </td>

                    {/* Localized Status Badge Rows */}
                    <td className="px-5 py-3.5">
                      <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap ${cfg.bg} ${cfg.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                        <span>{t.statuses[c.status] || c.status}</span>
                      </div>
                    </td>

                    {/* Administrative View Portal Operations Trigger */}
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedClient(c);
                          }}
                          className={`flex items-center gap-1 rounded-sm border border-[#e2ddd6] px-2.5 py-1.5 text-[9px] font-bold uppercase text-gray-400 hover:border-[#b89a5a] hover:text-[#b89a5a] transition-colors whitespace-nowrap ${
                            isRTL ? "tracking-normal" : "tracking-widest"
                          }`}
                        >
                          <Eye size={10} /> <span>{t.viewBtn}</span>
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