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

  const handleClick = () => {
    setClicked(true);
    onFoundVolleyball();
    setTimeout(() => setClicked(false), 500);
  };

  if (clicked) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      onClick={handleClick}
      className="fixed w-12 h-12 rounded-full bg-white border-2 border-yellow-400 shadow-lg hover:scale-110 transition cursor-pointer flex items-center justify-center text-xl"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 30,
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      🏐
    </motion.button>
  );
}
