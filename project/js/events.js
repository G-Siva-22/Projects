/**
 * Events handling functionality for Local Community Event Portal
 * Contains event constructor and related methods
 */

/**
 * Event constructor function
 * @param {string} id - Unique identifier for the event
 * @param {string} title - Event title
 * @param {string} date - Event date (YYYY-MM-DD)
 * @param {string} time - Event time
 * @param {string} location - Event location
 * @param {string} description - Event description
 * @param {string} category - Event category (music, sports, arts, etc.)
 * @param {string} image - URL to event image
 * @param {number} seats - Available seats for the event
 */
function Event(id, title, date, time, location, description, category, image, seats) {
  this.id = id;
  this.title = title;
  this.date = date;
  this.time = time;
  this.location = location;
  this.description = description;
  this.category = category;
  this.image = image;
  this.seats = seats;
}

/**
 * Check if the event has available seats
 * @returns {boolean} True if seats are available, false otherwise
 */
Event.prototype.checkAvailability = function() {
  return this.seats > 0;
};

/**
 * Register a user for this event
 * @returns {boolean} True if registration was successful, false otherwise
 */
Event.prototype.registerUser = function() {
  if (this.checkAvailability()) {
    this.seats--;
    return true;
  }
  return false;
};

/**
 * Get formatted event date
 * @returns {string} Formatted date string
 */
Event.prototype.getFormattedDate = function() {
  const date = new Date(this.date);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Check if the event is in the past
 * @returns {boolean} True if the event is in the past, false otherwise
 */
Event.prototype.isPast = function() {
  const eventDate = new Date(this.date);
  const today = new Date();
  return eventDate < today;
};

/**
 * Higher-order function to filter events by criteria
 * @param {Array} events - Array of Event objects
 * @param {Function} filterFn - Filter function that returns true/false
 * @returns {Array} Filtered array of events
 */
function filterEvents(events, filterFn) {
  return events.filter(filterFn);
}

/**
 * Filter events by category
 * @param {Array} events - Array of Event objects
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered array of events
 */
function filterEventsByCategory(events, category) {
  return filterEvents(events, event => event.category === category);
}

/**
 * Filter events by availability
 * @param {Array} events - Array of Event objects
 * @returns {Array} Array of events with available seats
 */
function filterAvailableEvents(events) {
  return filterEvents(events, event => event.checkAvailability() && !event.isPast());
}

/**
 * Registration counter closure
 * Creates a counter for tracking registrations by category
 * @returns {Object} Object with methods to increment and get counts
 */
function createRegistrationCounter() {
  const counts = {};
  
  return {
    // Increment the count for a category
    increment: function(category) {
      if (!counts[category]) {
        counts[category] = 0;
      }
      counts[category]++;
      return counts[category];
    },
    
    // Get the count for a category
    getCount: function(category) {
      return counts[category] || 0;
    },
    
    // Get all counts
    getAllCounts: function() {
      return {...counts};
    }
  };
}

// Initialize registration counter
const registrationCounter = createRegistrationCounter();

/**
 * Add event listener for promo video
 */
document.addEventListener('DOMContentLoaded', function() {
  const promoVideo = document.getElementById('promoVideo');
  
  if (promoVideo) {
    promoVideo.addEventListener('canplay', function() {
      const videoMessage = document.getElementById('videoMessage');
      if (videoMessage) {
        videoMessage.textContent = 'Video ready to play';
      }
    });
  }
});