import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/attendance
 * Fetches all attendance records alongside corresponding employee names.
 */
export async function GET() {
  try {
    const records = await prisma.attendance.findMany({
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
            role: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error('❌ API ATTENDANCE GET ERROR:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attendance records.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/attendance
 * Registers an employee shift status (Handles dynamic clock-in/clock-out updates).
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { employeeId, status, notes } = body;

    if (!employeeId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: employeeId or status.' },
        { status: 400 }
      );
    }

    // Enforce Prisma AttendanceStatus custom enum limits
    const validStatuses = ['PRESENT', 'ABSENT', 'LATE', 'LEAVE'];
    if (!validStatuses.includes(status.toUpperCase())) {
      return NextResponse.json(
        { error: `Invalid status. Choose from: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // Parse current date timestamps (Zeroed out to day-level records)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Check if an entry already exists for this employee today
    const existingRecord = await prisma.attendance.findFirst({
      where: {
        employeeId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingRecord) {
      // SCENARIO: Update existing record with a clock-out timestamp
      const updatedRecord = await prisma.attendance.update({
        where: { id: existingRecord.id },
        data: {
          checkOut: new Date(),
          // Merge newly passed JSON notes over previous note logs safely
          notes: {
            ...(typeof existingRecord.notes === 'object' ? existingRecord.notes : {}),
            ...(typeof notes === 'object' ? notes : { user_comment: notes }),
            lastModified: new Date().toISOString()
          }
        },
      });

      return NextResponse.json(
        { message: 'Clock-out logged successfully.', record: updatedRecord },
        { status: 200 }
      );
    }

    // SCENARIO: Brand new entry for the day (Clock-In)
    const newRecord = await prisma.attendance.create({
      data: {
        employeeId,
        status: status.toUpperCase(),
        date: new Date(),
        checkIn: status.toUpperCase() !== 'ABSENT' ? new Date() : null,
        notes: notes || {},
      },
    });

    return NextResponse.json(
      { message: 'Clock-in logged successfully.', record: newRecord },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ API ATTENDANCE POST ERROR:', error);
    return NextResponse.json(
      { error: 'Internal server error processing attendance entry.' },
      { status: 500 }
    );
  }
}