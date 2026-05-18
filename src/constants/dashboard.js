import { 
  CheckCircle2, Clock, Star, XCircle, AlertCircle, 
  LayoutDashboard, Home, Building2, CalendarCheck, 
  Users, BarChart2, Settings 
} from 'lucide-react';

// ── MULTI-LINGUAL DICTIONARY FOR GLOBAL STATUS & NAVIGATION ──
export const STATUS_AND_NAV_LOCALES = {
  fr: {
    dir: 'ltr',
    statuses: {
      confirmed: 'Confirmé',
      pending: 'En Attente',
      completed: 'Terminé',
      cancelled: 'Annulé',
      'no-show': 'Non Présent'
    },
    nav: {
      dashboard: 'Tableau de Bord',
      properties: 'Biens Immobiliers',
      developments: 'Promotions',
      attendance: 'Présence',
      clients: 'Gestion Clients',
      reports: 'Rapports',
      settings: 'Paramètres'
    }
  },
  en: {
    dir: 'ltr',
    statuses: {
      confirmed: 'Confirmed',
      pending: 'Pending',
      completed: 'Completed',
      cancelled: 'Cancelled',
      'no-show': 'No-Show'
    },
    nav: {
      dashboard: 'Dashboard',
      properties: 'Properties',
      developments: 'Developments',
      attendance: 'Attendance',
      clients: 'Clients',
      reports: 'Reports',
      settings: 'Settings'
    }
  },
  ar: {
    dir: 'rtl',
    statuses: {
      confirmed: 'مؤكد',
      pending: 'قيد الانتظار',
      completed: 'مكتمل',
      cancelled: 'ملغي',
      'no-show': 'لم يحضر'
    },
    nav: {
      dashboard: 'لوحة التحكم',
      properties: 'العقارات والملفات',
      developments: 'المشاريع العقارية',
      attendance: 'تسجيل الحضور',
      clients: 'إدارة العملاء',
      reports: 'التقارير الإحصائية',
      settings: 'الإعدادات العامة'
    }
  }
};

/* ─────────────────────────────────────────────
   GLOBAL STRUCTURAL PRESENTATION CONFIGURATIONS
───────────────────────────────────────────── */
export const STATUS_CONFIG = {
  confirmed: { color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle2 },
  pending:   { color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200',   icon: Clock },
  completed: { color: 'text-blue-700',    bg: 'bg-blue-50 border-blue-200',      icon: Star },
  cancelled: { color: 'text-rose-700',    bg: 'bg-rose-50 border-rose-200',      icon: XCircle },
  'no-show': { color: 'text-gray-500',    bg: 'bg-gray-50 border-gray-200',      icon: AlertCircle },
};

export const NAV_ITEMS = [
  { icon: LayoutDashboard, id: 'dashboard' },
  { icon: Home,            id: 'properties' },
  // 🎯 Retained path routing target parameter intact for custom mapping loops
  { icon: Building2,       id: 'developments', path: '/developments' },
  { icon: CalendarCheck,   id: 'attendance' },
  { icon: Users,           id: 'clients' },
  { icon: BarChart2,       id: 'reports' },
  { icon: Settings,        id: 'settings' },
];