'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FormEvent, useState, useEffect, Suspense } from 'react';

function SignInContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registeredMessage, setRegisteredMessage] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setRegisteredMessage(true);
      setTimeout(() => setRegisteredMessage(false), 5000);
    }
  }, [searchParams]);

  const handleEmailSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setLoading(false);
      } else {
        // Successful sign in
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Sign In
          </h1>
          <p className="text-gray-400 text-center mb-8">Access your personal dashboard</p>

          {registeredMessage && (
            <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded-lg mb-4 text-sm">
              ✓ Account created successfully! You can now sign in.
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSignIn} className="space-y-4 mb-6">
            <div>
              <label htmlFor="email" className="block text-white mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none transition"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-6 text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:text-blue-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center text-white">
          Loading sign-in...
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
