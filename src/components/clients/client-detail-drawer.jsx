"use client";

import React from "react";
import { X, Mail, Phone, MapPin, CalendarCheck, DollarSign, Clock } from "lucide-react";

// ── MULTI-LINGUAL DRAWER DICTIONARY ──
const drawerLocales = {
  fr: {
    dir: 'ltr',
    joinedLabel: 'Inscrit le',
    contactTitle: 'Informations de Contact',
    visitsLabel: 'Visites Totales',
    budgetLabel: 'Budget',
    contactLabel: 'Dernier Contact',
    dealTitle: 'Valeur de la Transaction',
    notesTitle: 'Notes / Remarques',
    statusTitle: 'Mettre à jour le statut',
    btnCall: "Appeler l'Agent",
    btnEmail: 'Envoyer un Email',
    interests: { sale: 'À Vendre', rent: 'Location', investment: 'Investissement' },
    statuses: { prospect: 'Prospect', active: 'Actif', vip: 'VIP', closed: 'Clôturé', inactive: 'Inactif' }
  },
  en: {
    dir: 'ltr',
    joinedLabel: 'Joined',
    contactTitle: 'Contact Information',
    visitsLabel: 'Total Visits',
    budgetLabel: 'Budget',
    contactLabel: 'Last Contact',
    dealTitle: 'Deal Value',
    notesTitle: 'Notes',
    statusTitle: 'Update Status',
    btnCall: 'Call Agent',
    btnEmail: 'Email Client',
    interests: { sale: 'For Sale', rent: 'Rental', investment: 'Investment' },
    statuses: { prospect: 'Prospect', active: 'Active', vip: 'VIP', closed: 'Closed', inactive: 'Inactive' }
  },
  ar: {
    dir: 'rtl',
    joinedLabel: 'تاريخ الانضمام',
    contactTitle: 'معلومات الاتصال',
    visitsLabel: 'إجمالي الزيارات',
    budgetLabel: 'الميزانية',
    contactLabel: 'آخر اتصال',
    dealTitle: 'قيمة الصفقة',
    notesTitle: 'ملاحظات',
    statusTitle: 'تحديث الحالة',
    btnCall: 'اتصال بالوكيل',
    btnEmail: 'إرسال بريد إلكتروني',
    interests: { sale: 'للبيع', rent: 'للإيجار', investment: 'استثمار' },
    statuses: { prospect: 'محتمل', active: 'نشط', vip: 'VIP', closed: 'مغلق', inactive: 'غير نشط' }
  }
};

