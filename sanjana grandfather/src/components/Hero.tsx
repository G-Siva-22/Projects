import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-burgundy via-charcoal to-burgundy bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 21, 56, 0.7), rgba(44, 44, 44, 0.7)), url('https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="fade-in active">
          <h1 className="text-5xl md:text-7xl font-bold text-cream mb-6 leading-tight">
            K. V. Raghavan
          </h1>
          <p className="text-xl md:text-2xl text-gold mb-4 font-light">
            A Timeless Tamil Artist
          </p>
          <p className="text-lg md:text-xl text-cream/90 mb-8">
            (1902 – 1999)
          </p>
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-cream/80 leading-relaxed italic">
              "Where every stroke tells a story. Honoring a lifetime of artistic excellence."
            </p>
          </div>
          <button
            onClick={scrollToAbout}
            className="inline-flex items-center px-8 py-4 bg-gold hover:bg-gold/90 text-charcoal font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Discover His Legacy
            <ChevronDown className="ml-2 animate-bounce" size={20} />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent"></div>
    </section>
  );
};

export default Hero;