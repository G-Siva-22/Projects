import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar, MapPin, Award, Heart, Send, Menu, X, Camera, Star } from 'lucide-react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Legacy from './components/Legacy';
import Tribute from './components/Tribute';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Smooth scroll behavior
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <Hero />
      <About />
      <Gallery onImageClick={setSelectedImage} />
      <Legacy />
      <Tribute />
      <Footer />
      
      {selectedImage && (
        <Lightbox 
          imageSrc={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div>
  );
}

export default App;