import React from 'react';
import { Camera, Eye } from 'lucide-react';

interface GalleryProps {
  onImageClick: (imageSrc: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ onImageClick }) => {
const artworks = [
  {
    id: 1,
    title: 'Portrait in Secratta Church',
    category: 'Religious Art',
    year: '1960s',
    medium: 'Oil on Canvas',
    image: '/images/IMG-20241122-WA0109.jpg' // ✅ correct path if image is in /public/images/
  },
    {
      id: 2,
      title: 'Tamil Cinema Poster Art',
      category: 'Film Art',
      year: '1950s',
      medium: 'Mixed Media',
      image: '/images/IMG-20241122-WA0075.jpg'

    },
    {
      id: 3,
      title: 'Rajaji Hall Mural',
      category: 'Murals',
      year: '1970s',
      medium: 'Acrylic on Wall',
      image: '/images/IMG-20241122-WA0101.jpg'

    },
    {
      id: 4,
      title: 'Traditional Dance Portrait',
      category: 'Cultural Art',
      year: '1960s',
      medium: 'Watercolor',
      image: '/images/IMG-20241122-WA0111.jpg'

    },
    {
      id: 5,
      title: 'Advertisement Campaign',
      category: 'Commercial Art',
      year: '1950s',
      medium: 'Gouache',
      image: '/images/IMG-20241122-WA0108.jpg'

    },
    {
      id: 6,
      title: 'M.G.R. Hospital Commission',
      category: 'Public Art',
      year: '1980s',
      medium: 'Oil on Canvas',
      image: '/images/IMG-20241122-WA0096.jpg'

    }
  ];

  const categories = ['All', 'Film Art', 'Religious Art', 'Murals', 'Cultural Art', 'Commercial Art', 'Public Art'];
  const [activeCategory, setActiveCategory] = React.useState('All');
  
  const filteredArtworks = activeCategory === 'All' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-cream to-burgundy/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Gallery of Masterpieces
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
            Discover the diverse artistic expressions that defined a legendary career
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 fade-in">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? 'bg-gold text-charcoal shadow-lg'
                  : 'bg-white text-charcoal/70 hover:bg-gold/20 hover:text-charcoal'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className="fade-in group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onImageClick(artwork.image)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg bg-white transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="aspect-w-4 aspect-h-3 relative">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center justify-between">
                        <Eye size={24} className="text-gold" />
                        <span className="text-sm bg-charcoal/60 px-3 py-1 rounded-full">
                          {artwork.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Artwork Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-gold transition-colors duration-300">
                    {artwork.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-charcoal/70 mb-3">
                    <span className="flex items-center">
                      <Camera size={16} className="mr-2 text-gold" />
                      {artwork.year}
                    </span>
                    <span>{artwork.medium}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold to-burgundy transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 fade-in">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-charcoal mb-4">
              Experience His Art in Person
            </h3>
            <p className="text-charcoal/80 mb-6">
              Many of these masterpieces can still be viewed at their original locations throughout Chennai and Tamil Nadu.
            </p>
            <button className="px-8 py-4 bg-burgundy hover:bg-burgundy/90 text-cream font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
              Visit Locations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;