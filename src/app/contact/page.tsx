'use client';

import { FormEvent, useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('_subject', 'Portfolio contact');

    try {
      const res = await fetch('https://formspree.io/f/mojvwekb', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const data = await res.json().catch(() => null);
        const message = data?.error || data?.message || 'Failed to send message';
        throw new Error(message);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Try emailing me directly.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-white mb-12 text-center" style={{ fontFamily: 'cursive' }}>
          Get In Touch
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Let's Connect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <a href="mailto:rohilparuchuri@gmail.com" className="text-blue-500 hover:text-blue-400">
                  rohilparuchuri@gmail.com
                </a>
                <p className="text-gray-400 text-sm mt-1">If the form fails, email me directly.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Social</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-blue-500 hover:text-blue-400">
                    Twitter
                  </a>
                  <a href="#" className="text-blue-500 hover:text-blue-400">
                    LinkedIn
                  </a>
                  <a href="#" className="text-blue-500 hover:text-blue-400">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none transition"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none transition"
                  placeholder="Your message..."
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : submitted ? 'Sent! ✓' : 'Send Message'}
              </button>
              {error && (
                <div className="w-full rounded-lg border border-red-500/60 bg-red-500/10 text-red-200 text-sm px-3 py-2">
                  Failed to send: {error}
                </div>
              )}
              {submitted && !loading && !error && (
                <div className="w-full rounded-lg border border-green-500/60 bg-green-500/10 text-green-200 text-sm px-3 py-2">
                  Message sent. Check your inbox for the notification.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
