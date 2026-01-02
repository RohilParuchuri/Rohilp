import { connectDB } from '@/lib/db/mongodb';
import { User } from '@/lib/db/models';
import { InMemoryDB } from '@/lib/db/inMemoryDB';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    const mongoConnection = await connectDB();

    // Use in-memory database if MongoDB is not available
    if (!mongoConnection || !process.env.MONGODB_URI) {
      if (!email) {
        return NextResponse.json({ count: 0 });
      }
      const count = await InMemoryDB.getVolleyballCount(email);
      return NextResponse.json({ count });
    }

    // Use MongoDB
    if (!email) {
      return NextResponse.json({ count: 0 });
    }

    const user = await User.findOne({ email });
    return NextResponse.json({
      count: user?.volleyballsFound || 0,
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

    // Use in-memory database if MongoDB is not available
    if (!mongoConnection || !process.env.MONGODB_URI) {
      const newCount = await InMemoryDB.updateVolleyballCount(email);
      return NextResponse.json({ count: newCount });
    }

    // Use MongoDB
    const user = await User.findOneAndUpdate(
      { email },
      { volleyballsFound: count },
      { new: true }
    );

    return NextResponse.json(user);
  } catch (error) {
    console.error('Volleyball update error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
