import { 
  Building2, Castle, TreePine, Layers,
  LayoutDashboard, Home, CalendarCheck, Users, BarChart2, Settings ,
  Wind, Car, Wifi, ShieldCheck 
} from "lucide-react";
// ── MULTI-LINGUAL CORE LOOKUP REGISTRY MATRIX ──
export const dashboardLocales = {
  fr: {
    dir: 'ltr',
    nav: {
      dashboard: 'Tableau de Bord',
      properties: 'Biens Immobiliers',
      developments: 'Promotions',
      attendance: 'Présence',
      clients: 'Gestion Clients',
      reports: 'Rapports',
      settings: 'Paramètres'
    },
    statuses: {
      available: 'Disponible',
      reserved: 'Réservé',
      sold: 'Vendu',
      rented: 'Loué',
      all: 'Tous les Statuts'
    },
    types: {
      apartment: 'Appartement',
      villa: 'Villa',
      land: 'Terrain',
      penthouse: 'Penthouse',
      all: 'Tous les Types'
    },
    projects: {
      'All Projects': 'Tous les Projets',
      'Résidence Al Mansour': 'Résidence Al Mansour',
      'Palais Doré': 'Palais Doré',
      'None': 'Indépendant (Hors Projet)'
    },
    cities: {
      'Tanger': 'Tanger',
      'Casablanca': 'Casablanca',
      'Marrakech': 'Marrakech',
      'Rabat': 'Rabat'
    },
    rentSuffix: '/ mois'
  },
  en: {
    dir: 'ltr',
    nav: {
      dashboard: 'Dashboard',
      properties: 'Properties',
      developments: 'Developments',
      attendance: 'Attendance',
      clients: 'Clients',
      reports: 'Reports',
      settings: 'Settings'
    },
    statuses: {
      available: 'Available',
      reserved: 'Reserved',
      sold: 'Sold',
      rented: 'Rented',
      all: 'All Statuses'
    },
    types: {
      apartment: 'Apartment',
      villa: 'Villa',
      land: 'Land',
      penthouse: 'Penthouse',
      all: 'All Types'
    },
    projects: {
      'All Projects': 'All Projects',
      'Résidence Al Mansour': 'Résidence Al Mansour',
      'Palais Doré': 'Palais Doré',
      'None': 'None (Standalone)'
    },
    cities: {
      'Tanger': 'Tangier',
      'Casablanca': 'Casablanca',
      'Marrakech': 'Marrakech',
      'Rabat': 'Rabat'
    },
    rentSuffix: '/ month'
  },
  ar: {
    dir: 'rtl',
    nav: {
      dashboard: 'لوحة التحكم',
      properties: 'العقارات والملفات',
      developments: 'المشاريع العقارية',
      attendance: 'تسجيل الحضور',
      clients: 'إدارة العملاء',
      reports: 'التقارير الإحصائية',
      settings: 'الإعدادات العامة'
    },
    statuses: {
      available: 'متاح للبيع',
      reserved: 'محجوز مؤقتاً',
      sold: 'تمت البيعة',
      rented: 'مؤجر حالياً',
      all: 'جميع الحالات'
    },
    types: {
      apartment: 'شقة فاخرة',
      villa: 'فيلا مستقلة',
      land: 'بقعة أرضية',
      penthouse: 'بينتهاوس',
      all: 'جميع الأنواع'
    },
    projects: {
      'All Projects': 'جميع المشاريع',
      'Résidence Al Mansour': 'إقامة المنصور',
      'Palais Doré': 'القصر الذهبي',
      'None': 'عقار مستقل'
    },
    cities: {
      'Tanger': 'طنجة',
      'Casablanca': 'الدار البيضاء',
      'Marrakech': 'مراكش',
      'Rabat': 'الرباط'
    },
    rentSuffix: '/ شهرياً'
  }
};

