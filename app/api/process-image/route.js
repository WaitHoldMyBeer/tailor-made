// app/api/process-image/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { imageUrl } = await request.json();

  try {
    // Send imageUrl to your Google Cloud Function
    const response = await fetch('https://your-cloud-function-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl }),
    });

    const result = await response.json();

    // Handle the response from the ML model
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
