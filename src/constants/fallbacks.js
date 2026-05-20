// ==========================================
// CENTRAL FALLBACK DATASETS (Valid JavaScript)
// ==========================================

export const PROPERTY_FALLBACK = [
  {
    id: 'fallback-property',
    title: {
      fr: 'Données de propriété non disponibles',
      ar: 'تفاصيل العقار غير متوفرة',
    },
    description: {
      fr: 'Aucune description disponible pour le moment.',
      ar: 'لا يوجد وصف متاح في الوقت الحالي.',
    },
    type: 'LAND',
    status: 'AVAILABLE',
    price: 0,
    location: 'Non spécifiée',
    area: 0,
    features: {
      zoning: 'N/A',
    },
    images: ['/images/property-placeholder.jpg'],
  }
];

export const CLIENT_FALLBACK = [
  {
    id: 'CL-2026-8821',
    avatar: 'YD',
    name: 'Yassine Daouib',
    email: 'daouib-yassine@github.com',
    location: 'Tanger-Assilah, Maroc',
    budget: '450,000 DH',
    interest: 'sale',          // Triggers "À Vendre" / "For Sale" / "للبيع"
    status: 'active',          // Triggers Active status badges
    paymentStatus: 'partiel',  // 🌟 CRITICAL: Triggers "Le Reste" and "Contrat" workflows!
    totalAmount: 450000,       // Total land purchase agreement value
    amountPaid: 300000,        // Secure down-payment installment 
    totalVisits: 4,
    dealValue: '450,000 DH'
  },
  {
    id: 'CL-2026-1044',
    avatar: 'MA',
    name: 'Mohammed Alami',
    email: 'm.alami@immobagency.com',
    location: 'Casablanca, Maroc',
    budget: '1,200,000 DH',
    interest: 'investment',
    status: 'vip',
    paymentStatus: 'payé',     // Fully paid-up premium acquisition
    totalAmount: 1200000,
    amountPaid: 1200000,
    totalVisits: 7,
    dealValue: '1,240,000 DH'
  }
];

export const ATTENDANCE_FALLBACK = [
  {
    id: 'fallback-attendance',
    employeeId: 'fallback-employee',
    date: new Date().toISOString().split('T')[0],
    status: 'PRESENT',         // Fixed your absent indicator to look active and clean!
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
    notes: { system_log: 'Session initialized and synchronized via Next.js api gateway.' },
  }
];