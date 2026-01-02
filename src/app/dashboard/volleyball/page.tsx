'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import VolleyballCatchGame from '@/components/VolleyballCatchGame';

export const dynamic = 'force-dynamic';

export default function VolleyballPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated') {
      setIsLoading(false);
    }
  }, [status, router]);

  if (isLoading || status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        <div>
          <p className="text-sm text-yellow-400 mb-2">Exclusive</p>
          <h1 className="text-4xl font-bold text-white mb-2">🏐 Volleyball Catch Challenge</h1>
          <p className="text-gray-300 max-w-2xl">
            Catch as many volleyballs as you can in 10 seconds. Scores are saved to your account (in-memory during dev).
          </p>
        </div>

        <VolleyballCatchGame 
          onGameEnd={() => {}}
          userEmail={session.user?.email || ''}
        />
      </div>
    </div>
  );
}
