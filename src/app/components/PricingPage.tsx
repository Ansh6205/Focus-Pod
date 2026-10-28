import { Check, Zap, Crown, Building } from 'lucide-react';
import { Button } from './ui/button';

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const plans = [
    {
      name: 'Pay-Per-Hour',
      icon: Zap,
      price: '₹100',
      period: 'per hour',
      description: 'Perfect for occasional users and trying FocusPod',
      features: [
        'Book anytime, pay only for what you use',
        'All pod amenities included',
        'High-speed Wi-Fi',
        'AI study assistant',
        'No commitment required',
        'Cancel 2 hours before for full refund'
      ],
      color: 'blue',
      popular: false
    },
    {
      name: 'Monthly Pass',
      icon: Crown,
      price: '₹2,499',
      period: 'per month',
      description: 'Best value for regular students and professionals',
      features: [
        '30 hours per month (~₹83/hour)',
        'Priority booking',
        'All pod amenities included',
        'Extended session discounts',
        'Free 2 hours on signup',
        'Rollover 5 unused hours',
        'Premium support'
      ],
      color: 'purple',
      popular: true
    },
    {
      name: 'Semester Pass',
      icon: Building,
      price: '₹9,999',
      period: 'per semester (4 months)',
      description: 'Ultimate plan for serious students',
      features: [
        '150 hours per semester (~₹66/hour)',
        'Highest priority booking',
        'All pod amenities included',
        'Reserve favorite pod',
        'Free 5 hours on signup',
        'Unlimited rollovers',
        'Dedicated support line',
        'Free guest passes (2/month)'
      ],
      color: 'pink',
      popular: false
    }
  ];

  const addons = [
    { name: 'Noise-Canceling Headphones', price: '₹50/session' },
    { name: 'Smart Whiteboard Access', price: '₹30/session' },
    { name: 'Premium Study Materials', price: '₹100/month' },
    { name: 'AI Tutor Pro', price: '₹200/month' }
  ];

  const getColorClasses = (color: string, isPopular: boolean) => {
    const colorMap: Record<string, any> = {
      blue: {
        gradient: 'from-teal-600 to-cyan-600',
        bg: 'bg-teal-50',
        border: 'border-teal-200',
        text: 'text-teal-600',
        button: 'bg-teal-600 hover:bg-teal-700'
      },
      purple: {
        gradient: 'from-cyan-600 to-blue-600',
        bg: 'bg-cyan-50',
        border: 'border-cyan-200',
        text: 'text-cyan-600',
        button: 'bg-cyan-600 hover:bg-cyan-700'
      },
      pink: {
        gradient: 'from-blue-600 to-indigo-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      }
    };
    return colorMap[color];
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-teal-100 leading-relaxed">
              Choose the plan that works best for you. No hidden fees, cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const colors = getColorClasses(plan.color, plan.popular);
              
              return (
                <div
                  key={index}
                  className={`relative bg-gray-900/50 border border-gray-800 rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                    plan.popular ? 'ring-2 ring-cyan-500' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`bg-gradient-to-r ${colors.gradient} p-6 text-white`}>
                    <Icon className="w-12 h-12 mb-3" />
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-sm opacity-90 ml-2">{plan.period}</span>
                    </div>
                    <p className="text-sm opacity-90">{plan.description}</p>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => onNavigate('booking')}
                      className={`w-full ${colors.button}`}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Compare Plans</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-900/50 border border-gray-800">
                    <th className="p-4 text-left font-semibold text-white">Feature</th>
                    <th className="p-4 text-center font-semibold text-white">Hourly</th>
                    <th className="p-4 text-center font-semibold text-white">Monthly</th>
                    <th className="p-4 text-center font-semibold text-white">Semester</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr className="border border-gray-800">
                    <td className="p-4 text-gray-300">Cost per hour</td>
                    <td className="p-4 text-center text-gray-300">₹100</td>
                    <td className="p-4 text-center text-cyan-400 font-semibold">₹83</td>
                    <td className="p-4 text-center text-blue-400 font-semibold">₹66</td>
                  </tr>
                  <tr className="bg-gray-900/30 border border-gray-800">
                    <td className="p-4 text-gray-300">Priority booking</td>
                    <td className="p-4 text-center text-gray-500">-</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                  </tr>
                  <tr className="border border-gray-800">
                    <td className="p-4 text-gray-300">Bonus hours on signup</td>
                    <td className="p-4 text-center text-gray-500">-</td>
                    <td className="p-4 text-center text-gray-300">2 hours</td>
                    <td className="p-4 text-center text-gray-300">5 hours</td>
                  </tr>
                  <tr className="bg-gray-900/30 border border-gray-800">
                    <td className="p-4 text-gray-300">Unused hour rollover</td>
                    <td className="p-4 text-center text-gray-500">-</td>
                    <td className="p-4 text-center text-gray-300">5 hours</td>
                    <td className="p-4 text-center text-gray-300">Unlimited</td>
                  </tr>
                  <tr className="border border-gray-800">
                    <td className="p-4 text-gray-300">Reserve favorite pod</td>
                    <td className="p-4 text-center text-gray-500">-</td>
                    <td className="p-4 text-center text-gray-500">-</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-teal-400 mx-auto" /></td>
                  </tr>
                  <tr className="bg-gray-900/30 border border-gray-800">
                    <td className="p-4 text-gray-300">Guest passes</td>
                    <td className="p-4 text-center text-gray-500">-</td>
                    <td className="p-4 text-center text-gray-500">-</td>
                    <td className="p-4 text-center text-gray-300">2/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Premium Add-ons</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {addons.map((addon, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow-lg flex items-center justify-between hover:shadow-xl hover:shadow-teal-500/10 hover:border-teal-500/50 transition-all"
                >
                  <span className="font-semibold text-white">{addon.name}</span>
                  <span className="text-teal-400 font-bold">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Pricing */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white text-center">
              <Building className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Institutional Partnerships</h2>
              <p className="text-xl text-teal-100 mb-6">
                Special rates for colleges, coaching centers, and organizations
              </p>
              <ul className="text-left max-w-2xl mx-auto mb-8 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Bulk installation discounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Customized branding options</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Dedicated support and maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Revenue sharing opportunities</span>
                </li>
              </ul>
              <Button variant="secondary" size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}