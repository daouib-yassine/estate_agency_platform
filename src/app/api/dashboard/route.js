import { NextResponse } from 'next/server';
// Explicitly target the fresh .js file extension directly
import { CLIENT_FALLBACK, ATTENDANCE_FALLBACK } from '../../../constants/fallbacks.js';

export async function GET() {
  try {
    const clientsList = Array.isArray(CLIENT_FALLBACK) ? CLIENT_FALLBACK : [];
    const attendancesList = Array.isArray(ATTENDANCE_FALLBACK) ? ATTENDANCE_FALLBACK : [];

    const activeMeetingsCount = attendancesList.length > 0
      ? attendancesList.filter(a => a && typeof a === 'object' && a.status !== 'Cancelled').length
      : 0;

    return NextResponse.json({
      success: true,
      metrics: {
        totalClients: clientsList.length,
        activeAttendances: activeMeetingsCount,
        managedLands: 24,
        agencyRevenue: 14200
      },
      clients: clientsList,
      attendances: attendancesList
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: "Dashboard engine sync failure"
    }, { status: 500 });
  }
}