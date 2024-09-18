// app/api/save-location/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { coords } = await request.json();

  try {
    const client = await clientPromise;
    const db = client.db('tailorMadeDB');

    await db.collection('users').updateOne(
      { email: session.user.email },
      { $set: { selectedLocation: coords } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving location:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
