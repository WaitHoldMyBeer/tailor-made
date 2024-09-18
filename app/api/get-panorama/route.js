// app/api/get-panorama/route.js
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

    if (!user || !user.selectedLocation) {
      return NextResponse.json({ success: false, error: 'No location selected' }, { status: 400 });
    }

    const { lat, lng } = user.selectedLocation;

    const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    return NextResponse.json({ success: true, streetViewUrl });
  } catch (error) {
    console.error('Error fetching panorama:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
