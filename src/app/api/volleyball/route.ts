import { connectDB } from '@/lib/db/mongodb';
import { InMemoryDB } from '@/lib/db/inMemoryDB';
import { NextResponse } from 'next/server';

// Helper to get today's date as YYYY-MM-DD
function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    const mongoConnection = await connectDB();

    // Use in-memory database if MongoDB is not available
    if (!mongoConnection || !process.env.MONGODB_URI) {
      if (!email) {
        return NextResponse.json({ count: 0, todayCount: 0 });
      }
      const count = await InMemoryDB.getVolleyballCount(email);
      return NextResponse.json({ count, todayCount: count });
    }

    // Use MongoDB
    if (!email) {
      return NextResponse.json({ count: 0, todayCount: 0 });
    }

    const db = mongoConnection.connection.db;
    const user = await db.collection('users').findOne({ email });
    const today = getTodayString();
    
    // Check if lastPlayedDate is today
    const todayCount = user?.lastPlayedDate === today ? (user?.volleyballsToday || 0) : 0;
    
    return NextResponse.json({
      count: user?.volleyballsFound || 0,
      todayCount: todayCount,
    });
  } catch (error) {
    console.error('Volleyball API error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const mongoConnection = await connectDB();
    const today = getTodayString();

    // Use in-memory database if MongoDB is not available
    if (!mongoConnection || !process.env.MONGODB_URI) {
      const newCount = await InMemoryDB.updateVolleyballCount(email);
      return NextResponse.json({ count: newCount, todayCount: newCount });
    }

    const db = mongoConnection.connection.db;
    
    // First, get the user to check if we need to reset today's count
    const existingUser = await db.collection('users').findOne({ email });
    
    let updateQuery;
    if (existingUser && existingUser.lastPlayedDate === today) {
      // Same day - just increment both counters
      updateQuery = {
        $inc: { volleyballsFound: 1, volleyballsToday: 1 },
        $set: { updatedAt: new Date() },
      };
    } else {
      // New day - reset today's count to 1
      updateQuery = {
        $inc: { volleyballsFound: 1 },
        $set: { volleyballsToday: 1, lastPlayedDate: today, updatedAt: new Date() },
      };
    }

    const result = await db.collection('users').findOneAndUpdate(
      { email },
      updateQuery,
      { returnDocument: 'after', upsert: true }
    );

    return NextResponse.json({ 
      count: result?.volleyballsFound || 0,
      todayCount: result?.volleyballsToday || 0,
    });
  } catch (error) {
    console.error('Volleyball update error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
}
