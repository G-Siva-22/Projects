/**
 * Form handling functionality for Local Community Event Portal
 * Contains form validation, submission, and event handling
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get form element
  const registrationForm = document.getElementById('registrationForm');
  
  if (registrationForm) {
    // Add submit event listener
    registrationForm.addEventListener('submit', handleFormSubmit);
    
    // Add event listeners for form fields
    setupFormEventListeners();
  }
});

/**
 * Setup event listeners for form fields
 */
function setupFormEventListeners() {
  // Phone validation on blur
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('blur', validatePhoneNumber);
  }
  
  // Event fee display on change
  const eventTypeSelect = document.getElementById('eventType');
  if (eventTypeSelect) {
    eventTypeSelect.addEventListener('change', displayEventFee);
  }
  
  // Character count for message textarea
  const messageTextarea = document.getElementById('message');
  if (messageTextarea) {
    messageTextarea.addEventListener('keyup', countCharacters);
  }
  
  // Clear preferences button
  const clearPreferencesBtn = document.getElementById('clearPreferences');
  if (clearPreferencesBtn) {
    clearPreferencesBtn.addEventListener('click', clearUserPreferences);
  }
}

/**
 * Handle form submission
 * @param {Event} event - The submit event
 */
function handleFormSubmit(event) {
  event.preventDefault();
  
  try {
    // Get form data
    const formData = new FormData(event.target);
    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    
    // Validate form data
    if (!validateForm(formDataObj)) {
      return;
    }
    
    // Simulate form submission with fetch
    simulateFormSubmission(formDataObj);
    
    // Save user preferences
    saveUserPreferences(formDataObj);
    
  } catch (error) {
    console.error('Error submitting form:', error);
    showFormOutput('An error occurred while submitting the form. Please try again.', 'error');
  }
}

/**
 * Validate the entire form
 * @param {Object} formData - Form data object
 * @returns {boolean} True if valid, false otherwise
 */
function validateForm(formData) {
  let isValid = true;
  const formOutput = document.getElementById('formOutput');
  
  // Check required fields
  if (!formData.name || !formData.email || !formData.eventDate || !formData.eventType) {
    showFormOutput('Please fill out all required fields.', 'error');
    isValid = false;
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    showFormOutput('Please enter a valid email address.', 'error');
    isValid = false;
  }
  
  // Validate phone if provided
  if (formData.phone && !validatePhoneNumber()) {
    isValid = false;
  }
  
  // Validate event date (must be in the future)
  const selectedDate = new Date(formData.eventDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    showFormOutput('Please select a future date for the event.', 'error');
    isValid = false;
  }
  
  return isValid;
}

/**
 * Validate phone number format
 * @returns {boolean} True if valid, false otherwise
 */
function validatePhoneNumber() {
  const phoneInput = document.getElementById('phone');
  const formOutput = document.getElementById('formOutput');
  
  if (!phoneInput || !formOutput) {
    return true;
  }
  
  const phoneValue = phoneInput.value.trim();
  
  // If empty, it's optional so return true
  if (phoneValue === '') {
    return true;
  }
  
  // Simple phone validation (xxx-xxx-xxxx or (xxx) xxx-xxxx or xxx.xxx.xxxx)
  const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  
  if (!phoneRegex.test(phoneValue)) {
    showFormOutput('Please enter a valid phone number (e.g., 555-123-4567).', 'error');
    phoneInput.classList.add('error');
    return false;
  } else {
    phoneInput.classList.remove('error');
    formOutput.textContent = '';
    formOutput.className = '';
    return true;
  }
}

/**
 * Display event fee based on selected event type
 */
