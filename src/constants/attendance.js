import { CheckCircle2, Clock, UserCheck, UserX, AlertCircle } from 'lucide-react';

export const today = new Date().toISOString().split('T')[0];
export const currentMonth = today.slice(0, 7); 

const makeDate = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

// ── MULTI-LINGUAL DATA TRANSLATION MAP FOR STATIC STRINGS ──
export const ATTENDANCE_DATA_LOCALES = {
  fr: {
    dir: 'ltr',
    notes: {
      A001: "Sur site pour les présentations clients.",
      A006: "",
      A007: "",
      A008: "Journée de congé personnel.",
      A009: "",
      A002: "Retard dû aux embouteillages signalé.",
      A010: "",
      A011: "Partie plus tôt – rendez-vous chez le dentiste.",
      A012: "",
      A003: "Partie plus tôt avec l'autorisation du responsable.",
      A013: "",
      A014: "",
      A015: "Aucun préavis fourni.",
      A016: "",
      A004: "Congé annuel approuvé.",
      A017: "Congé annuel.",
      A018: "",
      A019: "",
      A005: "Aucun préavis fourni.",
      A020: "",
      A021: "Arrivée tardive – débordement de la réunion d'équipe à distance.",
      A022: "",
      A023: ""
    }
  },
  en: {
    dir: 'ltr',
    notes: {
      C001: "Interested in 5-bed. Pre-approved. Serious buyer." // Retained mapping logic validation
    },
    notes: {
      A001: "On site for client presentations.",
      A006: "",
      A007: "",
      A008: "Personal day.",
      A009: "",
      A002: "Traffic delay reported.",
      A010: "",
      A011: "Left early – dentist.",
      A012: "",
      A003: "Left early with manager approval.",
      A013: "",
      A014: "",
      A015: "No notice provided.",
      A016: "",
      A004: "Annual leave approved.",
      A017: "Annual leave.",
      A018: "",
      A019: "",
      A005: "No notice provided.",
      A020: "",
      A021: "Arrived late – remote standup overran.",
      A022: "",
      A023: ""
    }
  },
  ar: {
    dir: 'rtl',
    notes: {
      A001: "في الموقع لتقديم العروض التقديمية للعملاء.",
      A006: "",
      A007: "",
      A008: "إجازة شخصية.",
      A009: "",
      A002: "تم الإبلاغ عن تأخير بسبب حركة المرور.",
      A010: "",
      A011: "غادر مبكراً – موعد طبيب الأسنان.",
      A012: "",
      A003: "غادر مبكراً بموافقة المدير.",
      A013: "",
      A014: "",
      A015: "لم يتم تقديم أي إشعار مسبق.",
      A016: "",
      A004: "تمت الموافقة على الإجازة السنوية.",
      A017: "إجازة سنوية.",
      A018: "",
      A019: "",
      A005: "لم يتم تقديم أي إشعار مسبق.",
      A020: "",
      A021: "وصل متأخراً – تجاوز الاجتماع الصباحي عن بعد وقته المحدد.",
      A022: "",
      A023: ""
    }
  }
};

// ── MULTI-LINGUAL COMPONENT SCHEMA CONFIGURATIONS ──
export const globalAttendanceLocales = {
  fr: {
    statuses: { present: 'Présent', late: 'En Retard', 'checked-out': 'Départ Validé', 'on-leave': 'En Congé', absent: 'Absent' },
    depts: { 'All Departments': 'Tous les départements', 'Sales': 'Ventes', 'Marketing': 'Marketing', 'Operations': 'Opérations', 'Human Resources': 'Ressources Humaines', 'Technology': 'Technologie', 'Finance': 'Finance' }
  },
  en: {
    statuses: { present: 'Present', late: 'Late', 'checked-out': 'Checked Out', 'on-leave': 'On Leave', absent: 'Absent' },
    depts: { 'All Departments': 'All Departments', 'Sales': 'Sales', 'Marketing': 'Marketing', 'Operations': 'Operations', 'Human Resources': 'Human Resources', 'Technology': 'Technology', 'Finance': 'Finance' }
  },
  ar: {
    statuses: { present: 'حاضر', late: 'متأخر', 'checked-out': 'تم تسجيل الخروج', 'on-leave': 'في إجازة', absent: 'غائب' },
    depts: { 'All Departments': 'جميع الأقسام', 'Sales': 'المبيعات', 'Marketing': 'التسويق', 'Operations': 'العمليات والتنفيذ', 'Human Resources': 'الموارد البشرية', 'Technology': 'التكنولوجيا والمعلومات', 'Finance': 'المالية والمحاسبة' }
  }
};

