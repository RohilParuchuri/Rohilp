'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface VolleyballGameProps {
  onGameEnd: (score: number) => void;
  userEmail: string;
}

export default function VolleyballGame({ onGameEnd, userEmail }: VolleyballGameProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [volleyballs, setVolleyballs] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [idCounter, setIdCounter] = useState(1000);
  const [gameOver, setGameOver] = useState(false);
  const moveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
  }, [timeLeft, gameActive]);

  useEffect(() => {
    if (gameActive) {
      moveIntervalRef.current = setInterval(() => {
        setVolleyballs((prev) =>
          prev.map((vb) => ({
            ...vb,
            x: Math.random() * 90,
            y: Math.random() * 90,
          }))
        );
      }, 800);
    } else {
      if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);
    }

    return () => {
      if (moveIntervalRef.current) clearInterval(moveIntervalRef.current);
    };
  }, [gameActive]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setGameActive(true);
    setGameOver(false);
    generateVolleyballs();
  };

  const generateVolleyballs = () => {
    const newVolleyballs = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 90,
      y: Math.random() * 90,
    }));
    setIdCounter(1000);
    setVolleyballs(newVolleyballs);
  };

  const catchVolleyball = async (id: number) => {
    setVolleyballs((prev) => {
      const remaining = prev.filter((v) => v.id !== id);
      const nextId = idCounter + 1;
      setIdCounter(nextId);
      // Spawn a new ball to keep count steady
      const newBall = {
        id: nextId,
        x: Math.random() * 90,
        y: Math.random() * 90,
      };
      return [...remaining, newBall];
    });

    setScore((s) => s + 1);

    // Save to database
    try {
      await fetch('/api/volleyball', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });
    } catch (error) {
      console.error('Failed to save score:', error);
    }
  };

  const endGame = () => {
    setGameActive(false);
    setGameOver(true);
    onGameEnd(score);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">🏐 Volleyball Catch Game</h2>
        <div className="flex gap-6 items-center">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Time Left</p>
            <p className="text-3xl font-bold text-yellow-400">{timeLeft}s</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Score</p>
            <p className="text-3xl font-bold text-green-400">{score}</p>
          </div>
        </div>
      </div>

      {!gameActive && !gameOver && (
        <div className="text-center py-16">
          <p className="text-gray-300 mb-6 text-lg">
            Catch as many volleyballs as you can in 10 seconds! 🏐
          </p>
          <button
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-lg transition transform hover:scale-105"
          >
            Start Game
          </button>
        </div>
      )}

      {gameActive && (
        <div className="relative bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg h-96 overflow-hidden cursor-crosshair">
          {volleyballs.map((vb) => (
            <button
              key={vb.id}
              onClick={() => catchVolleyball(vb.id)}
              className="absolute text-4xl transform hover:scale-125 transition-transform animate-bounce"
              style={{
                left: `${vb.x}%`,
                top: `${vb.y}%`,
                animationDuration: `${Math.random() * 2 + 1}s`,
              }}
            >
              🏐
            </button>
          ))}
        </div>
      )}

      {gameOver && (
        <div className="text-center py-16">
          <h3 className="text-3xl font-bold text-white mb-4">Game Over!</h3>
          <p className="text-2xl text-yellow-400 mb-6">You caught {score} volleyballs! 🎉</p>
          <button
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-lg transition transform hover:scale-105"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
