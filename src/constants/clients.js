import { CheckCircle2, Clock, UserCheck, UserX, AlertCircle } from "lucide-react";

// ── MULTI-LINGUAL DATA TRANSLATION MAP FOR STATIC STRINGS ──
export const CLIENT_DATA_LOCALES = {
  fr: {
    dir: 'ltr',
    rentSuffix: '/ mois',
    dealPrefix: 'Transaction :',
    joinedPrefix: 'Inscrit le',
    tags: {
      "Pre-approved": "Pré-approuvé",
      "Motivated": "Motivé",
      "Long-term": "Long terme",
      "Remote": "Télétravail",
      "Closed deal": "Transaction conclue",
      "HNW": "UHNW (Haute Valeur)",
      "Follow-up": "À relancer",
      "Referral": "Recommandation",
      "Rescheduled": "Reporté",
      "Off-plan": "Sur plan",
      "Investor": "Investisseur",
      "Portfolio": "Portefeuille"
    },
    notes: {
      C001: "Intéressé par un 5 pièces. Pré-approuvé. Acheteur sérieux.",
      C002: "Travailleur à distance, bail de 12 mois de préférence.",
      C003: "Accord conclu. Formalités administratives en cours.",
      C004: "Haute valeur nette. Pré-approuvé à 6M$. Très décisif.",
      C005: "Absence lors de la première visite. Suivi nécessaire.",
      C006: "Recommandation d'un client existant. Acheteur motivé.",
      C007: "Visite reportée pour cause de voyage. Replanification.",
      C008: "Intérêt pour l'achat sur plan. Souhaite l'étage 8+.",
      C009: "Recherche de propriétés à rendement locatif. Acheteur de portefeuille."
    }
  },
  en: {
    dir: 'ltr',
    rentSuffix: '/mo',
    dealPrefix: 'Deal:',
    joinedPrefix: 'Joined',
    tags: {
      "Pre-approved": "Pre-approved",
      "Motivated": "Motivated",
      "Long-term": "Long-term",
      "Remote": "Remote",
      "Closed deal": "Closed deal",
      "HNW": "HNW",
      "Follow-up": "Follow-up",
      "Referral": "Referral",
      "Rescheduled": "Rescheduled",
      "Off-plan": "Off-plan",
      "Investor": "Investor",
      "Portfolio": "Portfolio"
    },
    notes: {
      C001: "Interested in 5-bed. Pre-approved. Serious buyer.",
      C002: "Remote worker, 12-month lease preferred.",
      C003: "Deal agreed. Paperwork in progress.",
      C004: "High-net-worth. Pre-approved $6M. Very decisive.",
      C005: "No-show on first visit. Follow-up needed.",
      C006: "Referral from existing client. Motivated buyer.",
      C007: "Postponed visit due to travel. Rescheduling.",
      C008: "Off-plan interest. Wants floor 8+.",
      C009: "Looking for rental-yield properties. Portfolio buyer."
    }
  },
  ar: {
    dir: 'rtl',
    rentSuffix: '/ شهرياً',
    dealPrefix: 'قيمة الصفقة:',
    joinedPrefix: 'تاريخ الانضمام',
    tags: {
      "Pre-approved": "موافق عليه مسبقاً",
      "Motivated": "مهتم وجاد",
      "Long-term": "عقد طويل الأمد",
      "Remote": "عمل عن بعد",
      "Closed deal": "صفقة مغلقة ناجحة",
      "HNW": "ملاءة مالية عالية",
      "Follow-up": "يتطلب متابعة",
      "Referral": "موصى به من عميل",
      "Rescheduled": "تم إعادة الجدولة",
      "Off-plan": "شراء على التصميم",
      "Investor": "مستثمر عقاري",
      "Portfolio": "مستثمر محافظ"
    },
    notes: {
      C001: "مهتم بشقة 5 غرف. حصل على موافقة تمويل مسبقة. مشترٍ جاد.",
      C002: "يعمل عن بعد، يفضل عقد إيجار لمدة 12 شهراً.",
      C003: "تم الاتفاق على الصفقة. الأوراق والاجراءات القانونية قيد التنفيذ.",
      C004: "ثروة مالية عالية جداً. موافقة مسبقة بـ 6 ملايين دولار. حاسم للغاية.",
      C005: "لم يحضر في الزيارة الأولى. يتطلب إعادة الاتصال به والمتابعة.",
      C006: "موصى به من طرف عميل سابق للوكالة. مشترٍ متحمس.",
      C007: "تأجلت الزيارة بسبب السفر. جاري إعادة ترتيب الموعد.",
      C008: "مهتم بالشراء على الخارطة المسبقة. يطلب الطابق الثامن فما فوق.",
      C009: "يبحث عن عقارات ذات عائد استثماري وإيجاري مرتفع. مشترٍ استراتيجي."
    }
  }
};

