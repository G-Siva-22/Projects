import React, { useState, useEffect } from 'react';
import { Calendar, Award, Palette, Film, Star, MapPin } from 'lucide-react';

import portraitImg from '../assets/IMG-20241122-WA0094.jpg';  // Adjust relative path as needed


const About: React.FC = () => {
  const [activeTimeline, setActiveTimeline] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const milestones = [
    { 
      year: '1902', 
      event: 'Born - A future artist enters the world',
      icon: Star,
      description: 'The beginning of an extraordinary artistic journey in early 20th century India.',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      year: '1920s', 
      event: 'Early artistic training and development',
      icon: Palette,
      description: 'Foundational years of learning traditional art forms and techniques.',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      year: '1940s', 
      event: 'Began career as a film artist in Tamil cinema',
      icon: Film,
      description: 'Entry into the golden age of Tamil cinema as a visual artist.',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      year: '1950s', 
      event: 'Established private art studio in Chennai',
      icon: MapPin,
      description: 'Created a dedicated space for artistic creation and mentorship.',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      year: '1960s', 
      event: 'Recognition from Chief Ministers of Tamil Nadu',
      icon: Award,
      description: 'State-level recognition for outstanding contributions to Tamil arts.',
      color: 'from-red-500 to-rose-500'
    },
    { 
      year: '1970s', 
      event: 'Major exhibitions across Tamil Nadu',
      icon: Palette,
      description: 'Widespread showcase of masterpieces in galleries and cultural centers.',
      color: 'from-indigo-500 to-purple-500'
    },
    { 
      year: '1980s', 
      event: 'Continued artistic contributions and mentorship',
      icon: Star,
      description: 'Nurturing the next generation while maintaining creative excellence.',
      color: 'from-teal-500 to-blue-500'
    },
    { 
      year: '1999', 
      event: 'Passed away, leaving behind a timeless legacy',
      icon: Award,
      description: 'A lasting impact on Tamil art and culture that continues to inspire.',
      color: 'from-gold to-bronze'
    }
  ];

  const achievements = [
    {
      title: 'Film Industry Pioneer',
      description: '45+ years as a visual artist in Tamil cinema',
      icon: Film
    },
    {
      title: 'Cultural Recognition',
      description: 'Praised by Chief Ministers of Tamil Nadu',
      icon: Award
    },
    {
      title: 'Artistic Legacy',
      description: 'Works displayed in Secratta Church, Rajaji Hall, M.G.R. Hospital',
      icon: Palette
    },
    {
      title: 'Memorial Honor',
      description: 'Raghavan Street named in Chennai\'s Choolaimedu',
      icon: MapPin
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-artistic min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <Palette className="text-gold animate-float" size={36} />
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-charcoal">
              Life & Legacy
            </h2>
            <Palette className="text-gold animate-float" size={36} style={{ animationDelay: '1s' }} />
          </div>
          <div className="mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl text-charcoal/80 max-w-4xl mx-auto leading-relaxed font-light">
            A remarkable journey of artistic excellence spanning nearly a century, 
            <span className="text-burgundy font-medium"> shaping Tamil cultural heritage</span>
          </p>
        </div>

        {/* Media Section */}
        <div className={`flex flex-col lg:flex-row justify-center items-start gap-12 mb-24 transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          {/* Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-burgundy/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
            <img
              src={portraitImg}

              alt="K. V. Raghavan Portrait"
              className="relative rounded-2xl shadow-2xl object-cover transform group-hover:scale-105 transition-all duration-500"
              style={{ width: '600px', aspectRatio: '4/3', maxWidth: '100%', height: 'auto' }}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'public/images/IMG-20241122-WA0094.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Video */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-burgundy/20 to-gold/20 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
            <video
              controls
              src="/images/WhatsApp%20Video%202024-12-08%20at%2020.38.14_69e0515c.mp4"
              title="Introduction to K. V. Raghavan"
              className="relative rounded-2xl shadow-2xl object-cover transform group-hover:scale-105 transition-all duration-500"
              style={{ width: '600px', aspectRatio: '16/9', maxWidth: '100%', height: 'auto' }}
              onError={(e) => {
                const target = e.target as HTMLVideoElement;
                target.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'relative rounded-2xl shadow-2xl bg-gradient-to-br from-charcoal to-burgundy flex items-center justify-center text-cream';
                placeholder.style.width = '600px';
                placeholder.style.aspectRatio = '16/9';
                placeholder.style.maxWidth = '100%';
                placeholder.innerHTML = '<div class="text-center"><Film size="48" class="mx-auto mb-2"/><p>Video Introduction</p></div>';
                target.parentNode?.appendChild(placeholder);
              }}
            >
              <div className="bg-gradient-to-br from-charcoal to-burgundy rounded-2xl flex items-center justify-center text-cream h-full">
                <div className="text-center">
                  <Film size={48} className="mx-auto mb-2" />
                  <p>Your browser does not support the video tag.</p>
                </div>
              </div>
            </video>
          </div>
        </div>

        {/* Biography */}
        <div className={`prose prose-xl max-w-5xl mx-auto text-charcoal/90 leading-relaxed mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="bg-gray/80 backdrop-blur-sm p-12 rounded-3xl shadow-xl border border-gold/20">
            <div className="space-y-8 text-lg md:text-xl leading-relaxed">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                Mr. K. V. Raghavan, born in 1902, was an artist of rare caliber whose visionary work transformed 
                the landscape of Tamil visual arts. For more than 45 years, he worked as a film artist, leaving 
                his indelible mark on Tamil cinema through vivid and expressive visual creations that captured 
                the essence of Tamil culture and storytelling.
              </p>
              <p>
                Alongside his cinema work, he established a private art center in Chennai, serving as both a 
                sanctuary for creativity and a beacon for aspiring artists. His multifaceted talent extended 
                to advertising, where he became a renowned artist whose work spoke to the masses with clarity and beauty.
              </p>
              <p>
                His immense talent drew widespread recognition from the highest echelons of Tamil Nadu's leadership. 
                Former Chief Ministers personally praised his works, acknowledging their cultural significance and 
                artistic excellence. His contributions transcended studio walls, with paintings proudly exhibited 
                in state-wide art exhibitions, creating ripples of inspiration across Tamil Nadu.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className={`mb-20 transition-all duration-1000 delay-700 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-charcoal text-center mb-12">
            Remarkable Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={index}
                  className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gold/10 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold to-bronze rounded-full mb-4 group-hover:animate-pulse-glow">
                      <IconComponent className="text-white" size={28} />
                    </div>
                    <h4 className="text-lg font-semibold text-charcoal mb-2">{achievement.title}</h4>
                    <p className="text-charcoal/70 text-sm leading-relaxed">{achievement.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Creative River Timeline - Zero Empty Space */}
        <div className={`max-w-7xl mx-auto mb-20 transition-all duration-1000 delay-900 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h3 className="flex items-center justify-center gap-4 text-3xl md:text-4xl font-serif font-bold text-charcoal mb-8">
            <Calendar className="text-gold" size={36} />
            Journey Through Time
            <Calendar className="text-gold" size={36} />
          </h3>

          {/* Desktop River Timeline */}
          <div className="hidden lg:block">
            <div className="relative bg-gradient-to-r from-gold/10 via-bronze/20 to-gold/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
              {/* Flowing River Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent animate-pulse"></div>
              
              {/* Continuous Timeline River */}
              <div className="relative flex flex-wrap justify-center items-center gap-4">
                {milestones.map((milestone, index) => {
                  const IconComponent = milestone.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <React.Fragment key={index}>
                      {/* Timeline Item */}
                      <div 
                        className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-110 ${
                          isEven ? 'hover:-rotate-3' : 'hover:rotate-3'
                        }`}
                        onMouseEnter={() => setActiveTimeline(index)}
                        onMouseLeave={() => setActiveTimeline(null)}
                      >
                        {/* Milestone Card */}
                        <div className={`bg-gradient-to-br ${milestone.color} p-6 rounded-2xl shadow-xl text-white min-w-[280px] max-w-[320px] ${
                          activeTimeline === index ? 'shadow-2xl ring-4 ring-white/50' : ''
                        }`}>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <IconComponent size={24} className="text-white" />
                            </div>
                            <span className="text-2xl font-bold font-serif">{milestone.year}</span>
                          </div>
                          <h4 className="text-lg font-semibold mb-2 leading-tight">{milestone.event}</h4>
                          <p className="text-white/90 text-sm leading-relaxed">{milestone.description}</p>
                        </div>

                        {/* Connecting Arrow (except for last item) */}
                        {index < milestones.length - 1 && (
                          <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10">
                            <div className="w-8 h-1 bg-gradient-to-r from-gold to-bronze rounded-full"></div>
                            <div className="absolute -right-1 -top-1 w-3 h-3 bg-gold rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>

                      {/* Flowing Connector */}
                      {index < milestones.length - 1 && (
                        <div className="flex-shrink-0 w-8 h-1 bg-gradient-to-r from-gold via-bronze to-gold rounded-full animate-pulse" 
                             style={{ animationDelay: `${index * 200}ms` }}>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Stacked Timeline */}
          <div className="block lg:hidden">
            <div className="bg-gradient-to-b from-gold/10 via-bronze/20 to-gold/10 rounded-3xl p-6 shadow-2xl">
              <div className="space-y-4">
                {milestones.map((milestone, index) => {
                  const IconComponent = milestone.icon;
                  
                  return (
                    <div key={index} className={`bg-gradient-to-r ${milestone.color} p-4 rounded-xl shadow-lg text-white`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <IconComponent size={18} className="text-white" />
                        </div>
                        <span className="text-xl font-bold font-serif">{milestone.year}</span>
                      </div>
                      <h4 className="text-base font-semibold mb-1 leading-tight">{milestone.event}</h4>
                      <p className="text-white/90 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className={`text-center transition-all duration-1000 delay-1100 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="relative bg-gradient-to-br from-charcoal via-burgundy to-charcoal p-16 rounded-3xl shadow-2xl max-w-5xl mx-auto overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-6 left-6 w-16 h-16 border-2 border-gold/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 right-6 w-20 h-20 border-2 border-gold/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10">
              <div className="text-6xl text-gold/40 mb-4 font-serif">"</div>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-cream italic mb-8 leading-relaxed font-serif">
                Mr. Raghavan uplifted the pride and artistic heritage of the Tamil people. 
                His visionary works have transcended time and remain etched in memory.
              </blockquote>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full mb-4"></div>
              <p className="text-cream/80 text-lg font-light">— A Testament to Timeless Artistry</p>
              <div className="text-6xl text-gold/40 mt-4 font-serif rotate-180">"</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;