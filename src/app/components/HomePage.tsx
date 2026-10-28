import { ArrowRight, Brain, Wifi, Zap, Clock, Shield, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Brain,
      title: 'Zero Distractions',
      description: 'Soundproof booths designed for maximum focus and productivity'
    },
    {
      icon: Wifi,
      title: 'High-Speed Wi-Fi',
      description: 'Stay connected with fast, reliable internet access'
    },
    {
      icon: Zap,
      title: 'Ergonomic Setup',
      description: 'Comfortable seating, perfect lighting, and smart ventilation'
    },
    {
      icon: Clock,
      title: 'Flexible Booking',
      description: 'Book by the hour or choose monthly/semester plans'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Private, monitored spaces with 24/7 security'
    },
    {
      icon: Users,
      title: 'AI Assistant',
      description: 'Study tips, Pomodoro timers, and focus music built-in'
    }
  ];

  const useCases = [
    { name: 'College Students', icon: '🎓' },
    { name: 'Freelancers', icon: '💼' },
    { name: 'Remote Workers', icon: '🏠' },
    { name: 'Coaching Students', icon: '📚' },
    { name: 'Gamers', icon: '🎮' },
    { name: 'Professionals', icon: '👔' }
  ];

  const benefits = [
    'Better productivity with zero distractions',
    'Optimized learning environment',
    'Mental clarity through isolation',
    'Access to AI-powered study tools',
    'Affordable hourly and monthly rates',
    'Available at convenient locations'
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        {/* Subtle glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full text-sm font-semibold">
              🚀 Revolutionizing Study Spaces
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Your Personal Productivity Zone
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              FocusPod delivers soundproof, tech-enabled study booths designed for students, 
              freelancers, and professionals who demand focus and results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate('booking')} 
                size="lg"
                className="text-lg px-8"
              >
                Book Your Pod
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                onClick={() => onNavigate('about')} 
                variant="outline" 
                size="lg"
                className="text-lg px-8 border-gray-700 hover:border-teal-500"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-16 max-w-2xl mx-auto">
              <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-4 shadow-lg hover:border-teal-500/30 transition-colors">
                <div className="text-3xl font-bold text-teal-400">100M+</div>
                <div className="text-sm text-gray-400">Target Students</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-4 shadow-lg hover:border-cyan-500/30 transition-colors">
                <div className="text-3xl font-bold text-cyan-400">₹100/hr</div>
                <div className="text-sm text-gray-400">Starting Price</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-xl p-4 shadow-lg hover:border-blue-500/30 transition-colors">
                <div className="text-3xl font-bold text-blue-400">24/7</div>
                <div className="text-sm text-gray-400">Availability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Why Choose FocusPod?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need for a perfect study session in one compact booth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-teal-500/10 transition-all hover:border-teal-500/50"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Perfect For Everyone</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Whether you're studying for exams or working on your next big project
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center hover:shadow-lg hover:shadow-teal-500/10 transition-all hover:border-teal-500/50"
              >
                <div className="text-4xl mb-3">{useCase.icon}</div>
                <div className="font-semibold text-sm text-gray-300">{useCase.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">
                Experience the FocusPod Difference
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
                    <p className="text-lg text-gray-300">{benefit}</p>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => onNavigate('pricing')} 
                size="lg" 
                className="mt-8"
              >
                View Pricing Plans
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-32 h-32 text-teal-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-white">Boost Your Productivity</h3>
                <p className="text-gray-300">
                  Join thousands of students and professionals achieving more every day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600 text-white border-t border-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Focus?</h2>
          <p className="text-xl mb-8 text-teal-100 max-w-2xl mx-auto">
            Book your first FocusPod session today and experience distraction-free productivity
          </p>
          <Button
            onClick={() => onNavigate('booking')}
            size="lg"
            variant="secondary"
            className="text-lg px-8 bg-white text-teal-600 hover:bg-gray-100"
          >
            Book Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}