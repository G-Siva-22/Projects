import React, { useState } from 'react';
import { Location } from '../../types';
import { MapPin, Check } from 'lucide-react';

interface LocationSelectorProps {
  locations: Location[];
  onSelectLocation: (locationId: string) => void;
  selectedLocationId?: string;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  locations,
  onSelectLocation,
  selectedLocationId
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    selectedLocationId 
      ? locations.find(loc => loc.id === selectedLocationId) || null 
      : null
  );

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    onSelectLocation(location.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Select Testing Location</h2>
        <p className="text-sm text-gray-500">Choose from our available testing centers</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {locations.map(location => (
          <div 
            key={location.id}
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleLocationSelect(location)}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden mr-4">
                <img 
                  src={location.image || 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'} 
                  alt={location.name}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-medium text-gray-900">{location.name}</h3>
                  {selectedLocationId === location.id && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                </div>
                
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                  <span>{location.address}, {location.city}, {location.state} {location.zipCode}</span>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  {location.amenities && location.amenities.map((amenity, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedLocation && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-900 mb-2">Location Map</p>
          <div className="h-64 bg-gray-200 rounded-md overflow-hidden relative flex items-center justify-center">
            {/* In a real app, this would be a proper map component */}
            <div className="text-center p-4">
              <MapPin className="h-10 w-10 text-blue-500 mx-auto" />
              <p className="text-sm text-gray-500 mt-2">
                {selectedLocation.name}<br />
                {selectedLocation.address}, {selectedLocation.city}<br />
                {selectedLocation.state} {selectedLocation.zipCode}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Coordinates: {selectedLocation.coordinates.latitude}, {selectedLocation.coordinates.longitude}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;