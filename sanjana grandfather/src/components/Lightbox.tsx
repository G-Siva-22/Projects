import React from 'react';
import { X, ZoomIn, Download } from 'lucide-react';

interface LightboxProps {
  imageSrc: string;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ imageSrc, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'raghavan-artwork.jpg';
    link.click();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-5xl max-h-full">
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button
            onClick={handleDownload}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
            title="Download Image"
          >
            <Download className="text-white" size={20} />
          </button>
          <button
            onClick={onClose}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
            title="Close"
          >
            <X className="text-white" size={20} />
          </button>
        </div>

        {/* Image */}
        <div className="relative animate-fade-in">
          <img
            src={imageSrc}
            alt="Artwork"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
          
          {/* Zoom indicator */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
            <ZoomIn className="text-white" size={16} />
            <span className="text-white text-sm">Click and drag to explore</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;