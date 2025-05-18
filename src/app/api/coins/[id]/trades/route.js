// app/api/coins/[id]/trades/route.js

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function POST(request, context) {
  const { params } = await context;
  const { id } = await params;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('memeDorado');
    const collection = db.collection('coins');

    const body = await request.json();
    const { price } = await body;

    if (typeof price !== 'number') {
      return new Response(JSON.stringify({ message: 'Invalid price format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const tradeEntry = price

    const result = await collection.updateOne(
      { id: parseInt(id, 10) },
      { $push: { trades: tradeEntry } }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: 'Token not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Trade added successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding trade:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}
