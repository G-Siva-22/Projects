/**
 * Main JavaScript file for Local Community Event Portal
 * Initializes the application and contains core functionality
 */

// Log welcome message to console
console.log("Welcome to the Community Portal");

// Display alert when the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
  // Add event listeners for before page unload
  window.addEventListener('beforeunload', handleBeforeUnload);
  
  // Add event listeners for navigation links
  setupSmoothScrolling();
  
  // Load events from mock API
  loadEvents();
}

/**
 * Handle before unload event to warn users when leaving a form page
 * @param {Event} event - The beforeunload event
 */
function handleBeforeUnload(event) {
  // Check if the user has started filling out the form
  const form = document.getElementById('registrationForm');
  if (form) {
    const formInputs = form.querySelectorAll('input, select, textarea');
    let formStarted = false;
    
    formInputs.forEach(input => {
      if (input.value !== '') {
        formStarted = true;
      }
    });
    
    if (formStarted) {
      event.preventDefault();
      event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      return event.returnValue;
    }
  }
}

/**
 * Set up smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Scroll to target section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Create modal for enlarged images
 */
function createImageModal() {
  // Create modal elements if they don't exist
  if (!document.querySelector('.modal')) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };
    
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
  
  // Add double-click event to all gallery images
  const galleryImages = document.querySelectorAll('.gallery-image');
  galleryImages.forEach(img => {
    img.addEventListener('dblclick', function() {
      const modal = document.querySelector('.modal');
      const modalImg = document.querySelector('.modal-content');
      
      modal.style.display = 'flex';
      modalImg.src = this.src;
    });
  });
}

/**
 * Load events from mock API (simulated)
 */
function loadEvents() {
  // Show loading indicator
  const eventsContainer = document.getElementById('eventsContainer');
  
  if (!eventsContainer) {
    return;
  }
  
  // Simulate API request with setTimeout
  setTimeout(() => {
    try {
      // Mock events data (in a real app, this would come from an API)
      const events = [
        {
          id: 1,
          title: 'Summer Music Festival',
          date: '2025-07-15',
          time: '4:00 PM',
          location: 'Central Park',
          description: 'Enjoy live performances from local and national artists.',
          category: 'music',
          image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
          seats: 200
        },
        {
          id: 2,
          title: 'Farmers Market',
          date: '2025-06-10',
          time: '9:00 AM',
          location: 'Downtown Square',
          description: 'Fresh produce, crafts, and food from local vendors.',
          category: 'community',
          image: 'https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg',
          seats: 0
        },
        {
          id: 3,
          title: 'Charity 5K Run',
          date: '2025-08-20',
          time: '8:00 AM',
          location: 'Riverside Park',
          description: 'Run to support local charities and community programs.',
          category: 'sports',
          image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
          seats: 150
        },
        {
          id: 4,
          title: 'Art & Culture Exhibition',
          date: '2025-07-05',
          time: '10:00 AM',
          location: 'Community Center',
          description: 'Showcasing works from local artists and cultural performances.',
          category: 'arts',
          image: 'https://images.pexels.com/photos/20967/pexels-photo.jpg',
          seats: 100
        },
        {
          id: 5,
          title: 'Community Workshop',
          date: '2025-06-25',
          time: '6:00 PM',
          location: 'Public Library',
          description: 'Learn new skills and connect with community members.',
          category: 'education',
          image: 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg',
          seats: 30
        },
        {
          id: 6,
          title: 'Food Drive',
          date: '2025-08-10',
          time: '11:00 AM',
          location: 'Community Center',
          description: 'Help collect food donations for local food banks.',
          category: 'charity',
          image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
          seats: 50
        }
      ];
      
      // Display events
      displayEvents(events);
      
      // Setup event filter
      setupEventFilter(events);
      
      // Setup image modal for gallery
      createImageModal();
      
    } catch (error) {
      console.error('Error loading events:', error);
      eventsContainer.innerHTML = '<p class="error">Failed to load events. Please try again later.</p>';
    }
  }, 1000); // Simulate network delay
}

/**
 * Display events in the events container
 * @param {Array} events - Array of event objects
 */
function displayEvents(events) {
  const eventsContainer = document.getElementById('eventsContainer');
  
  if (!eventsContainer) {
    return;
  }
  
  // Clear loading message
  eventsContainer.innerHTML = '';
  
  if (events.length === 0) {
    eventsContainer.innerHTML = '<p>No events found matching your criteria.</p>';
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
        <p class="event-location">${event.location}</p>
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
}

/**
 * Setup event filter functionality
 * @param {Array} events - Array of event objects
 */
function setupEventFilter(events) {
  const categoryFilter = document.getElementById('categoryFilter');
  
  if (!categoryFilter) {
    return;
  }
  
  categoryFilter.addEventListener('change', function() {
    const selectedCategory = this.value;
    
    let filteredEvents;
    if (selectedCategory === 'all') {
      filteredEvents = events;
    } else {
      filteredEvents = events.filter(event => event.category === selectedCategory);
    }
    
    displayEvents(filteredEvents);
  });
}