// ── MULTI-LINGUAL COMPONENT SCHEMA CONFIGURATIONS ──
export const globalClientLocales = {
  fr: {
    statuses: { TOUS: "TOUS", Paye: "Payé", EnAttente: "En Attente", Partiel: "Partiel", inactive: "Inactif" },
    interests: { sale: "À Vendre", rent: "Location", investment: "Investissement" },
    assetTypes: { TOUS: "Tous les types", maison: "Maison", appartement: "Appartement", garage: "Garage", land: "Terrain", commercial: "Commercial" },
    buildings: { TOUS: "Tous les immeubles" }
  },
  en: {
    statuses: { TOUS: "ALL", Paye: "Paid", EnAttente: "Pending", Partiel: "Partial", inactive: "Inactive" },
    interests: { sale: "For Sale", rent: "Rental", investment: "Investment" },
    assetTypes: { TOUS: "All Types", maison: "House / Maison", appartement: "Apartment", garage: "Garage", land: "Land / Terrain", commercial: "Commercial" },
    buildings: { TOUS: "All Buildings" }
  },
  ar: {
    statuses: { TOUS: "الكل", Paye: "تم الدفع", EnAttente: "قيد الانتظار", Partiel: "دفع جزئي", inactive: "غير نشط" },
    interests: { sale: "للبيع", rent: "للإيجار", investment: "استثمار" },
    assetTypes: { TOUS: "جميع الأنواع", maison: "منزل / فيلا", appartement: "شقة فاخرة", garage: "مرآب", land: "بقعة أرضية", commercial: "عقار تجاري" },
    buildings: { TOUS: "جميع الإقامات والعقارات" }
  }
};