// Raw initial database seed records
export const initialAttendances = [
  { id:'A001', employeeName:'James Thornton', employeePhone:'+1 415 555-0123', employeeEmail:'james.thornton@altis.com', role:'Senior Sales Agent', department:'Sales', date:today, checkInTime:'8:55 AM', checkOutTime:undefined, shift:'9:00 AM – 6:00 PM', status:'present', workHours:'–' },
  { id:'A006', employeeName:'James Thornton', employeePhone:'+1 415 555-0123', employeeEmail:'james.thornton@altis.com', role:'Senior Sales Agent', department:'Sales', date:makeDate(1), checkInTime:'9:02 AM', checkOutTime:'6:01 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'9h 00m' },
  { id:'A007', employeeName:'James Thornton', employeePhone:'+1 415 555-0123', employeeEmail:'james.thornton@altis.com', role:'Senior Sales Agent', department:'Sales', date:makeDate(2), checkInTime:'8:50 AM', checkOutTime:'5:55 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'9h 05m' },
  { id:'A008', employeeName:'James Thornton', employeePhone:'+1 415 555-0123', employeeEmail:'james.thornton@altis.com', role:'Senior Sales Agent', department:'Sales', date:makeDate(3), checkInTime:'–', checkOutTime:undefined, shift:'9:00 AM – 6:00 PM', status:'on-leave', workHours:'–' },
  { id:'A009', employeeName:'James Thornton', employeePhone:'+1 415 555-0123', employeeEmail:'james.thornton@altis.com', role:'Senior Sales Agent', department:'Sales', date:makeDate(4), checkInTime:'9:10 AM', checkOutTime:'6:05 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'8h 55m' },
  { id:'A002', employeeName:'Nadia Bellamy', employeePhone:'+1 415 555-0456', employeeEmail:'nadia.bellamy@altis.com', role:'Marketing Manager', department:'Marketing', date:today, checkInTime:'9:42 AM', checkOutTime:undefined, shift:'9:00 AM – 6:00 PM', status:'late', workHours:'–' },
  { id:'A010', employeeName:'Nadia Bellamy', employeePhone:'+1 415 555-0456', employeeEmail:'nadia.bellamy@altis.com', role:'Marketing Manager', department:'Marketing', date:makeDate(1), checkInTime:'8:58 AM', checkOutTime:'6:00 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'9h 02m' },
  { id:'A011', employeeName:'Nadia Bellamy', employeePhone:'+1 415 555-0456', employeeEmail:'nadia.bellamy@altis.com', role:'Marketing Manager', department:'Marketing', date:makeDate(2), checkInTime:'9:00 AM', checkOutTime:'5:45 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'8h 45m' },
  { id:'A012', employeeName:'Nadia Bellamy', employeePhone:'+1 415 555-0456', employeeEmail:'nadia.bellamy@altis.com', role:'Marketing Manager', department:'Marketing', date:makeDate(3), checkInTime:'9:05 AM', checkOutTime:'6:10 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'9h 05m' },
  { id:'A003', employeeName:'Carlos Rivera', employeePhone:'+1 415 555-0789', employeeEmail:'carlos.rivera@altis.com', role:'Operations Lead', department:'Operations', date:today, checkInTime:'8:58 AM', checkOutTime:'5:30 PM', shift:'9:00 AM – 5:30 PM', status:'checked-out', workHours:'8h 32m' },
  { id:'A013', employeeName:'Carlos Rivera', employeePhone:'+1 415 555-0789', employeeEmail:'carlos.rivera@altis.com', role:'Operations Lead', department:'Operations', date:makeDate(1), checkInTime:'8:45 AM', checkOutTime:'5:30 PM', shift:'9:00 AM – 5:30 PM', status:'checked-out', workHours:'8h 45m' },
  { id:'A014', employeeName:'Carlos Rivera', employeePhone:'+1 415 555-0789', employeeEmail:'carlos.rivera@altis.com', role:'Operations Lead', department:'Operations', date:makeDate(2), checkInTime:'8:55 AM', checkOutTime:'5:35 PM', shift:'9:00 AM – 5:30 PM', status:'checked-out', workHours:'8h 40m' },
  { id:'A015', employeeName:'Carlos Rivera', employeePhone:'+1 415 555-0789', employeeEmail:'carlos.rivera@altis.com', role:'Operations Lead', department:'Operations', date:makeDate(3), checkInTime:'–', checkOutTime:undefined, shift:'9:00 AM – 5:30 PM', status:'absent', workHours:'–' },
  { id:'A016', employeeName:'Carlos Rivera', employeePhone:'+1 415 555-0789', employeeEmail:'carlos.rivera@altis.com', role:'Operations Lead', department:'Operations', date:makeDate(4), checkInTime:'9:00 AM', checkOutTime:'5:30 PM', shift:'9:00 AM – 5:30 PM', status:'checked-out', workHours:'8h 30m' },
  { id:'A004', employeeName:'Amara Okafor', employeePhone:'+1 415 555-0321', employeeEmail:'amara.okafor@altis.com', role:'HR Specialist', department:'Human Resources', date:today, checkInTime:'–', checkOutTime:undefined, shift:'9:00 AM – 6:00 PM', status:'on-leave', workHours:'–' },
  { id:'A017', employeeName:'Amara Okafor', employeePhone:'+1 415 555-0321', employeeEmail:'amara.okafor@altis.com', role:'HR Specialist', department:'Human Resources', date:makeDate(1), checkInTime:'–', checkOutTime:undefined, shift:'9:00 AM – 6:00 PM', status:'on-leave', workHours:'–' },
  { id:'A018', employeeName:'Amara Okafor', employeePhone:'+1 415 555-0321', employeeEmail:'amara.okafor@altis.com', role:'HR Specialist', department:'Human Resources', date:makeDate(2), checkInTime:'9:00 AM', checkOutTime:'6:05 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'9h 05m' },
  { id:'A019', employeeName:'Amara Okafor', employeePhone:'+1 415 555-0321', employeeEmail:'amara.okafor@altis.com', role:'HR Specialist', department:'Human Resources', date:makeDate(3), checkInTime:'8:50 AM', checkOutTime:'6:00 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'9h 10m' },
  { id:'A005', employeeName:'Felix Hoffman', employeePhone:'+1 415 555-0654', employeeEmail:'felix.hoffman@altis.com', role:'Software Engineer', department:'Technology', date:today, checkInTime:'–', checkOutTime:undefined, shift:'10:00 AM – 7:00 PM', status:'absent', workHours:'–' },
  { id:'A020', employeeName:'Felix Hoffman', employeePhone:'+1 415 555-0654', employeeEmail:'felix.hoffman@altis.com', role:'Software Engineer', department:'Technology', date:makeDate(1), checkInTime:'10:05 AM', checkOutTime:'7:00 PM', shift:'10:00 AM – 7:00 PM', status:'checked-out', workHours:'8h 55m' },
  { id:'A021', employeeName:'Felix Hoffman', employeePhone:'+1 415 555-0654', employeeEmail:'felix.hoffman@altis.com', role:'Software Engineer', department:'Technology', date:makeDate(2), checkInTime:'10:30 AM', checkOutTime:'7:10 PM', shift:'10:00 AM – 7:00 PM', status:'checked-out', workHours:'8h 40m' },
  { id:'A022', employeeName:'Felix Hoffman', employeePhone:'+1 415 555-0654', employeeEmail:'felix.hoffman@altis.com', role:'Software Engineer', department:'Technology', date:makeDate(3), checkInTime:'9:58 AM', checkOutTime:'7:05 PM', shift:'10:00 AM – 7:00 PM', status:'checked-out', workHours:'9h 07m' },
  { id:'A023', employeeName:'Felix Hoffman', employeePhone:'+1 415 555-0654', employeeEmail:'felix.hoffman@altis.com', role:'Software Engineer', department:'Technology', date:makeDate(4), checkInTime:'10:02 AM', checkOutTime:'7:00 PM', shift:'10:00 AM – 7:00 PM', status:'checked-out', workHours:'8h 58m' },
];

export const departments = [
  'All Departments', 'Sales', 'Marketing', 'Operations', 'Human Resources', 'Technology', 'Finance'
];

export const statusConfig = {
  present:       { color:'text-emerald-700', bg:'bg-emerald-50 border-emerald-200', icon:CheckCircle2 },
  late:          { color:'text-amber-700',   bg:'bg-amber-50 border-amber-200',    icon:Clock        },
  'checked-out': { color:'text-blue-700',    bg:'bg-blue-50 border-blue-200',       icon:UserCheck    },
  'on-leave':    { color:'text-rose-700',    bg:'bg-rose-50 border-rose-200',       icon:UserX        },
  absent:        { color:'text-gray-500',    bg:'bg-gray-50 border-gray-200',       icon:AlertCircle  },
};

export const fmt = (d, lang = 'fr') => {
  const localeSelection = lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-US';
  return new Date(d).toLocaleDateString(localeSelection, { weekday:'short', month:'short', day:'numeric' });
};

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