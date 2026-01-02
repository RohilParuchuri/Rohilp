import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

// User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
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
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next: any) {
  const doc = this as any;
  if (!doc.isModified('password')) return next();
  
  try {
    const salt = await bcryptjs.genSalt(10);
    if (doc.password) {
      doc.password = await bcryptjs.hash(doc.password as string, salt);
    }
    next();
  } catch (error) {
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

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogSchema);
