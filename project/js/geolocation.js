/**
 * Geolocation functionality for Local Community Event Portal
 * Provides location-based services for finding nearby events
 */

document.addEventListener('DOMContentLoaded', function() {
  const findNearbyEventsBtn = document.getElementById('findNearbyEvents');
  
  if (findNearbyEventsBtn) {
    findNearbyEventsBtn.addEventListener('click', findNearbyEvents);
  }
});

/**
 * Find nearby events using geolocation
 */
function findNearbyEvents() {
  // Check if geolocation is available
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    return;
  }
  
  // Create status message element if it doesn't exist
  let statusElement = document.getElementById('locationStatus');
  if (!statusElement) {
    statusElement = document.createElement('p');
    statusElement.id = 'locationStatus';
    statusElement.style.marginTop = '16px';
    
    const welcomeBanner = document.getElementById('welcomeBanner');
    if (welcomeBanner) {
      welcomeBanner.querySelector('.container').appendChild(statusElement);
    }
  }
  
  // Update status message
  statusElement.textContent = 'Locating you...';
  statusElement.style.color = '#3366cc';
  
  // Geolocation options
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };
  
  // Get current position
  navigator.geolocation.getCurrentPosition(
    // Success callback
    function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const accuracy = position.coords.accuracy;
      
      // Display coordinates
      statusElement.innerHTML = `
        <strong>Found your location!</strong><br>
        Latitude: ${latitude.toFixed(6)}<br>
        Longitude: ${longitude.toFixed(6)}<br>
        Accuracy: ${accuracy.toFixed(1)} meters
      `;
      statusElement.style.color = '#4caf50';
      
      // Find nearby events (in a real app, this would query a backend)
      findEventsNearCoordinates(latitude, longitude);
    },
    
    // Error callback
    function(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          statusElement.textContent = 'You denied the request for geolocation.';
          break;
        case error.POSITION_UNAVAILABLE:
          statusElement.textContent = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          statusElement.textContent = 'The request to get your location timed out.';
          break;
        case error.UNKNOWN_ERROR:
          statusElement.textContent = 'An unknown error occurred.';
          break;
      }
      statusElement.style.color = '#f44336';
    },
    
    // Options
    options
  );
}

/**
 * Find events near the given coordinates
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 */
function findEventsNearCoordinates(latitude, longitude) {
  // In a real application, this would make an API call to get nearby events
  // For this demo, we'll simulate it with a timeout
  
  const eventsContainer = document.getElementById('eventsContainer');
  if (!eventsContainer) {
    return;
  }
  
  // Show loading message
  eventsContainer.innerHTML = '<p id="loadingEvents">Finding events near you...</p>';
  
  // Scroll to events section
  document.getElementById('home').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  
  // Simulate API request with setTimeout
  setTimeout(() => {
    try {
      // Mock nearby events data (in a real app, this would come from an API)
      const nearbyEvents = [
        {
          id: 7,
          title: 'Local Jazz Night',
          date: '2025-06-18',
          time: '7:00 PM',
          location: 'City Jazz Club',
          description: 'Enjoy an evening of live jazz music from local artists.',
          category: 'music',
          image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg',
          seats: 50,
          distance: '0.8 miles'
        },
        {
          id: 8,
          title: 'Community Garden Workshop',
          date: '2025-06-12',
          time: '10:00 AM',
          location: 'Community Garden',
          description: 'Learn gardening tips and help maintain our community garden.',
          category: 'education',
          image: 'https://images.pexels.com/photos/7728943/pexels-photo-7728943.jpeg',
          seats: 20,
          distance: '1.2 miles'
        },
        {
          id: 9,
          title: 'Local Business Networking',
          date: '2025-06-20',
          time: '6:00 PM',
          location: 'Downtown Conference Center',
          description: 'Connect with local business owners and entrepreneurs.',
          category: 'community',
          image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
          seats: 30,
          distance: '1.5 miles'
        }
      ];
      
      // Display nearby events
      displayNearbyEvents(nearbyEvents);
      
    } catch (error) {
      console.error('Error finding nearby events:', error);
      eventsContainer.innerHTML = '<p class="error">Failed to find nearby events. Please try again later.</p>';
    }
  }, 2000); // Simulate network delay
}

/**
 * Display nearby events in the events container
 * @param {Array} events - Array of nearby event objects
 */
function displayNearbyEvents(events) {
  const eventsContainer = document.getElementById('eventsContainer');
  
  if (!eventsContainer) {
    return;
  }
  
  // Clear loading message
  eventsContainer.innerHTML = '<h3 class="nearby-events-title">Events Near You</h3>';
  
  if (events.length === 0) {
    eventsContainer.innerHTML += '<p>No events found near your location.</p>';
    return;
  }
  
  // Create event cards
  events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    
    // Format date for display
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Check if event is in the past
    const isPast = eventDate < new Date();
    const isFull = event.seats <= 0;
    
    eventCard.innerHTML = `
      <img src="${event.image}" alt="${event.title}" class="event-image">
      <div class="event-details">
        <span class="event-category">${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
        <h3 class="event-title">${event.title}</h3>
        <p class="event-date">${formattedDate} at ${event.time}</p>
        <p class="event-location">${event.location} (${event.distance})</p>
        <p class="event-description">${event.description}</p>
        ${isPast ? 
          '<p class="event-status">This event has already taken place.</p>' : 
          isFull ? 
          '<p class="event-status">This event is fully booked.</p>' : 
          `<p class="event-seats">Available seats: ${event.seats}</p>
           <button class="btn btn-primary register-btn" data-event-id="${event.id}">Register Now</button>`
        }
      </div>
    `;
    
    eventsContainer.appendChild(eventCard);
    
    // Add event listener to register button
    if (!isPast && !isFull) {
      const registerBtn = eventCard.querySelector('.register-btn');
      registerBtn.addEventListener('click', function() {
        // Scroll to registration form
        document.getElementById('contact').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Pre-select the event type in the form
        const eventTypeSelect = document.getElementById('eventType');
        if (eventTypeSelect) {
          // Find the closest match for the event category
          const options = Array.from(eventTypeSelect.options);
          const matchingOption = options.find(option => 
            option.value === event.category || 
            option.text.toLowerCase().includes(event.category)
          );
          
          if (matchingOption) {
            eventTypeSelect.value = matchingOption.value;
          }
        }
        
        // Set the event date in the form
        const eventDateInput = document.getElementById('eventDate');
        if (eventDateInput) {
          eventDateInput.value = event.date;
        }
      });
    }
  });
  
  // Add a message about distance calculation
  const distanceMessage = document.createElement('p');
  distanceMessage.textContent = 'Distances are calculated based on your current location.';
  distanceMessage.style.fontSize = '0.9rem';
  distanceMessage.style.color = '#616161';
  distanceMessage.style.textAlign = 'center';
  distanceMessage.style.marginTop = '24px';
  eventsContainer.appendChild(distanceMessage);
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
}

/**
 * Convert degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} Radians
 */
function deg2rad(deg) {
  return deg * (Math.PI/180);
}