export default function ClientDrawer({ 
  client, 
  onClose, 
  onStatusChange, 
  statusConfig = {}, 
  interestConfig = {}, 
  fmt,
  currentLang = "fr"
}) {
  if (!client) return null;

  const t = drawerLocales[currentLang] || drawerLocales.fr;
  const isRTL = currentLang === "ar";

  const cfg = statusConfig[client.status] || {
    label: client.status,
    color: "text-gray-700",
    bg: "bg-gray-50 border-gray-200",
    dot: "bg-gray-400"
  };
  
  const int = interestConfig[client.interest] || { 
    label: client.interest, 
    color: "bg-gray-500 text-white" 
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose} 
      />
      
      {/* Drawer content surface */}
      <div 
        dir={t.dir}
        className={`w-[480px] max-w-full h-full flex flex-col bg-white shadow-2xl overflow-y-auto z-40 fixed top-0 bottom-0 duration-300 transition-all ease-in-out ${
          isRTL 
            ? "left-0 animate-in slide-in-from-left" 
            : "right-0 animate-in slide-in-from-right"
        }`}
      >
        
        {/* Header Section */}
        <div className={`flex items-start justify-between p-6 border-b border-[#e2ddd6] gap-4 ${isRTL ? "pl-4" : "pr-4"}`}>
          <div className="flex items-center gap-4 truncate">
            <div className="h-14 w-14 rounded-full bg-[#0f1f3d] flex items-center justify-center flex-shrink-0">
              <span className="font-serif text-xl text-[#d4b87a]">{client.avatar}</span>
            </div>
            <div className="truncate">
              <h2 className={`text-xl text-[#0f1f3d] truncate leading-tight ${isRTL ? "font-sans font-bold" : "font-serif"}`}>
                {client.name}
              </h2>
              <p className="text-[11px] text-gray-400 mt-1 flex flex-wrap items-center gap-1">
                <span dir="ltr">{client.id}</span>
                <span className="text-gray-300">·</span>
                <span>{t.joinedLabel} {fmt ? fmt(client.joinedDate) : client.joinedDate}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-[#0f1f3d] transition-colors mt-1 shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dynamic Badges */}
        <div className="flex gap-2 px-6 pt-4 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${cfg.bg} ${cfg.color}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            <span>{t.statuses[client.status] || cfg.label}</span>
          </span>
          <span className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest ${int.color}`}>
            <span>{t.interests[client.interest] || int.label}</span>
          </span>
          {client.tags?.map(tag => (
            <span 
              key={tag} 
              className="rounded-full bg-[#f0ede8] px-3 py-1 text-[9px] font-semibold text-[#b89a5a]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Contact Coordinates */}
        <div className="px-6 pt-5 space-y-3">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">{t.contactTitle}</h3>
          {[
            { icon: Mail, value: client.email, isLink: true },
            { icon: Phone, value: client.phone, isLink: true },
            { icon: MapPin, value: client.location, isLink: false },
          ].map(({ icon: Icon, value, isLink }, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-sm bg-[#f0ede8] flex items-center justify-center flex-shrink-0">
                <Icon size={12} className="text-[#b89a5a]" />
              </div>
              <span 
                className="text-[12px] text-[#0f1f3d] truncate" 
                dir={isLink ? "ltr" : t.dir}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Analytics & Financial Metrics Grid */}
        <div className="mx-6 mt-5 grid grid-cols-3 gap-3">
          {[
            { label: t.visitsLabel, val: client.totalVisits, icon: CalendarCheck, isRaw: true },
            { label: t.budgetLabel, val: client.budget, icon: DollarSign, isRaw: true },
            { label: t.contactLabel, val: fmt ? fmt(client.lastContact) : client.lastContact, icon: Clock, isRaw: false },
          ].map(({ label, val, icon: Icon, isRaw }) => (
            <div key={label} className="rounded-sm bg-[#f7f6f3] border border-[#e2ddd6] p-3 text-center flex flex-col justify-between min-h-[76px]">
              <Icon size={12} className="text-[#b89a5a] mx-auto mb-1 shrink-0" />
              <p className="text-[11px] font-bold text-[#0f1f3d] line-clamp-1" dir={isRaw ? "ltr" : t.dir}>{val}</p>
              <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">{label}</p>
            </div>
          ))}
        </div>

        {/* Closed Deal Premium Highlight */}
        {client.dealValue && (
          <div className={`mx-6 mt-4 rounded-sm bg-[#0f1f3d] p-4 border-y-0 border-t-0 border-b-0 border-[#b89a5a] ${
            isRTL ? "border-r-4 border-l-0" : "border-l-4 border-r-0"
          }`}>
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 mb-1">{t.dealTitle}</p>
            <p className="font-serif text-2xl text-[#d4b87a]" dir="ltr">{client.dealValue}</p>
          </div>
        )}

        {/* Broker Field Notes */}
        <div className="px-6 mt-5">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">{t.notesTitle}</h3>
          <p className="text-[12px] text-gray-600 leading-relaxed bg-[#f7f6f3] rounded-sm p-3 border border-[#e2ddd6]">
            {client.notes}
          </p>
        </div>

        {/* Status Pipeline State Management Panel */}
        <div className="px-6 mt-5 mb-6">
          <h3 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">{t.statusTitle}</h3>
          <div className="flex flex-wrap gap-2">
            {["prospect", "active", "vip", "closed", "inactive"].map(s => {
              const statusCfgItem = statusConfig[s];
              if (!statusCfgItem) return null;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => onStatusChange && onStatusChange(client.id, s)}
                  className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-widest transition-all ${
                    client.status === s 
                      ? `${statusCfgItem.bg} ${statusCfgItem.color} shadow-sm border-transparent` 
                      : "border-[#e2ddd6] text-gray-400 hover:border-[#b89a5a] hover:text-[#b89a5a]"
                  }`}
                >
                  {t.statuses[s] || statusCfgItem.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Call to Action Footer */}
        <div className="border-t border-[#e2ddd6] p-4 flex gap-2 mt-auto bg-[#faf9f7] shrink-0">
          <button className="flex-1 flex items-center justify-center gap-2 rounded-sm bg-[#0f1f3d] py-2.5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#b89a5a] transition-colors">
            <Phone size={11} /> <span>{t.btnCall}</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 rounded-sm border border-[#0f1f3d] py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#0f1f3d] hover:bg-[#f0ede8] transition-colors">
            <Mail size={11} /> <span>{t.btnEmail}</span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-sm border border-[#e2ddd6] px-3 py-2.5 text-gray-400 hover:border-[#b89a5a] hover:text-[#b89a5a] transition-colors">
            <CalendarCheck size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}