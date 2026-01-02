# Portfolio Website - Rohil Paruchuri

A modern, interactive portfolio website built with Next.js, featuring exclusive member content and authentication.

## ✅ Recent Fixes

### 1. **Google OAuth Removed**
- Removed "Sign in with Google" button since OAuth credentials weren't configured
- This eliminates the "OAuth client was not found" error

### 2. **Account Creation Now Works Instantly**
- Implemented in-memory database system for development
- No need to install MongoDB to test the site
- Account creation is now fast and provides immediate feedback
- Shows success message and automatically redirects to sign-in

### 3. **Better User Feedback**
- ✅ Success messages when account is created
- ⚠️ Clear error messages if something goes wrong
- Loading states so users know the app is working
- Registration confirmation on sign-in page

## 🚀 Features

### Public Pages
- **Home**: Introduction with hero section and skills showcase
- **About**: More details about background and experience
- **Services**: What you offer
- **Blog**: Articles and posts
- **Contact**: Get in touch via email

### Members-Only Content 🔒
After signing in, users get access to:
- **🏐 Volleyball Catching Game**: Interactive 10-second game where you catch hidden volleyballs
- **🎵 Spotify Favorites**: View favorite music (placeholder - can be connected to real Spotify API)
- **📸 Personal Gallery**: Visual representation of interests and hobbies
- **Stats Tracking**: See total volleyballs caught across all game sessions

## 🔧 How to Use

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Create an Account
- Visit http://localhost:3000
- Click "Sign In" or "Create Account"
- Fill in your details (name, email, password)
- You'll see a success message and be redirected to sign in

### 3. Sign In
- Use the email and password you just created
- You'll be redirected to your personal dashboard

### 4. Explore Member Features
- Play the volleyball game
- View Spotify favorites
- Check out the personal gallery

## 📝 Notes

- **In-Memory Database**: Currently using in-memory storage for development. Data will reset when the server restarts.
- **MongoDB (Optional)**: To use persistent storage, uncomment `MONGODB_URI` in `.env.local` and install MongoDB
- **Google OAuth (Optional)**: To enable Google sign-in, get OAuth credentials from Google Cloud Console and add them to `.env.local`

## 🎨 Customization

Edit these files to personalize:
- `src/app/page.tsx` - Homepage content
- `src/app/dashboard/page.tsx` - Dashboard and member content
- `src/app/about/page.tsx` - About page
- `src/components/Navbar.tsx` - Navigation menu

## 🔐 Security

- Passwords are hashed using bcryptjs
- NextAuth handles session management
- JWT tokens for authentication

Enjoy your portfolio site! 🎉
