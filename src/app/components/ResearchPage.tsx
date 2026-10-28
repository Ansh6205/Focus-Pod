import { FileText, ExternalLink, BookOpen, FlaskConical, TrendingUp, Download } from 'lucide-react';
import { Button } from './ui/button';

export function ResearchPage() {
  const researchAreas = [
    {
      title: 'Cognitive Performance',
      description: 'Studies on how soundproof environments impact concentration and learning outcomes',
      icon: BookOpen
    },
    {
      title: 'Productivity Metrics',
      description: 'Analysis of productivity improvements in distraction-free study spaces',
      icon: TrendingUp
    },
    {
      title: 'Environmental Design',
      description: 'Research on optimal lighting, temperature, and acoustics for focused work',
      icon: FlaskConical
    },
    {
      title: 'User Experience',
      description: 'Behavioral studies on student preferences and usage patterns',
      icon: FileText
    }
  ];

  const publications = [
    {
      title: 'The Impact of Soundproof Study Spaces on Academic Performance',
      authors: 'Vivek Humbe, Ansh Kumbhare',
      year: '2025',
      type: 'Research Paper'
    },
    {
      title: 'Optimizing Micro-Environments for Deep Work',
      authors: 'FocusPod Research Team',
      year: '2025',
      type: 'White Paper'
    },
    {
      title: 'Student Productivity in Shared vs. Private Study Spaces',
      authors: 'Vivek Humbe, Ansh Kumbhare',
      year: '2024',
      type: 'Case Study'
    },
    {
      title: 'AI-Assisted Learning in Controlled Environments',
      authors: 'FocusPod Innovation Lab',
      year: '2024',
      type: 'Technical Report'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FlaskConical className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">Research & Innovation</h1>
            <p className="text-xl text-teal-100 leading-relaxed">
              Our commitment to evidence-based design and continuous improvement through 
              rigorous research and experimentation
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Our Research Focus</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Exploring the science behind optimal study environments
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-teal-500/10 hover:border-teal-500/50 transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{area.title}</h3>
                  <p className="text-gray-400">{area.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Access Research Materials */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <Download className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Research Repository</h2>
                    <p className="text-teal-100">Access our complete collection of research materials</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <p className="text-lg text-gray-300 mb-6">
                  We believe in transparency and open research. Our complete repository includes 
                  research papers, experimental data, case studies, and technical documentation 
                  that support our approach to creating optimal study environments.
                </p>

                <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-6 mb-6">
                  <h3 className="font-bold mb-2 flex items-center gap-2 text-white">
                    <FileText className="w-5 h-5 text-teal-400" />
                    What's Included:
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>Research papers on cognitive performance and productivity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>Experimental designs and methodology documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>User studies and behavioral analysis reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>Technical specifications and design rationale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>Assignment submissions and project documentation</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://drive.google.com/drive/folders/1HieRgy_O9kc7oFM11f16WoIHQaqE10on"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="w-full text-lg bg-teal-600 hover:bg-teal-700">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Access Research Repository on Google Drive
                  </Button>
                </a>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Opens in a new window • Free access for everyone
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Recent Publications</h2>
            
            <div className="space-y-4">
              {publications.map((pub, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-teal-500/10 hover:border-teal-500/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-teal-400 flex-shrink-0" />
                        <h3 className="font-bold text-lg text-white">{pub.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">{pub.authors}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{pub.year}</span>
                        <span>•</span>
                        <span className="px-2 py-1 bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded">
                          {pub.type}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Research Methodology</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-bold mb-2 text-white">Data Collection</h3>
                <p className="text-sm text-gray-400">
                  Gathering quantitative and qualitative data from real users in live environments
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-bold mb-2 text-white">Analysis</h3>
                <p className="text-sm text-gray-400">
                  Applying statistical methods and machine learning to identify patterns and insights
                </p>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-bold mb-2 text-white">Implementation</h3>
                <p className="text-sm text-gray-400">
                  Translating findings into actionable design improvements and feature updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}