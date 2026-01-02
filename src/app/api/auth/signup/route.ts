import { connectDB } from '@/lib/db/mongodb';
import { User } from '@/lib/db/models';
import { InMemoryDB } from '@/lib/db/inMemoryDB';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing fields' },
        { status: 400 }
      );
    }

    // Try to connect to MongoDB
    const mongoConnection = await connectDB();

    if (!mongoConnection || !process.env.MONGODB_URI) {
      // Use in-memory database
      console.log('📝 Using in-memory database for user creation');
      
      try {
        const user = await InMemoryDB.createUser({ email, password, name });
        return NextResponse.json({
          id: user.id,
          email: user.email,
          name: user.name,
        });
      } catch (error: any) {
        return NextResponse.json(
          { error: error.message || 'User already exists' },
          { status: 400 }
        );
      }
    }

    // Use MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const user = await User.create({
      email,
      password,
      name,
    });

    return NextResponse.json({
      id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
