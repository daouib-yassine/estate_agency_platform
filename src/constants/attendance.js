import { CheckCircle2, Clock, UserCheck, UserX, AlertCircle } from 'lucide-react';

export const STATUS_CONFIG = {
  present: { label: 'Present', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle2 },
  late: { label: 'Late', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: Clock },
  'checked-out': { label: 'Checked Out', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: UserCheck },
  'on-leave': { label: 'On Leave', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200', icon: UserX },
  absent: { label: 'Absent', color: 'text-gray-500', bg: 'bg-gray-50 border-gray-200', icon: AlertCircle },
};

export const DEPARTMENTS = ['All Departments', 'Sales', 'Marketing', 'Operations', 'Human Resources', 'Technology', 'Finance'];

export const parseWorkHoursToMinutes = (wh) => {
  if (!wh || wh === '–') return 0;
  const hMatch = wh.match(/(\d+)h/);
  const mMatch = wh.match(/(\d+)m/);
  return (hMatch ? parseInt(hMatch[1], 10) : 0) * 60 + (mMatch ? parseInt(mMatch[1], 10) : 0);
};

export const formatMinutes = (total) => {
  if (total === 0) return '0h';
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
};