import { 
  CheckCircle2, Clock, Star, XCircle, AlertCircle, 
  LayoutDashboard, Home, Building2, CalendarCheck, 
  Users, BarChart2, Settings 
} from 'lucide-react';

export const STATUS_CONFIG = {
  confirmed: { label: 'Confirmed', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle2 },
  pending:   { label: 'Pending',   color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200',    icon: Clock },
  completed: { label: 'Completed', color: 'text-blue-700',    bg: 'bg-blue-50 border-blue-200',      icon: Star },
  cancelled: { label: 'Cancelled', color: 'text-rose-700',    bg: 'bg-rose-50 border-rose-200',      icon: XCircle },
  'no-show': { label: 'No-Show',   color: 'text-gray-500',    bg: 'bg-gray-50 border-gray-200',      icon: AlertCircle },
};

export const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard',   id: 'dashboard' },
  { icon: Home,            label: 'Properties',  id: 'properties' },
  { icon: Building2,       label: 'Developments',id: 'developments' },
  { icon: CalendarCheck,   label: 'Attendance',  id: 'attendance' },
  { icon: Users,           label: 'Clients',     id: 'clients' },
  { icon: BarChart2,       label: 'Reports',     id: 'reports' },
  { icon: Settings,        label: 'Settings',    id: 'settings' },
];