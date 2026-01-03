export default function Blog() {
  const stories = [
    {
      title: 'School Life @ Olentangy Liberty High School',
      date: '2026-01-02',
      summary:
        "I split my days between AP coursework at Olentangy Liberty High School and building side projects. It's where I learned to balance tight deadlines with extracurriculars (and volleyball practice).",
      details:
        'If you want a quick snapshot of what I am working on or clubs I am involved in, check out the About page, then reach out—always happy to collaborate on a hackathon team or robotics idea.',
      tags: ['High School', 'Academics', 'Leadership'],
      actions: [
        { label: 'See About page', href: '/about' },
        { label: 'Contact me', href: '/contact' },
      ],
    },
    {
      title: 'Volleyball + Code: Same Playbook',
      date: '2025-12-20',
      summary:
        'Running a quick offense on the court feels a lot like iterating on product sprints—fast feedback, tight teamwork, and clear calls.',
      details:
        'I built a mini Volleyball Catch Challenge inside the dashboard to gamify practice. It tracks reps and keeps the competitive spark alive.',
      tags: ['Volleyball', 'Product', 'Games'],
      actions: [{ label: 'Play the challenge', href: '/dashboard/volleyball' }],
    },
    {
      title: 'What I am Building Right Now',
      date: '2025-12-10',
      summary: 'A rotating lineup of React/Next projects, a playlists viewer, and an auth flow tuned for quick demos.',
      details:
        'Latest adds: curated Spotify cards, an in-memory auth fallback, and dashboards that stay fast on low-end devices. Ping me if you want to pair up on a feature.',
      tags: ['Next.js', 'UX', 'Playlists'],
      actions: [
        { label: 'Open dashboard', href: '/dashboard' },
        { label: 'Email via contact', href: '/contact' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-20 space-y-12">
        <div className="text-center space-y-3">
          <p className="text-sm text-blue-300 uppercase tracking-[0.2em]">Journal</p>
          <h1 className="text-5xl font-bold text-white" style={{ fontFamily: 'cursive' }}>
            Blog & Updates
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A living log of what I am building, learning, and doing at Olentangy Liberty High School—no broken links, just straight to the good stuff.
          </p>
        </div>

        <div className="grid gap-8">
          {stories.map((story) => (
            <article
              key={story.title}
              className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-blue-500/70 transition"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className="text-gray-400 text-sm">{story.date}</p>
                <div className="flex gap-2 flex-wrap">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-blue-500/15 text-blue-200 border border-blue-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">{story.title}</h2>
              <p className="text-gray-200 mb-3">{story.summary}</p>
              <p className="text-gray-400 mb-5">{story.details}</p>
              <div className="flex gap-3 flex-wrap">
                {story.actions.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm transition"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Photo hint removed per user request */}
      </div>
    </div>
  );
}
