import { Target, Eye, Heart, Award, Rocket, Globe } from 'lucide-react';

export function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Focus First',
      description: 'We believe in creating environments that eliminate distractions and maximize productivity'
    },
    {
      icon: Heart,
      title: 'Student-Centric',
      description: 'Every design decision is made with our users\' needs and comfort in mind'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Premium materials, cutting-edge technology, and meticulous attention to detail'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making focused study spaces available and affordable for everyone'
    }
  ];

  const milestones = [
    {
      phase: 'Phase 1',
      title: 'Pilot Launch',
      description: 'Deploy in 1-2 colleges and coaching hubs',
      status: 'In Progress'
    },
    {
      phase: 'Phase 2',
      title: 'City Expansion',
      description: 'Expand to Tier-1 cities across metro campuses, libraries, and cafes',
      status: 'Planned'
    },
    {
      phase: 'Phase 3',
      title: 'National Franchise',
      description: 'Launch franchising model for PAN-India expansion',
      status: 'Planned'
    },
    {
      phase: 'Future',
      title: 'Smart Evolution',
      description: 'SmartBooths for office calls, virtual interviews, and therapy sessions',
      status: 'Vision'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About FocusPod</h1>
            <p className="text-xl text-teal-100 leading-relaxed">
              We're on a mission to transform how students and professionals approach focused work. 
              In a world full of noise and distractions, FocusPod creates personalized productivity 
              zones that empower you to achieve your best work.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 border border-teal-500/20 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To provide accessible, affordable, and tech-enabled study spaces that eliminate 
                distractions and maximize productivity for students and professionals across India 
                and beyond.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">Our Vision</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To become the leading provider of smart study solutions globally, revolutionizing 
                how people learn and work by creating millions of distraction-free productivity 
                zones worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">The Problem We're Solving</h2>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-red-500 mb-4">The Challenge</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                In today's world, students and professionals face unprecedented levels of distraction. 
                Home environments are often noisy, libraries are crowded, and cafes lack privacy. 
                Digital distractions are everywhere, making it increasingly difficult to achieve deep, 
                focused work.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li>Noisy home environments with family interruptions</li>
                <li>Overcrowded libraries with limited seating</li>
                <li>Expensive co-working spaces beyond student budgets</li>
                <li>Lack of privacy and personalized study environments</li>
                <li>No access to tech-enabled productivity tools</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-teal-500/20 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-teal-400 mb-4">Our Solution: FocusPod</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                FocusPod offers affordable, soundproof, tech-enabled mini booths that provide the 
                perfect environment for focused work. Available by the hour or through flexible 
                subscription plans, our pods are strategically located where students need them most.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li>Soundproof design eliminates external distractions</li>
                <li>Ergonomic seating and optimal lighting for comfort</li>
                <li>High-speed Wi-Fi and charging ports built-in</li>
                <li>AI-powered study assistance and focus tools</li>
                <li>Affordable hourly rates and student-friendly plans</li>
                <li>Convenient locations at campuses, coaching centers, and public spaces</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Rocket className="w-16 h-16 mx-auto mb-4 text-teal-400" />
              <h2 className="text-4xl font-bold mb-4 text-white">Our Growth Roadmap</h2>
              <p className="text-xl text-gray-400">
                Building the future of focused productivity spaces
              </p>
            </div>

            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-teal-500"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-teal-400">{milestone.phase}</span>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      milestone.status === 'In Progress'
                        ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                        : milestone.status === 'Planned'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {milestone.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{milestone.title}</h3>
                  <p className="text-gray-400">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Market Impact */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Market Impact</h2>
            <p className="text-xl text-gray-400 mb-12">
              Tapping into India's massive education and productivity market
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 border border-teal-500/20 rounded-xl p-6">
                <div className="text-4xl font-bold text-teal-400 mb-2">100M+</div>
                <div className="font-semibold mb-2 text-white">Target Audience</div>
                <div className="text-sm text-gray-400">
                  College students and coaching center attendees across India
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-6">
                <div className="text-4xl font-bold text-cyan-400 mb-2">₹10,000+ Cr</div>
                <div className="font-semibold mb-2 text-white">Market Potential</div>
                <div className="text-sm text-gray-400">
                  Total addressable market in India for focused study solutions
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6">
                <div className="text-4xl font-bold text-blue-400 mb-2">Growing</div>
                <div className="font-semibold mb-2 text-white">Mental Health Awareness</div>
                <div className="text-sm text-gray-400">
                  Increasing demand for calm, quiet, focused environments
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}