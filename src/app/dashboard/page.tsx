'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type SpotifyTrack = {
  id: string;
  name: string;
  artist: string;
  album?: string;
  url?: string;
  image?: string;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [volleyballCount, setVolleyballCount] = useState(0);
  const [showSpotify, setShowSpotify] = useState(false);
  const [spotifyLoading, setSpotifyLoading] = useState(false);
  const [spotifyError, setSpotifyError] = useState<string | null>(null);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const embedUrl = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_EMBED_URL;
  const useEmbed = Boolean(embedUrl);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const stored = localStorage.getItem('volleyballCount');
    if (stored) {
      setVolleyballCount(Number(stored));
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem('volleyballCount');
      if (stored) {
        setVolleyballCount(Number(stored));
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const loadSpotify = async () => {
    setSpotifyLoading(true);
    setSpotifyError(null);
    try {
      const res = await fetch('/api/spotify/playlist');
      if (!res.ok) {
        throw new Error('Failed to load playlist');
      }
      const data = await res.json();
      setTracks(data.tracks || []);
    } catch (err) {
      setSpotifyError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSpotifyLoading(false);
    }
  };

  if (status === 'loading') {
    return <div className="min-h-screen bg-gray-900 text-white p-8">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-gray-400">Welcome back</p>
            <h1 className="text-3xl font-bold">Hey {session.user?.name || 'there'} 👋</h1>
            <p className="text-gray-400 mt-1">Your personalized dashboard.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="px-4 py-2 border border-gray-700 rounded-lg text-gray-200 hover:border-gray-500 transition">
              Home
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-2">
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-yellow-500 transition">
            <h3 className="text-gray-400 text-sm mb-2">Total Volleyballs Caught</h3>
            <p className="text-5xl font-bold text-yellow-400">{volleyballCount}</p>
            <p className="text-gray-300 text-sm mt-4">Keep playing to increase! 🏐</p>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-green-500 transition">
            <h3 className="text-gray-400 text-sm mb-2">Profile Status</h3>
            <p className="text-3xl font-bold text-green-400">Active ✓</p>
            <p className="text-gray-300 text-sm mt-4">Member since today</p>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-blue-500 transition">
            <h3 className="text-gray-400 text-sm mb-2">Quick Links</h3>
            <div className="space-y-2 mt-4">
              <Link href="/" className="block text-blue-400 hover:text-blue-300 text-sm transition">
                → Back to Home
              </Link>
              <Link href="/about" className="block text-blue-400 hover:text-blue-300 text-sm transition">
                → About Me
              </Link>
              <Link href="/dashboard/volleyball" className="block text-blue-400 hover:text-blue-300 text-sm transition">
                → Volleyball Challenge
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm text-yellow-400 mb-2">New</p>
              <h2 className="text-2xl font-bold text-white mb-2">🏐 Volleyball Catch Challenge</h2>
              <p className="text-gray-300 max-w-xl">
                Play the 10-second volleyball hunt in its own tab. Catch as many as you can and track your total score.
              </p>
            </div>
            <Link
              href="/dashboard/volleyball"
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition text-center"
            >
              Play Now
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#0b1224] p-8 rounded-2xl border border-indigo-800/50 shadow-[0_20px_60px_-25px_rgba(79,70,229,0.45)] mb-4">
          <div className="flex justify-between items-center gap-4 flex-wrap mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-300/70 mb-2">Curated Weekly</p>
              <h2 className="text-3xl font-bold text-white">🎵 Rohil's Playlist of the Week</h2>
              <p className="text-gray-400 text-sm mt-1">Hand-picked tracks I'm looping right now.</p>
            </div>
            <button
              onClick={() => {
                const next = !showSpotify;
                setShowSpotify(next);
                if (next && !useEmbed && tracks.length === 0 && !spotifyLoading) {
                  loadSpotify();
                }
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition shadow-md"
            >
              {showSpotify ? 'Hide' : 'Show'} Playlist
            </button>
          </div>

          {showSpotify ? (
            <div className="space-y-4">
              {spotifyError && (
                <div className="bg-red-500/10 border border-red-500 text-red-200 text-sm rounded-lg px-4 py-3">
                  {spotifyError}
                </div>
              )}

              {useEmbed ? (
                <div className="overflow-hidden rounded-xl border border-indigo-800/40 shadow-inner bg-black/30">
                  <iframe
                    src={embedUrl}
                    width="100%"
                    height="360"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full"
                    title="Spotify playlist"
                  />
                </div>
              ) : spotifyLoading ? (
                <p className="text-gray-300">Loading playlist...</p>
              ) : tracks.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {tracks.slice(0, 10).map((track, idx) => (
                    <div
                      key={track.id}
                      className="group flex items-center gap-4 bg-white/5 border border-indigo-900/40 rounded-xl p-4 hover:border-indigo-500/70 transition"
                    >
                      <div className="relative w-14 h-14 overflow-hidden rounded-lg bg-indigo-900/60 flex items-center justify-center text-xl">
                        {track.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={track.image} alt={track.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>🎵</span>
                        )}
                        <span className="absolute -top-2 -left-2 bg-indigo-600 text-white text-xs rounded-full px-2 py-1 shadow">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold truncate">{track.name}</p>
                        <p className="text-indigo-200 text-sm truncate">{track.artist}</p>
                        {track.album && <p className="text-gray-400 text-xs truncate">{track.album}</p>}
                      </div>
                      {track.url && (
                        <a
                          href={track.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-indigo-200 hover:text-indigo-100 underline"
                        >
                          Open
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 text-gray-300 text-sm bg-white/5 border border-dashed border-indigo-700/50 rounded-xl p-4">
                  <p>
                    Add a public Spotify embed URL to <code className="font-mono">NEXT_PUBLIC_SPOTIFY_PLAYLIST_EMBED_URL</code> in <code className="font-mono">.env.local</code>, then restart dev server.
                  </p>
                  <p className="text-gray-400">Example: https://open.spotify.com/embed/playlist/your_playlist_id</p>
                  <p className="text-gray-400">With embed URL set, no client secret is required.</p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {['Vibes', 'Focus', 'Energy', 'Chill', 'Late Night', 'Workout'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-indigo-500/15 text-indigo-200 border border-indigo-700/50 rounded-full px-3 py-2 text-center"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-300">Click "Show Playlist" to see this week's picks.</p>
          )}
        </div>

        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">🛠️ My Projects</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Volleyball Catch Challenge', desc: 'Mini-game built in React/Next with live scoring.', href: '/dashboard/volleyball', tag: 'Next.js' },
              { title: 'Spotify Embed Setup', desc: 'How the playlist embed and API fallback work.', href: '/projects/spotify-embed', tag: 'Docs' },
              { title: 'NBA Games Database', desc: 'Explore historical NBA games with AI predictions.', href: 'https://project1-ochre-eight.vercel.app/', tag: 'Python/Vercel' },
            ].map((proj) => (
              <a
                key={proj.title}
                href={proj.href}
                className="block bg-gray-900/60 border border-gray-700 hover:border-indigo-500/70 rounded-xl p-4 transition shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{proj.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/15 text-indigo-200 border border-indigo-600/40">{proj.tag}</span>
                </div>
                <p className="text-gray-300 text-sm">{proj.desc}</p>
              </a>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-sm text-gray-300 bg-gray-900/70 border border-dashed border-gray-700 rounded-lg p-4">
            <p className="font-semibold text-white">Add more projects:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-300">
              <li>Create a folder in <code className="font-mono">src/app/projects/your-project</code> with a <code className="font-mono">page.tsx</code>.</li>
              <li>The link to that page will be <code className="font-mono">/projects/your-project</code>.</li>
              <li>Add an entry to the projects array above with that href, title, and description.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
