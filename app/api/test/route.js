// app/api/test/route.js
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Fetch data from Google Cloud Function
    const response = await fetch('https://us-central1-arboreal-lyceum-407420.cloudfunctions.net/hello_world', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Tailor Made' }),
    });
    const message = await response.text();

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('tailorMadeDB');

    // Insert a document
    const result = await db.collection('testCollection').insertOne({ message });

    // Retrieve the document
    const document = await db
      .collection('testCollection')
      .findOne({ _id: result.insertedId });

    return NextResponse.json({ success: true, data: document });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
