// User related types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: 'admin' | 'student';
  profilePicture?: string;
  phone?: string;
  createdAt?: string;
}

// Exam related types
export interface Exam {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number; // in minutes
  price: number;
  image: string;
  prerequisites?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  passScore?: number;
  availableLocations: string[]; // location IDs
  availableTimeSlots: string[]; // timeSlot IDs
}

// Location related types
export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  capacity: number;
  amenities?: string[];
  image?: string;
}

// Time slot related types
export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  availableSeats: number;
}

// Booking related types
export interface Booking {
  id: string;
  userId: string;
  examId: string;
  locationId: string;
  timeSlotId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentId?: string;
  createdAt: string;
  specialRequirements?: string;
}

// Payment related types
export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  method: 'credit_card' | 'paypal' | 'bank_transfer';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
}

// Notification related types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'reminder' | 'confirmation' | 'update' | 'alert';
  isRead: boolean;
  createdAt: string;
}