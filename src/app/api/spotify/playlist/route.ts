import { NextResponse } from 'next/server';

let cachedToken: { value: string; expiresAt: number } | null = null;

const fallbackTracks = [
  {
    id: 'sample-1',
    name: 'Sample Track',
    artist: 'Set your Spotify creds',
    album: 'Fallback Playlist',
    image: null,
    url: 'https://open.spotify.com',
    durationMs: 0,
  },
];

async function getAccessToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 10_000) {
    return cachedToken.value;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify client credentials are missing');
  }

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
  });

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch Spotify token: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}

export async function GET() {
  try {
    const playlistId = process.env.SPOTIFY_PLAYLIST_ID;
    if (!playlistId) {
      return NextResponse.json({ tracks: fallbackTracks, warning: 'Playlist ID not configured; showing fallback.' });
    }

    const token = await getAccessToken();
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=10`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ tracks: fallbackTracks, warning: `Spotify error: ${res.status}; showing fallback.` }, { status: 200 });
    }

    const data = await res.json();
    const items = (data.items || []).map((item: any) => {
      const track = item.track;
      return {
        id: track.id,
        name: track.name,
        artist: (track.artists || []).map((a: any) => a.name).join(', '),
        album: track.album?.name,
        image: track.album?.images?.[1]?.url || track.album?.images?.[0]?.url || null,
        url: track.external_urls?.spotify,
        durationMs: track.duration_ms,
      };
    });

    const trimmed = items.slice(0, 10);
    return NextResponse.json({ tracks: trimmed });
  } catch (error: any) {
    console.error('Spotify playlist fetch error:', error);
    return NextResponse.json({ tracks: fallbackTracks, warning: 'Failed to load playlist; showing fallback.' }, { status: 200 });
  }
}
