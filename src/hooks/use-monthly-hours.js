import { useMemo } from 'react';

/**
 * Helper function to parse hours string (e.g., "9h 15m") into total minutes.
 * @param {string} wh 
 * @returns {number}
 */
function parseWorkHoursToMinutes(wh) {
  if (!wh || wh === '–') return 0;
  const hMatch = wh.match(/(\d+)h/);
  const mMatch = wh.match(/(\d+)m/);
  return (hMatch ? parseInt(hMatch[1], 10) : 0) * 60 + (mMatch ? parseInt(mMatch[1], 10) : 0);
}

/**
 * Custom hook to aggregate monthly attendance hours and statistics.
 * @param {Array} attendances 
 * @param {string} month - Format: "YYYY-MM"
 * @returns {Array} Sorted list of summaries by total minutes descending
 */
export function useMonthlyHours(attendances, month) {
  return useMemo(() => {
    if (!attendances || !Array.isArray(attendances)) return [];
    
    const map = new Map();
    
    attendances
      .filter(a => a.date && a.date.startsWith(month))
      .forEach(a => {
        if (!map.has(a.employeeName)) {
          map.set(a.employeeName, {
            employeeName: a.employeeName,
            role: a.role,
            department: a.department,
            totalMinutes: 0,
            daysPresent: 0,
            daysAbsent: 0,
            daysOnLeave: 0,
          });
        }
        
        const rec = map.get(a.employeeName);
        rec.totalMinutes += parseWorkHoursToMinutes(a.workHours);
        
        if (a.status === 'checked-out' || a.status === 'present' || a.status === 'late') {
          rec.daysPresent++;
        } else if (a.status === 'absent') {
          rec.daysAbsent++;
        } else if (a.status === 'on-leave') {
          rec.daysOnLeave++;
        }
      });
      
    return Array.from(map.values()).sort((a, b) => b.totalMinutes - a.totalMinutes);
  }, [attendances, month]);
}