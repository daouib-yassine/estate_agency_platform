/**
 * @typedef {'present' | 'late' | 'checked-out' | 'on-leave' | 'absent'} AttendanceStatus
 */

const today = new Date().toISOString().split('T')[0];
const currentMonth = today.slice(0, 7); // "YYYY-MM"

/** @typedef {Object} Presence */
/** @property {string} id */
/** @property {string} employeeName */
/** @property {string} employeePhone */
/** @property {string} employeeEmail */
/** @property {string} role */
/** @property {string} department */
/** @property {string} date */
/** @property {string} checkInTime */
/** @property {string=} checkOutTime */
/** @property {AttendanceStatus} status */
/** @property {string} shift */
/** @property {string} workHours */
/** @property {string} notes */
//   id: string;
//   employeeName: string;
//   employeePhone: string;
//   employeeEmail: string;
//   role: string;
//   department: string;
//   date: string;
//   checkInTime: string;
//   checkOutTime: string;
//   status: AttendanceStatus;
//   shift: string;
//   workHours: string;
//   notes: string;
// }

/* ── Seed data spanning several days of the current month ── */
const makeDate = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

const initialAttendances = [
  // ── James Thornton (Sales) ──────────────────
  { id:'A001', employeeName:'James Thornton', employeePhone:'+1 415 555-0123', employeeEmail:'james.thornton@altis.com', role:'Senior Sales Agent', department:'Sales', date:today, checkInTime:'8:55 AM', checkOutTime:undefined, shift:'9:00 AM – 6:00 PM', status:'present', workHours:'–', notes:'On site for client presentations.' },
  { id:'A006', employeeName:'James Thornton', employeePhone:'+1 415 555-0123', employeeEmail:'james.thornton@altis.com', role:'Senior Sales Agent', department:'Sales', date:makeDate(1), checkInTime:'9:02 AM', checkOutTime:'6:01 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'9h 00m', notes:'' },
  { id:'A007', employeeName:'James Thornton', employeePhone:'+1 415 555-0123', employeeEmail:'james.thornton@altis.com', role:'Senior Sales Agent', department:'Sales', date:makeDate(2), checkInTime:'8:50 AM', checkOutTime:'5:55 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'9h 05m', notes:'' },
  { id:'A008', employeeName:'James Thornton', employeePhone:'+1 415 555-0123', employeeEmail:'james.thornton@altis.com', role:'Senior Sales Agent', department:'Sales', date:makeDate(3), checkInTime:'–', checkOutTime:undefined, shift:'9:00 AM – 6:00 PM', status:'on-leave', workHours:'–', notes:'Personal day.' },
  { id:'A009', employeeName:'James Thornton', employeePhone:'+1 415 555-0123', employeeEmail:'james.thornton@altis.com', role:'Senior Sales Agent', department:'Sales', date:makeDate(4), checkInTime:'9:10 AM', checkOutTime:'6:05 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'8h 55m', notes:'' },
  // ── Nadia Bellamy (Marketing) ───────────────
  { id:'A002', employeeName:'Nadia Bellamy', employeePhone:'+1 415 555-0456', employeeEmail:'nadia.bellamy@altis.com', role:'Marketing Manager', department:'Marketing', date:today, checkInTime:'9:42 AM', checkOutTime:undefined, shift:'9:00 AM – 6:00 PM', status:'late', workHours:'–', notes:'Traffic delay reported.' },
  { id:'A010', employeeName:'Nadia Bellamy', employeePhone:'+1 415 555-0456', employeeEmail:'nadia.bellamy@altis.com', role:'Marketing Manager', department:'Marketing', date:makeDate(1), checkInTime:'8:58 AM', checkOutTime:'6:00 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'9h 02m', notes:'' },
  { id:'A011', employeeName:'Nadia Bellamy', employeePhone:'+1 415 555-0456', employeeEmail:'nadia.bellamy@altis.com', role:'Marketing Manager', department:'Marketing', date:makeDate(2), checkInTime:'9:00 AM', checkOutTime:'5:45 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'8h 45m', notes:'Left early – dentist.' },
  { id:'A012', employeeName:'Nadia Bellamy', employeePhone:'+1 415 555-0456', employeeEmail:'nadia.bellamy@altis.com', role:'Marketing Manager', department:'Marketing', date:makeDate(3), checkInTime:'9:05 AM', checkOutTime:'6:10 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'9h 05m', notes:'' },
  // ── Carlos Rivera (Operations) ──────────────
  { id:'A003', employeeName:'Carlos Rivera', employeePhone:'+1 415 555-0789', employeeEmail:'carlos.rivera@altis.com', role:'Operations Lead', department:'Operations', date:today, checkInTime:'8:58 AM', checkOutTime:'5:30 PM', shift:'9:00 AM – 5:30 PM', status:'checked-out', workHours:'8h 32m', notes:'Left early with manager approval.' },
  { id:'A013', employeeName:'Carlos Rivera', employeePhone:'+1 415 555-0789', employeeEmail:'carlos.rivera@altis.com', role:'Operations Lead', department:'Operations', date:makeDate(1), checkInTime:'8:45 AM', checkOutTime:'5:30 PM', shift:'9:00 AM – 5:30 PM', status:'checked-out', workHours:'8h 45m', notes:'' },
  { id:'A014', employeeName:'Carlos Rivera', employeePhone:'+1 415 555-0789', employeeEmail:'carlos.rivera@altis.com', role:'Operations Lead', department:'Operations', date:makeDate(2), checkInTime:'8:55 AM', checkOutTime:'5:35 PM', shift:'9:00 AM – 5:30 PM', status:'checked-out', workHours:'8h 40m', notes:'' },
  { id:'A015', employeeName:'Carlos Rivera', employeePhone:'+1 415 555-0789', employeeEmail:'carlos.rivera@altis.com', role:'Operations Lead', department:'Operations', date:makeDate(3), checkInTime:'–', checkOutTime:undefined, shift:'9:00 AM – 5:30 PM', status:'absent', workHours:'–', notes:'No notice provided.' },
  { id:'A016', employeeName:'Carlos Rivera', employeePhone:'+1 415 555-0789', employeeEmail:'carlos.rivera@altis.com', role:'Operations Lead', department:'Operations', date:makeDate(4), checkInTime:'9:00 AM', checkOutTime:'5:30 PM', shift:'9:00 AM – 5:30 PM', status:'checked-out', workHours:'8h 30m', notes:'' },
  // ── Amara Okafor (HR) ───────────────────────
  { id:'A004', employeeName:'Amara Okafor', employeePhone:'+1 415 555-0321', employeeEmail:'amara.okafor@altis.com', role:'HR Specialist', department:'Human Resources', date:today, checkInTime:'–', checkOutTime:undefined, shift:'9:00 AM – 6:00 PM', status:'on-leave', workHours:'–', notes:'Annual leave approved.' },
  { id:'A017', employeeName:'Amara Okafor', employeePhone:'+1 415 555-0321', employeeEmail:'amara.okafor@altis.com', role:'HR Specialist', department:'Human Resources', date:makeDate(1), checkInTime:'–', checkOutTime:undefined, shift:'9:00 AM – 6:00 PM', status:'on-leave', workHours:'–', notes:'Annual leave.' },
  { id:'A018', employeeName:'Amara Okafor', employeePhone:'+1 415 555-0321', employeeEmail:'amara.okafor@altis.com', role:'HR Specialist', department:'Human Resources', date:makeDate(2), checkInTime:'9:00 AM', checkOutTime:'6:05 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'9h 05m', notes:'' },
  { id:'A019', employeeName:'Amara Okafor', employeePhone:'+1 415 555-0321', employeeEmail:'amara.okafor@altis.com', role:'HR Specialist', department:'Human Resources', date:makeDate(3), checkInTime:'8:50 AM', checkOutTime:'6:00 PM', shift:'9:00 AM – 6:00 PM', status:'checked-out', workHours:'9h 10m', notes:'' },
  // ── Felix Hoffman (Technology) ──────────────
  { id:'A005', employeeName:'Felix Hoffman', employeePhone:'+1 415 555-0654', employeeEmail:'felix.hoffman@altis.com', role:'Software Engineer', department:'Technology', date:today, checkInTime:'–', checkOutTime:undefined, shift:'10:00 AM – 7:00 PM', status:'absent', workHours:'–', notes:'No notice provided.' },
  { id:'A020', employeeName:'Felix Hoffman', employeePhone:'+1 415 555-0654', employeeEmail:'felix.hoffman@altis.com', role:'Software Engineer', department:'Technology', date:makeDate(1), checkInTime:'10:05 AM', checkOutTime:'7:00 PM', shift:'10:00 AM – 7:00 PM', status:'checked-out', workHours:'8h 55m', notes:'' },
  { id:'A021', employeeName:'Felix Hoffman', employeePhone:'+1 415 555-0654', employeeEmail:'felix.hoffman@altis.com', role:'Software Engineer', department:'Technology', date:makeDate(2), checkInTime:'10:30 AM', checkOutTime:'7:10 PM', shift:'10:00 AM – 7:00 PM', status:'checked-out', workHours:'8h 40m', notes:'Arrived late – remote standup overran.' },
  { id:'A022', employeeName:'Felix Hoffman', employeePhone:'+1 415 555-0654', employeeEmail:'felix.hoffman@altis.com', role:'Software Engineer', department:'Technology', date:makeDate(3), checkInTime:'9:58 AM', checkOutTime:'7:05 PM', shift:'10:00 AM – 7:00 PM', status:'checked-out', workHours:'9h 07m', notes:'' },
  { id:'A023', employeeName:'Felix Hoffman', employeePhone:'+1 415 555-0654', employeeEmail:'felix.hoffman@altis.com', role:'Software Engineer', department:'Technology', date:makeDate(4), checkInTime:'10:02 AM', checkOutTime:'7:00 PM', shift:'10:00 AM – 7:00 PM', status:'checked-out', workHours:'8h 58m', notes:'' },
];

const departments = [
  'All Departments','Sales','Marketing','Operations','Human Resources','Technology','Finance',
];

const statusConfig = {
  present:       { label:'Present',     color:'text-emerald-700', bg:'bg-emerald-50 border-emerald-200', icon:CheckCircle2 },
  late:          { label:'Late',        color:'text-amber-700',   bg:'bg-amber-50 border-amber-200',     icon:Clock        },
  'checked-out': { label:'Checked Out', color:'text-blue-700',    bg:'bg-blue-50 border-blue-200',       icon:UserCheck    },
  'on-leave':    { label:'On Leave',    color:'text-rose-700',    bg:'bg-rose-50 border-rose-200',       icon:UserX        },
  absent:        { label:'Absent',      color:'text-gray-500',    bg:'bg-gray-50 border-gray-200',       icon:AlertCircle  },
};

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const fmt = (d) =>
  new Date(d).toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' });

function parseWorkHoursToMinutes(wh) {
  if (!wh || wh === '–') return 0;
  const hMatch = wh.match(/(\d+)h/);
  const mMatch = wh.match(/(\d+)m/);
  return (hMatch ? parseInt(hMatch[1], 10) : 0) * 60 + (mMatch ? parseInt(mMatch[1], 10) : 0);
}

function formatMinutes(total) {
  if (total === 0) return '0h';
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}
export const navItems = [
  { icon: 'LayoutDashboard', label: 'Dashboard',    id: 'dashboard'    },
  { icon: 'Home',            label: 'Properties',   id: 'properties'   },
  { icon: 'Building2',       label: 'Developments', id: 'developments' },
  { icon: 'CalendarCheck',   label: 'Attendance',   id: 'attendance'   },
  { icon: 'Users',           label: 'Clients',      id: 'clients'      },
  { icon: 'BarChart2',       label: 'Reports',      id: 'reports'      },
  { icon: 'Settings',        label: 'Settings',     id: 'settings'     },
];