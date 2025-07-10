import React from 'react';
import { Heart, Calendar, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Memorial Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">In Loving Memory</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              K. V. Raghavan (1902-1999) - A master artist whose legacy continues to inspire 
              generations of creators and art lovers across Tamil Nadu and beyond.
            </p>
            <div className="flex items-center text-sm text-white/70">
              <Calendar className="mr-2" size={16} />
              25th Memorial Year - {currentYear}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">Explore</h3>
            <ul className="space-y-3">
              {['About His Life', 'Art Gallery', 'Legacy & Impact', 'Share Tribute'].map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => {
                      const sectionId = link.toLowerCase().replace(/[^a-z0-9]/g, '').replace('hislife', 'about').replace('artgallery', 'gallery').replace('legacyimpact', 'legacy').replace('sharetribute', 'tribute');
                      const element = document.getElementById(sectionId);
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white/80 hover:text-gold transition-colors duration-300 text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Artwork Locations */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gold">Visit His Art</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 text-gold flex-shrink-0" size={16} />
                <div>
                  <div className="font-medium">Secratta Church</div>
                  <div className="text-white/70">Religious artwork display</div>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 text-gold flex-shrink-0" size={16} />
                <div>
                  <div className="font-medium">Rajaji Hall</div>
                  <div className="text-white/70">Cultural exhibition venue</div>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 text-gold flex-shrink-0" size={16} />
                <div>
                  <div className="font-medium">M.G.R. Hospital</div>
                  <div className="text-white/70">Healing art installation</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-white/20 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="text-burgundy mr-2" size={20} />
            <span className="text-white/80">
              Created with love to honor an extraordinary artist
            </span>
          </div>
          
          <div className="text-white/70 text-sm text-center md:text-right">
            <p>© {currentYear} K. V. Raghavan Memorial Website</p>
            <p className="mt-1">
              Preserving the legacy of Tamil artistic excellence
            </p>
          </div>
        </div>

        {/* Memorial Quote */}
        <div className="text-center mt-8 pt-8 border-t border-white/20">
          <p className="text-gold italic font-light">
            "Art is the bridge between what is and what could be. His brush built bridges that span generations."
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;