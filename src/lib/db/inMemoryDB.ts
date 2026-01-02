// In-memory database for development (when MongoDB is not available)
import bcryptjs from 'bcryptjs';

interface InMemoryUser {
  id: string;
  email: string;
  name: string;
  password: string;
  image?: string;
  volleyballsFound: number;
  createdAt: Date;
}

// Simple in-memory storage (persist across hot-reloads using global)
const globalAny = global as any;
if (!globalAny.__IN_MEMORY_USERS) {
  globalAny.__IN_MEMORY_USERS = new Map<string, InMemoryUser>();
  globalAny.__IN_MEMORY_USER_ID = 1;
}

const users: Map<string, InMemoryUser> = globalAny.__IN_MEMORY_USERS;
let userIdCounter: number = globalAny.__IN_MEMORY_USER_ID;

export const InMemoryDB = {
  async createUser(data: { email: string; name: string; password: string }) {
    // Check if user exists
    const existingUser = Array.from(users.values()).find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);

    // Create user
    const id = `user_${userIdCounter++}`;
    const user: InMemoryUser = {
      id,
      email: data.email.toLowerCase(),
      name: data.name,
      password: hashedPassword,
      volleyballsFound: 0,
      createdAt: new Date(),
    };

    users.set(id, user);
    globalAny.__IN_MEMORY_USER_ID = userIdCounter;
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  },

  async findUserByEmail(email: string) {
    return Array.from(users.values()).find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
  },

  async updateVolleyballCount(email: string) {
    const user = await this.findUserByEmail(email);
    if (user) {
      user.volleyballsFound += 1;
      users.set(user.id, user);
      return user.volleyballsFound;
    }
    return 0;
  },

  async getVolleyballCount(email: string) {
    const user = await this.findUserByEmail(email);
    return user?.volleyballsFound || 0;
  },

  // For debugging
  getAllUsers() {
    return Array.from(users.values()).map(({ password, ...user }) => user);
  },
};
