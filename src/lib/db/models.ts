import mongoose, { Model } from 'mongoose';
import bcryptjs from 'bcryptjs';

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      index: true,
    },
    name: String,
    image: String,
    password: {
      type: String,
    },
    googleId: String,
    volleyballsFound: {
      type: Number,
      default: 0,
    },
    volleyballsToday: {
      type: Number,
      default: 0,
    },
    lastPlayedDate: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcryptjs.genSalt(10);
    if (this.password) {
      this.password = await bcryptjs.hash(this.password, salt);
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

// Blog Post Schema
const blogSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    excerpt: String,
    content: String,
    image: String,
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Helper function to get or create model
function getModel<T>(name: string, schema: mongoose.Schema): Model<T> {
  if (mongoose.models[name]) {
    return mongoose.models[name] as Model<T>;
  }
  return mongoose.model<T>(name, schema);
}

export const User = getModel<any>('User', userSchema);
export const BlogPost = getModel<any>('BlogPost', blogSchema);
