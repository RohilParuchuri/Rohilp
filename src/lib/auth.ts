import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcryptjs from 'bcryptjs';
import { connectDB } from './db/mongodb';
import { User } from './db/models';
import { InMemoryDB } from './db/inMemoryDB';
import { NextRequest, NextResponse } from 'next/server';

declare module 'next-auth' {
  interface User {
    id?: string;
  }
  interface Session {
    user: {
      id?: string;
      email?: string;
      name?: string;
      image?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
  }
}

const authConfig = {
  providers: [
    // GoogleProvider - Commented out until credentials are configured
    // GoogleProvider({
    //   clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    //   allowDangerousEmailAccountLinking: true,
    // }),
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const mongoConnection = await connectDB();

          // Use in-memory database if MongoDB is not available
          if (!mongoConnection || !process.env.MONGODB_URI) {
            console.log('📝 Using in-memory database for authentication');
            const user = await InMemoryDB.findUserByEmail(credentials.email);

            if (!user || !user.password) return null;

            const isValid = await bcryptjs.compare(
              credentials.password as string,
              user.password as string
            );

            if (!isValid) return null;

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
            };
          }

          // Use MongoDB
          const user = await User.findOne({ email: credentials.email });

          if (!user || !user.password) return null;

          const isValid = await bcryptjs.compare(
            credentials.password as string,
            user.password as string
          );

          if (!isValid) return null;

          return {
            id: (user as any)._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      try {
        await connectDB();
        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          dbUser = await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            googleId: account?.providerAccountId,
          });
        }

        return true;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return true;
      }
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt' as const,
  },
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
