'use client';

import { useEffect, useState } from 'react';
import Volleyball from './Volleyball';
import { useSession } from 'next-auth/react';

export default function VolleyballGame() {
  const { data: session } = useSession();
  const [score, setScore] = useState(0);
  const [volleyballs, setVolleyballs] = useState<number[]>([]);
  const [topScores, setTopScores] = useState<Array<{ name: string; count: number }>>([]);  const [timeLeft, setTimeLeft] = useState(15);
  const [gameActive, setGameActive] = useState(true);
  useEffect(() => {
    // Load user's volleyball score
    if (session?.user?.email) {
      fetch(`/api/volleyball?email=${session.user.email}`)\n        .then((res) => res.json())
        .then((data) => setScore(data.count || 0))
        .catch(console.error);
    }

    // Load top scores
    fetch('/api/volleyball?top=true')
      .then((res) => res.json())
      .then((data) => setTopScores(data.topScores || []))
      .catch(console.error);
  }, [session?.user?.email]);

  // Timer countdown
  useEffect(() => {
    if (!gameActive) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  // Add new volleyballs periodically while game is active
  useEffect(() => {
    if (!gameActive) return;
    
    const interval = setInterval(() => {
      if (volleyballs.length < 5) {
        setVolleyballs((prev) => [...prev, Date.now()]);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [gameActive, volleyballs.length]);

  const handleFoundVolleyball = async () => {
    if (!gameActive) return;
    
    const newScore = score + 1;
    setScore(newScore);

    if (session?.user?.email) {
      await fetch('/api/volleyball', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          count: newScore,
        }),
      });
    }

    setVolleyballs((prev) => prev.slice(1));
  };

  const handleReset = () => {
    setTimeLeft(15);
    setGameActive(true);
    setScore(0);
    setVolleyballs([]);
  };

  return (
    <>
      {/* Floating Volleyballs */}
      {gameActive && volleyballs.map((id) => (
        <Volleyball key={id} id={id} onFoundVolleyball={handleFoundVolleyball} />
      ))}

      {/* Timer */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/90 border border-yellow-400 rounded-lg p-4 z-40">
        <div className="text-center">
          <p className={`text-4xl font-bold ${timeLeft <= 5 ? 'text-red-500' : 'text-yellow-400'}`}>
            {timeLeft}s
          </p>
          {!gameActive && (
            <button
              onClick={handleReset}
              className="mt-3 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded transition"
            >
              Play Again
            </button>
          )}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="fixed top-20 right-4 bg-black/80 border border-gray-700 rounded-lg p-4 z-20 max-w-xs">
        <h3 className="text-white font-bold mb-3">🏐 Top Finders</h3>
        <div className="space-y-2">
          {topScores.slice(0, 5).map((entry, idx) => (
            <div key={idx} className="flex justify-between text-sm text-gray-300">
              <span>{idx + 1}. {entry.name}</span>
              <span className="font-bold text-yellow-400">{entry.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Your Score */}
      {session && (
        <div className="fixed bottom-4 right-4 bg-black/80 border border-gray-700 rounded-lg p-4 z-20">
          <p className="text-white">Your Volleyballs: <span className="text-yellow-400 font-bold">{score}</span></p>
        </div>
      )}
    </>
  );
}
