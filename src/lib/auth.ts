import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { connectDB } from './db/mongodb';
import { InMemoryDB } from './db/inMemoryDB';

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
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.toLowerCase().trim();

        try {
          // Try MongoDB first
          const mongoConnection = await connectDB();
          
          if (mongoConnection) {
            const db = mongoConnection.connection.db;
            const user = await db.collection('users').findOne({ email });

            if (user && user.password) {
              const isValid = await bcryptjs.compare(credentials.password, user.password);
              if (isValid) {
                return {
                  id: user._id.toString(),
                  email: user.email,
                  name: user.name,
                  image: user.image,
                };
              }
            }
            return null;
          }

          // Fallback to in-memory DB
          const memUser = await InMemoryDB.findUserByEmail(email);
          if (!memUser || !memUser.password) {
            return null;
          }

          const isValid = await bcryptjs.compare(credentials.password, memUser.password);
          if (!isValid) {
            return null;
          }

          return {
            id: memUser.id,
            email: memUser.email,
            name: memUser.name,
            image: memUser.image,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
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
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