// Raw layout seed data array safely using unique identifying tokens for dynamic translation maps
export const initialClients = [
  {
    id: "C001", name: "James Thornton", email: "james.t@email.com", phone: "+1 310 555-0122",
    location: "Beverly Hills, CA", status: "Paye", interest: "sale", budget: "$2,800,000",
    assetType: "appartement", buildingName: "Chaimae Residence",
    joinedDate: "2025-11-14", lastContact: "2026-05-13", totalVisits: 7,
    avatar: "JT", tags: ["Pre-approved", "Motivated"], dealValue: "$2,450,000",
  },
  {
    id: "C002", name: "Nadia Bellamy", email: "nadia.b@email.com", phone: "+1 310 555-0198",
    location: "Manhattan, NY", status: "EnAttente", interest: "rent", budget: "$9,000",
    assetType: "maison", joinedDate: "2026-01-08", lastContact: "2026-05-12", totalVisits: 3,
    avatar: "NB", tags: ["Long-term", "Remote"],
  },
  {
    id: "C003", name: "Carlos Rivera", email: "carlos.r@email.com", phone: "+1 310 555-0177",
    location: "Downtown Miami, FL", status: "inactive", interest: "sale", budget: "$4,500,000",
    assetType: "garage", buildingName: "Al Warda Residence", joinedDate: "2025-09-22", lastContact: "2026-05-12", totalVisits: 12,
    avatar: "CR", tags: ["Closed deal"], dealValue: "$4,200,000",
  },
  {
    id: "C004", name: "Amara Okafor", email: "amara.o@email.com", phone: "+1 213 555-0144",
    location: "Malibu, CA", status: "Partiel", interest: "sale", budget: "$6,000,000",
    assetType: "land", joinedDate: "2026-02-01", lastContact: "2026-05-10", totalVisits: 5,
    avatar: "AO", tags: ["HNW", "Pre-approved"],
  },
  {
    id: "C005", name: "Felix Hoffman", email: "felix.h@email.com", phone: "+1 213 555-0163",
    location: "Santa Monica, CA", status: "Paye", interest: "rent", budget: "$3,500",
    assetType: "appartement", buildingName: "El Taleb Residence",
    joinedDate: "2026-03-15", lastContact: "2026-05-11", totalVisits: 1,
    avatar: "FH", tags: ["Follow-up"],
  },
  {
    id: "C006", name: "Priya Nair", email: "priya.n@email.com", phone: "+1 310 555-0199",
    location: "Bel Air, CA", status: "EnAttente", interest: "sale", budget: "$6,500,000",
    assetType: "maison", joinedDate: "2026-04-20", lastContact: "2026-05-09", totalVisits: 2,
    avatar: "PN", tags: ["Referral", "Motivated"],
  },
  {
    id: "C007", name: "Oliver Stern", email: "oliver.s@email.com", phone: "+1 213 555-0181",
    location: "Pasadena, CA", status: "Partiel", interest: "sale", budget: "$1,200,000",
    assetType: "garage", buildingName: "Chaimae Residence", joinedDate: "2026-01-30", lastContact: "2026-05-12", totalVisits: 4,
    avatar: "OS", tags: ["Rescheduled"],
  },
  {
    id: "C008", name: "Hana Yoshida", email: "hana.y@email.com", phone: "+1 310 555-0155",
    location: "Downtown LA, CA", status: "inactive", interest: "sale", budget: "$750,000",
    assetType: "land", buildingName: "TOUS", joinedDate: "2026-03-05", lastContact: "2026-05-13", totalVisits: 3,
    avatar: "HY", tags: ["Off-plan"],
  },
  {
    id: "C009", name: "Marcus Lee", email: "marcus.l@email.com", phone: "+1 415 555-0211",
    location: "San Francisco, CA", status: "Paye", interest: "investment", budget: "$3,000,000",
    assetType: "appartement", buildingName: "Al Warda Residence", joinedDate: "2026-05-01", lastContact: "2026-05-08", totalVisits: 1,
    avatar: "ML", tags: ["Investor", "Portfolio"],
  },
];

/* ─────────────────────────────────────────────
   GLOBAL STRUCTURAL SYSTEM LOOKUPS
───────────────────────────────────────────── */
export const statusConfig = {
  Paye:      { color: "text-amber-700",   bg: "bg-amber-50 border-amber-200",   dot: "bg-amber-500",   icon: CheckCircle2 },
  EnAttente: { color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500", icon: Clock },
  Partiel:   { color: "text-blue-700",    bg: "bg-blue-50 border-blue-200",      dot: "bg-blue-500",    icon: UserCheck },
  inactive:  { color: "text-[#0f1f3d]",   bg: "bg-[#f0ede8] border-[#d4c9b8]",   dot: "bg-[#b89a5a]",   icon: UserX },
};

export const interestConfig = {
  sale:       { color: "bg-[#0f1f3d] text-white" },
  rent:       { color: "bg-[#b89a5a] text-white" },
  investment: { color: "bg-emerald-700 text-white" },
};

export const assetTypes = ["TOUS", "maison", "appartement", "garage", "land", "commercial"];
export const statuses = ["TOUS", "Paye", "EnAttente", "Partiel", "inactive"];
export const buildingNames = ["TOUS", "Chaimae Residence", "El Taleb Residence", "Al Warda Residence"];

export const fmt = (d, lang = 'fr') => {
  const localeSelection = lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US';
  return new Date(d).toLocaleDateString(localeSelection, { month: "short", day: "numeric", year: "numeric" });
};