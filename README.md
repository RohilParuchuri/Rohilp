# 🚀 Chess Moderno - Personal & Business Website

A full-stack modern website with authentication, volleyball easter egg game, and user dashboard.

## ✨ Features

- **📄 Pages**: Home, About, Services, Blog, Contact
- **🔐 Authentication**: Email/Password + Google OAuth
- **👤 User Dashboard**: Personal profile, photo gallery, Spotify integration placeholder
- **🏐 Volleyball Easter Egg**: Random volleyball animations throughout the site with leaderboard
- **🌙 Dark Mode Toggle**: Switch between light and dark themes
- **🎨 Design**: Black & grey theme with handwriting fonts
- **📱 Responsive**: Mobile-friendly design

## 🛠️ Tech Stack

- **Frontend**: React, Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express (via Next.js API routes)
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS + Custom fonts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Google OAuth credentials (optional)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables** (`.env.local`)
   ```
   MONGODB_URI=mongodb://localhost:27017/chess-moderno
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-change-in-production
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

## 📋 Pages

### Public Pages
- **Home** (`/`) - Hero section with featured services
- **About** (`/about`) - Personal introduction and skills
- **Services** (`/services`) - Service offerings and process
- **Blog** (`/blog`) - Blog posts
- **Contact** (`/contact`) - Contact form

### Authentication Pages
- **Sign In** (`/signin`) - Email/password or Google sign in
- **Sign Up** (`/signup`) - Create new account

### Protected Pages
- **Dashboard** (`/dashboard`) - User profile, volleyball score, photo gallery

## 🏐 Volleyball Easter Egg

The volleyball game is built into the layout:
- Random volleyballs appear across the screen
- Click them to collect points
- Your score is saved to the database
- Top 5 finders are displayed on the leaderboard
- Compete with other visitors!

## 🔐 Authentication

### Email/Password
- Sign up with email and password
- Passwords are hashed with bcryptjs
- Session management with NextAuth.js JWT

### Google OAuth
- Sign in with Google account
- Automatic user creation on first login
- Account linking if email matches

## 📊 Database Schema

### User Model
```typescript
{
  email: String (unique)
  name: String
  image: String
  password: String (hashed)
  googleId: String
  volleyballsFound: Number (default: 0)
  createdAt: Date
  updatedAt: Date
}
```

### Blog Model
```typescript
{
  title: String
  slug: String
  excerpt: String
  content: String
  image: String
  published: Boolean
  createdAt: Date
  updatedAt: Date
}
```

## 🎨 Customization

### Update Personal Info
Edit these files with your information:
- `src/app/about/page.tsx` - About section
- `src/app/services/page.tsx` - Your services
- `src/components/Navbar.tsx` - Your RP logo
- `src/app/contact/page.tsx` - Contact details

### Add Blog Posts
Add blog entries to `src/app/blog/page.tsx` or connect a CMS

### Customize Colors
- Edit Tailwind config in `tailwind.config.ts`
- Main colors: Black (#000), Grey (#808080), Blue (#3B82F6)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Environment Variables on Vercel
Set these in your Vercel dashboard:
- `MONGODB_URI`
- `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### Build
```bash
npm run build
npm start
```

## 🔗 API Routes

### Volleyball API
- `GET /api/volleyball` - Get user/top scores
- `POST /api/volleyball` - Update volleyball count

### Auth API
- `POST /api/auth/signin` - Sign in (NextAuth)
- `POST /api/auth/signout` - Sign out
- `POST /api/auth/signup` - Create account

### NextAuth Routes
- `GET /api/auth/[...nextauth]` - NextAuth handlers

## 📝 Notes

- Volleyball game requires user to be signed in for persistence
- Blog posts currently are static, can be connected to CMS
- Spotify integration is a placeholder
- Google OAuth requires credentials from Google Cloud Console

## 🤝 Contributing

Feel free to fork and customize this for your needs!

## 📄 License

MIT License - feel free to use this project as a template

---

Made with ❤️ by Rohil
