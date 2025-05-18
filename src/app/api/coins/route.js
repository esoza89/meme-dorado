import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Ensure this is set in your environment variables

export async function POST(request) {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('memeDorado'); // Replace with your database name
    const collection = db.collection('coins'); // Replace with your collection name

    const coinData = await request.json();
    const result = await collection.insertOne(coinData);

    return new Response(JSON.stringify({ message: 'Coin created successfully', insertedId: result.insertedId }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error inserting document:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