/* ─────────────────────────────────────────────
   MOCK DATA MATRIX (ImmobAgency Portfolio)
───────────────────────────────────────────── */
export const initialProperties = [
  {
    id: 'P001', ref: 'ALT-MRK-001',
    titleKey: 'P001_TITLE', // Mapped cleanly for internal localized structural interpolation
    location: 'Résidence Al Mansour, Marshan', city: 'Tanger',
    type: 'apartment', status: 'available',
    price: 3850000, forRent: false,
    area: 215, bedrooms: 4, bathrooms: 3,
    project: 'Résidence Al Mansour',
    isVIP: true,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    addedDate: '2026-04-10', agent: 'Sophia Laurent',
  },
  {
    id: 'P002', ref: 'ALT-TNG-002',
    titleKey: 'P002_TITLE',
    location: 'Cap Malabata, Littoral Est', city: 'Tanger',
    type: 'villa', status: 'reserved',
    price: 12500000, forRent: false,
    area: 580, bedrooms: 6, bathrooms: 5,
    project: 'Palais Doré',
    isVIP: true,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    addedDate: '2026-03-22', agent: 'Jonathan Altis',
  },
  {
    id: 'P003', ref: 'ALT-MRK-003',
    titleKey: 'P003_TITLE',
    location: 'Route de Casa, Km 14', city: 'Casablanca',
    type: 'land', status: 'available',
    price: 8200000, forRent: false,
    area: 2400, bedrooms: null, bathrooms: null,
    project: 'None',
    isVIP: false,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    addedDate: '2026-04-01', agent: 'Marcus Webb',
  },
  {
    id: 'P004', ref: 'ALT-MRK-004',
    titleKey: 'P004_TITLE',
    location: 'Médina, Derb Sidi Bouloukate', city: 'Marrakech',
    type: 'villa', status: 'sold',
    price: 6750000, forRent: false,
    area: 340, bedrooms: 5, bathrooms: 4,
    project: 'None',
    isVIP: true,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    addedDate: '2026-02-14', agent: 'Sophia Laurent',
  },
  {
    id: 'P005', ref: 'ALT-TNG-005',
    titleKey: 'P005_TITLE',
    location: 'Avenue Mohamed VI, Centre Ville', city: 'Tanger',
    type: 'penthouse', status: 'available',
    price: 28000, forRent: true,
    area: 180, bedrooms: 3, bathrooms: 2,
    project: 'Résidence Al Mansour',
    isVIP: true,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    addedDate: '2026-04-28', agent: 'Isabelle Fontaine',
  },
  {
    id: 'P006', ref: 'ALT-RBT-006',
    titleKey: 'P006_TITLE',
    location: 'La Corniche, Ain Diab', city: 'Casablanca',
    type: 'apartment', status: 'rented',
    price: 15000, forRent: true,
    area: 120, bedrooms: 2, bathrooms: 2,
    project: 'Palais Doré',
    isVIP: false,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    addedDate: '2026-01-30', agent: 'Marcus Webb',
  },
];

// ── LOCALIZED INSOLATED DATA STRING TARGET MAP ──
export const PROPERTY_DATA_LOCALES = {
  P001_TITLE: { fr: 'Palais Privé — Appartement de Prestige', en: 'Private Palace — Prestige Apartment', ar: 'القصر الخاص — شقة فاخرة متميزة' },
  P002_TITLE: { fr: 'Villa Ambre — Vue Sur Détroit', en: 'Villa Ambre — Strait View', ar: 'فيلا العنبر — إطلالة مباشرة على المضيق' },
  P003_TITLE: { fr: 'Terrain Stratégique — Zone Touristique', en: 'Strategic Land — Tourist Zone', ar: 'بقعة أرضية استراتيجية — المنطقة السياحية' },
  P004_TITLE: { fr: 'Riad El Barakah — Médina Historique', en: 'Riad El Barakah — Historical Medina', ar: 'رياض البركة — المدينة العتيقة التاريخية' },
  P005_TITLE: { fr: 'Penthouse Azur — Haut Standing', en: 'Azur Penthouse — High Standing Luxury', ar: 'بينتهاوس لازورد — إقامة فاخرة راقية' },
  P006_TITLE: { fr: 'Appartement Vue Mer — Corniche', en: 'Sea View Apartment — Corniche', ar: 'شقة بإطلالة بحرية ساحرة — الكورنيش' }
};

