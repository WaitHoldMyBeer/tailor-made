// app/api/get-location/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('tailorMadeDB');

    const user = await db.collection('users').findOne(
      { email: session.user.email },
      { projection: { selectedLocation: 1 } }
    );

    // Check if the user exists and if they have a selectedLocation
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    if (!user.selectedLocation) {
      return NextResponse.json({ success: false, error: 'Location not selected' }, { status: 400 });
    }

    return NextResponse.json({ success: true, location: user.selectedLocation });
  } catch (error) {
    console.error('Error retrieving location:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
