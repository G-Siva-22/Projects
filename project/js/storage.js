/**
 * Local storage functionality for Local Community Event Portal
 * Manages saving and retrieving user preferences
 */

/**
 * Check if storage is available
 * @param {string} type - The type of storage to check (localStorage or sessionStorage)
 * @returns {boolean} True if storage is available, false otherwise
 */
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}

/**
 * Save a value to localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store (will be JSON stringified)
 * @returns {boolean} True if successful, false otherwise
 */
function saveToLocalStorage(key, value) {
  if (storageAvailable('localStorage')) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }
  return false;
}

/**
 * Get a value from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} The stored value or defaultValue
 */
function getFromLocalStorage(key, defaultValue = null) {
  if (storageAvailable('localStorage')) {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  }
  return defaultValue;
}

/**
 * Save a value to sessionStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store (will be JSON stringified)
 * @returns {boolean} True if successful, false otherwise
 */
function saveToSessionStorage(key, value) {
  if (storageAvailable('sessionStorage')) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
      return false;
    }
  }
  return false;
}

/**
 * Get a value from sessionStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} The stored value or defaultValue
 */
function getFromSessionStorage(key, defaultValue = null) {
  if (storageAvailable('sessionStorage')) {
    try {
      const value = sessionStorage.getItem(key);
      return value !== null ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue;
    }
  }
  return defaultValue;
}

/**
 * Save user event preferences
 * @param {string} eventType - Preferred event type
 * @returns {boolean} True if successful, false otherwise
 */
function saveEventPreference(eventType) {
  return saveToLocalStorage('preferredEventType', eventType);
}

/**
 * Get user event preferences
 * @returns {string|null} Preferred event type or null
 */
function getEventPreference() {
  return getFromLocalStorage('preferredEventType', null);
}

/**
 * Clear all user preferences
 */
function clearAllPreferences() {
  if (storageAvailable('localStorage')) {
    localStorage.clear();
  }
  
  if (storageAvailable('sessionStorage')) {
    sessionStorage.clear();
  }
}

/**
 * Track visited events
 * @param {number} eventId - Event ID to track
 */
function trackVisitedEvent(eventId) {
  if (!storageAvailable('localStorage')) {
    return;
  }
  
  try {
    // Get existing visited events
    const visitedEvents = getFromLocalStorage('visitedEvents', []);
    
    // Add the new event if it's not already in the list
    if (!visitedEvents.includes(eventId)) {
      visitedEvents.push(eventId);
      saveToLocalStorage('visitedEvents', visitedEvents);
    }
    
  } catch (error) {
    console.error('Error tracking visited event:', error);
  }
}

/**
 * Get all visited events
 * @returns {Array} Array of visited event IDs
 */
function getVisitedEvents() {
  return getFromLocalStorage('visitedEvents', []);
}

// Initialize storage tracking when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Track page visit
  const visits = getFromLocalStorage('totalVisits', 0);
  saveToLocalStorage('totalVisits', visits + 1);
  
  // Save last visit timestamp
  saveToSessionStorage('lastVisit', new Date().toISOString());
});