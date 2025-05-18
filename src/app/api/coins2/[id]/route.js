import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Ensure this environment variable is set

export async function GET(request, context) {
  const { params } = await context;
  const { id } = await params;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('memeDorado'); // Replace with your database name
    const collection = db.collection('coins'); // Replace with your collection name

    const token = await collection.findOne({ id: parseInt(id, 10) });

    if (!token) {
      return new Response(JSON.stringify({ message: 'Token not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
        imageURL: token.imageURL,
        creatorMessage: token.creatorMessage,
        Social1: token.socialMediaLinks.rSocial1 || null,
        Social2: token.socialMediaLinks.rSocial2 || null,
        trades: token.trades || []
     }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching token:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}
