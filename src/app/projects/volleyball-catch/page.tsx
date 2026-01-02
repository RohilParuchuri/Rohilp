export default function VolleyballCatchProject() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-indigo-300/80">Project</p>
          <h1 className="text-4xl font-bold">Volleyball Catch Challenge</h1>
          <p className="text-gray-300 mt-2">A 10-second catch game built in Next.js with client state and a dedicated dashboard tab.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 bg-gray-900/70 border border-gray-800 rounded-xl p-6">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">What it is</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Responsive mini-game with moving targets and click-to-catch interactions.</li>
              <li>Score tracked in localStorage; visible in the dashboard stats.</li>
              <li>Lives in its own route for focus: <code className="font-mono">/dashboard/volleyball</code>.</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Tech highlights</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Next.js app router, client components.</li>
              <li>Stateful gameplay loop with timed ball movement.</li>
              <li>Styling with Tailwind and subtle motion transitions.</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Play it</h2>
          <p className="text-gray-300">Open the dedicated tab to play.</p>
          <a
            href="/dashboard/volleyball"
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold hover:from-yellow-600 hover:to-orange-600 transition"
          >
            Play the Challenge
          </a>
        </div>
      </div>
    </div>
  );
}
