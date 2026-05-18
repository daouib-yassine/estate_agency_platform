// utils/attendanceHelpers.js
export const fmt = (d) =>
  new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

export function parseWorkHoursToMinutes(wh) {
  if (!wh || wh === '–') return 0;
  const hMatch = wh.match(/(\d+)h/);
  const mMatch = wh.match(/(\d+)m/);
  return (hMatch ? parseInt(hMatch[1], 10) : 0) * 60 + (mMatch ? parseInt(mMatch[1], 10) : 0);
}

export function formatMinutes(total) {
  if (total === 0) return '0h';
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}