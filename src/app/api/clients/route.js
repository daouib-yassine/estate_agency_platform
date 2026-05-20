import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { processClientsPayload } from '@/utils/clientEvaluator';

// Initialize a single Prisma instance for the API context
const prisma = new PrismaClient();

/**
 * GET /api/clients
 * Fetches all registered clients sorted by the most recently added.
 */
export async function GET() {
  try {
    const rawClients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Run your conditional evaluation injector over the database payload safely
    const processedClients = processClientsPayload(rawClients);

    return NextResponse.json(processedClients, { status: 200 });
  } catch (error) {
    console.error('❌ API CLIENTS GET ERROR:', error);
    return NextResponse.json({ error: 'Failed to fetch client datasets' }, { status: 500 });
  }
}

/**
 * POST /api/clients
 * Validates and securely injects a new client profile into the platform database.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, type, notes } = body;

    // 1. Core structural field validation
    if (!fullName || !email || !phone || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, phone, or type.' },
        { status: 400 }
      );
    }

    // 2. Strict system validation for custom ClientType constraints
    const validTypes = ['BUYER', 'SELLER'];
    if (!validTypes.includes(type.toUpperCase())) {
      return NextResponse.json(
        { error: `Invalid client type. Must be either 'BUYER' or 'SELLER'.` },
        { status: 400 }
      );
    }

    // 3. Prevent duplicate account registration by verifying the unique email index
    const existingClient = await prisma.client.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingClient) {
      return NextResponse.json(
        { error: 'A client profile with this email address already exists.' },
        { status: 409 } // Conflict error status code
      );
    }

    // 4. Run the insertion process on Supabase
    const newClient = await prisma.client.create({
      data: {
        fullName,
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        type: type.toUpperCase(),
        notes: notes || {}, // Fallbacks cleanly to an empty object block if null
      },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error('❌ API CLIENTS POST ERROR:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred while writing client data.' },
      { status: 500 }
    );
  }
}