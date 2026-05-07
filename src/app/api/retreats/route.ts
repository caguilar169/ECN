import { NextResponse } from 'next/server';

const retreats = [
  { id: 'r1', name: 'Retiro Mayo', location: 'Casa de retiros', startDate: '2026-05-15', endDate: '2026-05-17' }
];

export async function GET() {
  return NextResponse.json({ data: retreats });
}