/* ─────────────────────────────────────────────
   GLOBAL APP LOOKUPS & LAYOUT STYLING CONFIGS
───────────────────────────────────────────── */
export const statusConfig = {
  available: { color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  reserved:  { color: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200' },
  sold:      { color: 'text-[#b89a5a]',   bg: 'bg-[#faf7f0]',  border: 'border-[#d4b87a]' },
  rented:    { color: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200' },
};

export const typeConfig = {
  apartment: { icon: Building2 },
  villa:     { icon: Castle },
  land:      { icon: TreePine },
  penthouse: { icon: Layers },
};

export const projects = ['All Projects', 'Résidence Al Mansour', 'Palais Doré', 'None'];
export const assetTypes = ['all', 'apartment', 'villa', 'land', 'penthouse'];
export const statusFilters = ['all', 'available', 'reserved', 'sold', 'rented'];

export const navItems = [
  { icon: LayoutDashboard, id: 'dashboard' },
  { icon: Home,            id: 'properties' },
  { icon: Building2,       id: 'developments' },
  { icon: CalendarCheck,   id: 'attendance' },
  { icon: Users,           id: 'clients' },
  { icon: BarChart2,       id: 'reports' },
  { icon: Settings,        id: 'settings' },
];

export const PROPERTIES = [
  {
    id: 1,
    name: 'Skyline Penthouse — Tower One',
    tag: 'New',
    isRent: false,
    price: '3,850,000',
    period: '',
    loc: 'Midtown, Manhattan NY',
    beds: 4,
    baths: 3,
    sqft: 420,
    floors: 1,
    year: 2022,
    garage: 3,
    description: `A pinnacle of urban luxury, this penthouse offers 360-degree views of the Manhattan skyline. Featuring double-height ceilings and a private elevator gallery, it represents the ultimate in high-rise living.`,
    features: ['Private Elevator', 'Smart Home System', 'Floor-to-Ceiling Windows', 'Concierge Service'],
    amenities: [
      { icon: Wind, label: 'Central A/C' },
      { icon: ShieldCheck, label: '24/7 Security' },
      { icon: Wifi, label: 'Fiber Internet' },
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
    ],
    agent: {
      name: 'Sophia Laurent',
      title: 'Senior Property Advisor',
      phone: '+1 (310) 555-0190',
      email: 'sophia@altisrealty.com',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    },
  },
  {
    id: 2,
    name: 'Elysian Heights Villa',
    tag: 'For Sale',
    isRent: false,
    price: '2,450,000',
    period: '',
    loc: 'Beverly Hills, CA 90210',
    beds: 5,
    baths: 4,
    sqft: 620,
    floors: 3,
    year: 2019,
    garage: 2,
    description: `Nestled in the prestigious hills of Beverly Hills, Elysian Heights is a masterpiece of contemporary architecture blended with timeless elegance. Expansive floor-to-ceiling windows frame breathtaking panoramic views of the city.`,
    features: [
      'Heated infinity pool',
      'Smart home automation',
      'Private cinema room',
      'Wine cellar',
      'Electric vehicle charging',
    ],
    amenities: [
      { icon: Wind, label: 'Central A/C' },
      { icon: Car, label: '2-Car Garage' },
      { icon: Wifi, label: 'Fiber Internet' },
      { icon: ShieldCheck, label: '24/7 Security' },
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85',
    ],
    agent: {
      name: 'Sophia Laurent',
      title: 'Senior Property Advisor',
      phone: '+1 (310) 555-0190',
      email: 'sophia@altisrealty.com',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    },
  },
  {
    id: 3,
    name: 'Meridian Sky Apartments',
    tag: 'For Rent',
    isRent: true,
    price: '8,500',
    period: '/mo',
    loc: 'Manhattan, New York',
    beds: 3,
    baths: 2,
    sqft: 185,
    floors: 1,
    year: 2021,
    garage: 1,
    description: `A sophisticated rental opportunity in the heart of Manhattan. This modern apartment features high-end finishes and access to world-class building amenities.`,
    features: ['Modern Kitchen', 'City Views', 'Hardwood Floors', 'Pet Friendly'],
    amenities: [
      { icon: Wind, label: 'Central A/C' },
      { icon: Wifi, label: 'High-Speed Wifi' },
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=85',
    ],
    agent: {
      name: 'Sophia Laurent',
      title: 'Senior Property Advisor',
      phone: '+1 (310) 555-0190',
      email: 'sophia@altisrealty.com',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    },
  },
];

export default PROPERTIES;
