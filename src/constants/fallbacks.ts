// Fallback type interfaces for structural safety
export interface LocalizedString {
  fr: string;
  ar: string;
}

export interface PropertyFallback {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  type: 'LAND' | 'VILLA' | 'APARTMENT' | 'COMMERCIAL';
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
  price: number;
  location: string;
  area: number;
  features: Record<string, any>;
  images: string[];
}

export interface ClientFallback {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  type: 'BUYER' | 'SELLER';
  notes: Record<string, any>;
}

export interface AttendanceFallback {
  id: string;
  employeeId: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'LEAVE';
  checkIn: string | null;
  checkOut: string | null;
  notes: Record<string, any>;
}

// ==========================================
// CENTRAL FALLBACK DATASETS
// ==========================================

export const PROPERTY_FALLBACK: PropertyFallback = {
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
  images: ['/images/property-placeholder.jpg'], // Fallback elegant dark/gold wireframe asset
};

export const CLIENT_FALLBACK: ClientFallback = {
  id: 'fallback-client',
  fullName: 'Client Inconnu / Non spécifié',
  email: 'no-email@immobagency.com',
  phone: '—',
  type: 'BUYER',
  notes: {},
};

export const ATTENDANCE_FALLBACK: AttendanceFallback = {
  id: 'fallback-attendance',
  employeeId: 'fallback-employee',
  date: new Date().toISOString().split('T')[0],
  status: 'ABSENT',
  checkIn: null,
  checkOut: null,
  notes: { system_log: 'No clock-in record found for this session date.' },
};