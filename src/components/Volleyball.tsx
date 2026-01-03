'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface VolleyballProps {
  id: number;
  onFoundVolleyball: () => void;
}

export default function Volleyball({ id, onFoundVolleyball }: VolleyballProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setPosition({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth - 50 : 0),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight - 50 : 0),
    });
  }, []);

  const handleInteraction = () => {
    if (clicked) return;
    setClicked(true);
    onFoundVolleyball();
    setTimeout(() => setClicked(false), 300);
  };

  if (clicked) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      onClick={handleInteraction}
      onPointerDown={handleInteraction}
      onTouchStart={handleInteraction}
      className="fixed w-28 h-28 rounded-full bg-white border-4 border-yellow-400 shadow-2xl hover:scale-110 transition cursor-pointer flex items-center justify-center text-6xl active:scale-90"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 30,
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
    >
      🏐
    </motion.button>
  );
}
