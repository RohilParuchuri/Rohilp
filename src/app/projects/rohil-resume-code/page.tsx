import Link from 'next/link';

export default function NBAGamesProject() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-block mb-8 text-gray-400 hover:text-white transition text-sm"
        >
          ← Back to home
        </Link>

        <h1 className="text-3xl font-bold mb-3">NBA Games Database</h1>
        <p className="text-gray-400 mb-10">
          A tool I built to explore NBA game history and run predictions. Mostly just wanted to mess around with sports data.
        </p>

        <div className="mb-10">
          <h2 className="text-lg font-medium mb-3 text-gray-200">The idea</h2>
          <p className="text-gray-400 leading-relaxed">
            I scraped a bunch of historical NBA data and threw together a Flask app to browse it. 
            Added some prediction logic because why not—it tries to guess game outcomes based on past matchups. 
            It's not perfect, but it's fun to play with.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-medium mb-3 text-gray-200">Built with</h2>
          <div className="flex flex-wrap gap-2">
            {['Python', 'Flask', 'Vercel', 'pandas'].map((t) => (
              <span key={t} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded">
                {t}
              </span>
            ))}
          </div>
        </div>

        <a
          href="https://project1-ochre-eight.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-5 py-3 bg-orange-600 hover:bg-orange-500 text-white font-medium rounded transition"
        >
          Check it out →
        </a>
      </div>
    </div>
  );
}
