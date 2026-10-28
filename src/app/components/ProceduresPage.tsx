import { UserPlus, Search, Calendar, CreditCard, DoorOpen, CheckCircle, AlertCircle } from 'lucide-react';

export function ProceduresPage() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Account',
      description: 'Sign up with your email and create your FocusPod profile in under 2 minutes',
      details: [
        'Provide basic information (name, email, phone)',
        'Verify your email address',
        'Set your password and preferences',
        'Complete your profile (optional student ID)'
      ]
    },
    {
      icon: Search,
      title: 'Find Your Pod',
      description: 'Browse available FocusPods at your preferred location',
      details: [
        'Select your city and preferred location',
        'View all nearby FocusPod installations',
        'Check real-time availability',
        'Read reviews and ratings from other users'
      ]
    },
    {
      icon: Calendar,
      title: 'Book Your Session',
      description: 'Choose your date, time, and duration for your focused study session',
      details: [
        'Select your preferred date',
        'Choose from available time slots',
        'Pick your session duration (1-8 hours)',
        'Select a specific pod number (optional)'
      ]
    },
    {
      icon: CreditCard,
      title: 'Make Payment',
      description: 'Complete your booking with secure online payment',
      details: [
        'Review your booking summary',
        'Choose payment method (UPI, Cards, Wallets)',
        'Apply discount codes if available',
        'Receive instant booking confirmation'
      ]
    },
    {
      icon: DoorOpen,
      title: 'Access Your Pod',
      description: 'Arrive at your scheduled time and unlock your pod using the app',
      details: [
        'Receive QR code and access PIN via app',
        'Arrive 5 minutes before your session',
        'Scan QR code or enter PIN to unlock',
        'Adjust lighting, temperature, and settings'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Enjoy & Finish',
      description: 'Focus on your work, then end your session and rate your experience',
      details: [
        'Use all pod amenities (Wi-Fi, charging, AI assistant)',
        'Get 5-minute reminder before session ends',
        'Lock the pod when leaving',
        'Rate your experience and provide feedback'
      ]
    }
  ];

  const guidelines = [
    {
      title: 'Before Your Session',
      items: [
        'Book at least 30 minutes in advance for guaranteed availability',
        'Arrive 5 minutes early to set up comfortably',
        'Bring your own headphones for audio privacy (optional)',
        'Ensure your device is charged or bring chargers'
      ]
    },
    {
      title: 'During Your Session',
      items: [
        'Keep noise levels minimal – booths are soundproof but respect others',
        'No food allowed; beverages in sealed containers only',
        'Use provided amenities responsibly',
        'Report any technical issues via the app immediately'
      ]
    },
    {
      title: 'After Your Session',
      items: [
        'Ensure all your belongings are collected',
        'Leave the pod clean and organized',
        'Log out of any personal accounts',
        'Lock the door securely before leaving'
      ]
    }
  ];

  const faqs = [
    {
      question: 'Can I extend my session?',
      answer: 'Yes! You can extend your session through the app if the pod is available for the next time slot. Extensions are subject to availability and standard hourly rates.'
    },
    {
      question: 'What if I need to cancel?',
      answer: 'Cancellations made 2+ hours before your session receive a full refund. Cancellations within 2 hours receive a 50% refund. No-shows are non-refundable.'
    },
    {
      question: 'Is Wi-Fi included?',
      answer: 'Yes, high-speed Wi-Fi is included with every booking at no additional cost.'
    },
    {
      question: 'What if I have technical issues?',
      answer: 'Use the in-app support button for immediate assistance. Our support team is available 24/7 to resolve any issues.'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">How FocusPod Works</h1>
            <p className="text-xl text-teal-100 leading-relaxed">
              Simple, fast, and designed for your convenience. Get started in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">6 Simple Steps</h2>
              <p className="text-xl text-gray-400">
                From signup to your first focused session
              </p>
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:shadow-xl hover:shadow-teal-500/10 hover:border-teal-500/50 transition-all"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center relative">
                          <Icon className="w-8 h-8 text-white" />
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
                        <p className="text-gray-400 mb-4">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Usage Guidelines</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {guidelines.map((guideline, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-teal-400">{guideline.title}</h3>
                  <ul className="space-y-3">
                    {guideline.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0 mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">What's Included in Every Pod</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: 'High-Speed Wi-Fi', icon: '📶' },
                { name: 'Ergonomic Seating', icon: '🪑' },
                { name: 'Adjustable Lighting', icon: '💡' },
                { name: 'Climate Control', icon: '❄️' },
                { name: 'Power Outlets & USB', icon: '🔌' },
                { name: 'Noise Cancellation', icon: '🔇' },
                { name: 'AI Study Assistant', icon: '🤖' },
                { name: 'Privacy Lock', icon: '🔒' },
                { name: 'Whiteboard & Markers', icon: '📝' },
                { name: 'Emergency Support', icon: '🆘' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-lg p-4"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-white">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-2 text-white">{faq.question}</h3>
                      <p className="text-gray-400">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}