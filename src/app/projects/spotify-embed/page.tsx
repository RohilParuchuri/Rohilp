export default function SpotifyEmbedProject() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-300/80">Project</p>
          <h1 className="text-4xl font-bold">Spotify Playlist Embed & API Fallback</h1>
          <p className="text-gray-300 mt-2">Dashboard playlist section that prefers an embed URL when no API creds are available.</p>
        </div>

        <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 space-y-3">
          <h2 className="text-xl font-semibold">How it works</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>If <code className="font-mono">NEXT_PUBLIC_SPOTIFY_PLAYLIST_EMBED_URL</code> is set, the dashboard shows an iframe immediately.</li>
            <li>If you later add API creds, the route <code className="font-mono">/api/spotify/playlist</code> fetches top tracks and renders cards.</li>
            <li>Fallback tracks prevent UI errors when API calls fail.</li>
          </ul>
        </div>

        <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 space-y-3">
          <h2 className="text-xl font-semibold">Setup (embed only)</h2>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>In <code className="font-mono">.env.local</code>, set <code className="font-mono">NEXT_PUBLIC_SPOTIFY_PLAYLIST_EMBED_URL</code> to your playlist embed link.</li>
            <li>Restart <code className="font-mono">npm run dev</code>.</li>
            <li>Click “Show Playlist” on the dashboard to see the iframe.</li>
          </ol>
        </div>

        <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 space-y-3">
          <h2 className="text-xl font-semibold">Optional API mode</h2>
          <p className="text-gray-300">Add these to <code className="font-mono">.env.local</code> if you create a Spotify app:</p>
          <div className="bg-black/40 border border-gray-800 rounded-lg p-3 text-sm text-gray-200 font-mono whitespace-pre">
{`SPOTIFY_PLAYLIST_ID=your_playlist_id
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret`}
          </div>
          <p className="text-gray-400 text-sm">Then the dashboard will fetch tracks as cards instead of the iframe fallback.</p>
        </div>
      </div>
    </div>
  );
}
