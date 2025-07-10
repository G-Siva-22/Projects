import React from 'react';
import { Star, MapPin, Award, Users } from 'lucide-react';

const Legacy: React.FC = () => {
  const achievements = [
    {
      icon: <Award className="text-gold" size={32} />,
      title: '45+ Years in Cinema',
      description: 'Devoted over four decades as a successful film artist in Tamil cinema',
      highlight: 'Film Career'
    },
    {
      icon: <MapPin className="text-gold" size={32} />,
      title: 'Raghavan Street',
      description: 'A street in Chennai\'s Choolaimedu named in his honor',
      highlight: 'Street Dedication'
    },
    {
      icon: <Star className="text-gold" size={32} />,
      title: 'Chief Minister Recognition',
      description: 'Praised and recognized by former Chief Ministers of Tamil Nadu',
      highlight: 'Government Honor'
    },
    {
      icon: <Users className="text-gold" size={32} />,
      title: 'Public Exhibitions',
      description: 'Artwork exhibited in major exhibitions across Tamil Nadu',
      highlight: 'Public Recognition'
    }
  ];

  const locations = [
    {
      name: 'Secratta Church',
      description: 'Religious artwork that continues to inspire worship',
      type: 'Religious Institution'
    },
    {
      name: 'Rajaji Hall',
      description: 'Prestigious venue showcasing his mastery',
      type: 'Cultural Center'
    },
    {
      name: 'M.G.R. Hospital',
      description: 'Healing art that comforts patients and families',
      type: 'Healthcare Facility'
    }
  ];

  return (
    <section id="legacy" className="py-20 bg-gradient-to-br from-burgundy to-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            A Legacy Beyond Time
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            25 years after his passing, K. V. Raghavan's influence continues to inspire artists and art lovers alike
          </p>
        </div>

        {/* Key Achievements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="fade-in text-center group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 h-full transform transition-all duration-500 hover:scale-105 hover:bg-white/20 hover:shadow-2xl">
                <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <div className="text-sm font-semibold text-gold mb-3 uppercase tracking-wider">
                  {achievement.highlight}
                </div>
                <h3 className="text-xl font-bold mb-4">
                  {achievement.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Artwork Locations */}
        <div className="fade-in">
          <h3 className="text-3xl font-bold text-center mb-12">
            Where His Art Lives On
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {locations.map((location, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center transform transition-all duration-500 hover:scale-105 hover:bg-white/20"
              >
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="text-charcoal" size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">{location.name}</h4>
                <p className="text-sm text-gold mb-4 uppercase tracking-wider">
                  {location.type}
                </p>
                <p className="text-white/80 leading-relaxed">
                  {location.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Memorial Quote */}
        <div className="text-center fade-in">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <div className="max-w-4xl mx-auto">
              <div className="text-6xl text-gold mb-6">"</div>
              <blockquote className="text-2xl md:text-3xl font-light italic mb-8 leading-relaxed">
                His deep artistic insight and purposeful life continue to inspire us even today. 
                This December marks the 25th year of his remembrance — a fitting occasion to 
                celebrate his life and share his remarkable journey with the world.
              </blockquote>
              <div className="text-6xl text-gold rotate-180">"</div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { number: '45+', label: 'Years in Art' },
            { number: '25', label: 'Years Remembered' },
            { number: '97', label: 'Years of Life' },
            { number: '∞', label: 'Years of Legacy' }
          ].map((stat, index) => (
            <div key={index} className="text-center fade-in">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                {stat.number}
              </div>
              <div className="text-white/80 uppercase tracking-wider text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Legacy;