import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const dateParam = url.searchParams.get('date'); // expected format: YYYY-MM-DD

    if (!dateParam) {
      return NextResponse.json({ error: 'Missing date param' }, { status: 400 });
    }

    const start = new Date(`${dateParam}T00:00:00`);
    const end = new Date(`${dateParam}T23:59:59.999`);

    // If persistence is disabled, do not query the database — return no booked times.
    let bookedTimes: string[] = [];
    if (process.env.DISABLE_DB !== 'true') {
      const consultations = await prisma.consultation.findMany({
        where: {
          selectedDate: {
            gte: start,
            lte: end,
          },
        },
        select: {
          selectedTime: true,
        },
      });

      bookedTimes = consultations.map((c) => c.selectedTime);
    } else {
      console.info('DB persistence disabled (DISABLE_DB=true) — returning empty bookedTimes.');
    }

    return NextResponse.json({ bookedTimes });
  } catch (err: any) {
    console.error('Error fetching booked consultations:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
