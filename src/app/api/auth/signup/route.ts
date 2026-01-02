import { connectDB } from '@/lib/db/mongodb';
import { InMemoryDB } from '@/lib/db/inMemoryDB';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Please fill in all fields' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Try MongoDB first
    const mongoConnection = await connectDB();
    
    if (mongoConnection) {
      const db = mongoConnection.connection.db;
      
      // Check for existing user
      const existingUser = await db.collection('users').findOne({ email: normalizedEmail });
      if (existingUser) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 400 }
        );
      }

      // Hash password
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Insert user directly
      const result = await db.collection('users').insertOne({
        email: normalizedEmail,
        password: hashedPassword,
        name: name.trim(),
        volleyballsFound: 0,
        volleyballsToday: 0,
        lastPlayedDate: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return NextResponse.json({
        id: result.insertedId.toString(),
        email: normalizedEmail,
        name: name.trim(),
      });
    }

    // Fallback to in-memory DB
    try {
      const user = await InMemoryDB.createUser({ email: normalizedEmail, password, name: name.trim() });
      return NextResponse.json({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    } catch (error: any) {
      console.error('InMemory signup error:', error);
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Signup error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: `Signup failed: ${error.message}` },
      { status: 500 }
    );
  }
}