function displayEventFee() {
  const eventTypeSelect = document.getElementById('eventType');
  const formOutput = document.getElementById('formOutput');
  
  if (!eventTypeSelect || !formOutput) {
    return;
  }
  
  const selectedValue = eventTypeSelect.value;
  let fee = 0;
  
  // Set fee based on event type (in a real app, this would come from the server)
  switch (selectedValue) {
    case 'music':
      fee = 25;
      break;
    case 'sports':
      fee = 15;
      break;
    case 'arts':
      fee = 20;
      break;
    case 'education':
      fee = 10;
      break;
    case 'charity':
      fee = 5;
      break;
    default:
      fee = 0;
  }
  
  if (fee > 0) {
    showFormOutput(`Event registration fee: $${fee}`, 'info');
  } else {
    formOutput.textContent = '';
    formOutput.className = '';
  }
}

/**
 * Count characters in the message textarea
 */
function countCharacters() {
  const messageTextarea = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  
  if (!messageTextarea || !charCount) {
    return;
  }
  
  const count = messageTextarea.value.length;
  charCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
  
  // Change color based on length
  if (count > 200) {
    charCount.style.color = '#f44336';
  } else {
    charCount.style.color = '';
  }
}

/**
 * Show output message in the form
 * @param {string} message - Message to display
 * @param {string} type - Message type (success, error, info)
 */
function showFormOutput(message, type) {
  const formOutput = document.getElementById('formOutput');
  
  if (!formOutput) {
    return;
  }
  
  formOutput.textContent = message;
  formOutput.className = type;
}

/**
 * Simulate form submission to a mock API
 * @param {Object} formData - Form data object
 */
function simulateFormSubmission(formData) {
  const formOutput = document.getElementById('formOutput');
  
  // Show loading message
  showFormOutput('Submitting your registration...', 'info');
  
  // Simulate API request with setTimeout
  setTimeout(() => {
    try {
      // In a real app, we would use fetch here:
      /*
      fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        showFormOutput('Registration successful! You will receive a confirmation email shortly.', 'success');
      })
      .catch(error => {
        showFormOutput('Failed to submit registration. Please try again.', 'error');
      });
      */
      
      // For this demo, just show a success message
      showFormOutput('Registration successful! You will receive a confirmation email shortly.', 'success');
      
      // Reset the form
      document.getElementById('registrationForm').reset();
      
    } catch (error) {
      console.error('Error during form submission:', error);
      showFormOutput('An error occurred. Please try again.', 'error');
    }
  }, 1500); // Simulate network delay
}

/**
 * Save user preferences to localStorage
 * @param {Object} formData - Form data object
 */
function saveUserPreferences(formData) {
  try {
    // Save event type preference
    if (formData.eventType) {
      localStorage.setItem('preferredEventType', formData.eventType);
    }
    
    // Save other preferences as needed
    sessionStorage.setItem('lastVisit', new Date().toISOString());
    
  } catch (error) {
    console.error('Error saving preferences:', error);
  }
}

/**
 * Clear user preferences from storage
 */
function clearUserPreferences() {
  try {
    localStorage.removeItem('preferredEventType');
    sessionStorage.clear();
    
    showFormOutput('Your preferences have been cleared.', 'info');
    
    // Reset the event type select
    const eventTypeSelect = document.getElementById('eventType');
    if (eventTypeSelect) {
      eventTypeSelect.value = '';
    }
    
  } catch (error) {
    console.error('Error clearing preferences:', error);
    showFormOutput('An error occurred while clearing preferences.', 'error');
  }
}

/**
 * Load user preferences from localStorage
 */
function loadUserPreferences() {
  try {
    const preferredEventType = localStorage.getItem('preferredEventType');
    
    if (preferredEventType) {
      const eventTypeSelect = document.getElementById('eventType');
      if (eventTypeSelect) {
        eventTypeSelect.value = preferredEventType;
        
        // Trigger the change event to display the fee
        const changeEvent = new Event('change');
        eventTypeSelect.dispatchEvent(changeEvent);
      }
    }
    
  } catch (error) {
    console.error('Error loading preferences:', error);
  }
}

// Load user preferences when the page loads
document.addEventListener('DOMContentLoaded', loadUserPreferences);