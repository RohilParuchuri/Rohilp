export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-white mb-12 text-center" style={{ fontFamily: 'cursive' }}>
          Services
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-blue-500 transition">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-4">Web Development</h3>
            <ul className="text-gray-300 space-y-2">
              <li>✓ Full-stack web applications</li>
              <li>✓ Progressive Web Apps</li>
              <li>✓ E-commerce solutions</li>
              <li>✓ Real-time applications</li>
              <li>✓ Performance optimization</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-blue-500 transition">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold text-white mb-4">Design & UX</h3>
            <ul className="text-gray-300 space-y-2">
              <li>✓ UI/UX design</li>
              <li>✓ Responsive design</li>
              <li>✓ Branding & identity</li>
              <li>✓ Design systems</li>
              <li>✓ User research</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-blue-500 transition">
            <div className="text-5xl mb-4">💡</div>
            <h3 className="text-2xl font-bold text-white mb-4">Consulting</h3>
            <ul className="text-gray-300 space-y-2">
              <li>✓ Tech stack selection</li>
              <li>✓ Architecture design</li>
              <li>✓ Performance audit</li>
              <li>✓ Team mentoring</li>
              <li>✓ Product strategy</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">My Process</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">01</div>
              <p className="text-white">Discovery</p>
              <p className="text-gray-400 text-sm">Understanding your needs</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">02</div>
              <p className="text-white">Planning</p>
              <p className="text-gray-400 text-sm">Designing the solution</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">03</div>
              <p className="text-white">Development</p>
              <p className="text-gray-400 text-sm">Building with excellence</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">04</div>
              <p className="text-white">Delivery</p>
              <p className="text-gray-400 text-sm">Launch & support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
