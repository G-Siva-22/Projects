import { User, Exam, Location, TimeSlot } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    phone: '555-123-4567',
    createdAt: '2023-01-01T00:00:00Z'
  },
  {
    id: 'user2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'student@example.com',
    password: 'password123',
    role: 'student',
    profilePicture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    phone: '555-987-6543',
    createdAt: '2023-01-15T00:00:00Z'
  }
];

// Mock Exams
export const mockExams: Exam[] = [
  {
    id: 'exam1',
    title: 'AWS Certified Solutions Architect',
    description: 'Validate your expertise in designing distributed systems on AWS. Learn how to architect and deploy secure and robust applications.',
    category: 'cloud',
    duration: 180,
    price: 150,
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
    prerequisites: ['Basic IT knowledge', 'Understanding of cloud concepts'],
    difficulty: 'intermediate',
    passScore: 720,
    availableLocations: ['loc1', 'loc2', 'loc3'],
    availableTimeSlots: ['ts1', 'ts2', 'ts3', 'ts4']
  },
  {
    id: 'exam2',
    title: 'Certified Ethical Hacker (CEH)',
    description: 'Learn ethical hacking methodology to identify vulnerabilities in systems. Prepare for a career in IT security.',
    category: 'security',
    duration: 240,
    price: 350,
    image: 'https://images.pexels.com/photos/207580/pexels-photo-207580.jpeg',
    prerequisites: ['Networking knowledge', '2 years IT experience recommended'],
    difficulty: 'advanced',
    passScore: 70,
    availableLocations: ['loc1', 'loc3'],
    availableTimeSlots: ['ts2', 'ts3', 'ts5']
  },
  {
    id: 'exam3',
    title: 'Microsoft Azure Fundamentals (AZ-900)',
    description: 'Get certified in cloud concepts, Azure services, and Azure management. Perfect for those new to cloud computing.',
    category: 'cloud',
    duration: 90,
    price: 99,
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg',
    prerequisites: ['Basic IT knowledge'],
    difficulty: 'beginner',
    passScore: 700,
    availableLocations: ['loc2', 'loc3'],
    availableTimeSlots: ['ts1', 'ts4', 'ts5']
  },
  {
    id: 'exam4',
    title: 'Certified Information Systems Security Professional (CISSP)',
    description: 'Demonstrate your expertise in IT security. Covers security and risk management, asset security, security engineering, and more.',
    category: 'security',
    duration: 360,
    price: 699,
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg',
    prerequisites: ['5 years of security experience', 'Knowledge in at least 2 security domains'],
    difficulty: 'advanced',
    passScore: 700,
    availableLocations: ['loc1', 'loc2'],
    availableTimeSlots: ['ts3', 'ts5']
  },
  {
    id: 'exam5',
    title: 'CompTIA Network+',
    description: 'Build the skills needed to design, configure, manage and troubleshoot wired and wireless networks.',
    category: 'networking',
    duration: 90,
    price: 329,
    image: 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg',
    prerequisites: ['CompTIA A+ recommended', 'Basic IT knowledge'],
    difficulty: 'intermediate',
    passScore: 720,
    availableLocations: ['loc1', 'loc2', 'loc3'],
    availableTimeSlots: ['ts1', 'ts2', 'ts4']
  },
  {
    id: 'exam6',
    title: 'Oracle Java SE 11 Programmer I',
    description: 'Validate your understanding of Java SE and the updates to the language through Java SE 11.',
    category: 'programming',
    duration: 180,
    price: 245,
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
    prerequisites: ['Basic knowledge of Java', 'Understanding of OOP concepts'],
    difficulty: 'intermediate',
    passScore: 68,
    availableLocations: ['loc2', 'loc3'],
    availableTimeSlots: ['ts2', 'ts3', 'ts5']
  }
];

// Mock Locations
export const mockLocations: Location[] = [
  {
    id: 'loc1',
    name: 'Tech Center Downtown',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060
    },
    capacity: 50,
    amenities: ['Wheelchair Access', 'Parking', 'Coffee Shop'],
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg'
  },
  {
    id: 'loc2',
    name: 'Innovation Hub',
    address: '456 Tech Avenue',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94107',
    country: 'USA',
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194
    },
    capacity: 75,
    amenities: ['Wheelchair Access', 'Public Transportation', 'Cafeteria'],
    image: 'https://images.pexels.com/photos/1098460/pexels-photo-1098460.jpeg'
  },
  {
    id: 'loc3',
    name: 'Global Learning Center',
    address: '789 Education Lane',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    country: 'USA',
    coordinates: {
      latitude: 41.8781,
      longitude: -87.6298
    },
    capacity: 100,
    amenities: ['Wheelchair Access', 'Parking', 'Cafeteria', 'Study Area'],
    image: 'https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg'
  }
];

// Mock Time Slots
export const mockTimeSlots: TimeSlot[] = [
  {
    id: 'ts1',
    date: '2025-01-15',
    startTime: '09:00',
    endTime: '12:00',
    availableSeats: 25
  },
  {
    id: 'ts2',
    date: '2025-01-15',
    startTime: '14:00',
    endTime: '17:00',
    availableSeats: 20
  },
  {
    id: 'ts3',
    date: '2025-01-16',
    startTime: '09:00',
    endTime: '12:00',
    availableSeats: 30
  },
  {
    id: 'ts4',
    date: '2025-01-16',
    startTime: '14:00',
    endTime: '17:00',
    availableSeats: 15
  },
  {
    id: 'ts5',
    date: '2025-01-17',
    startTime: '10:00',
    endTime: '13:00',
    availableSeats: 25
  }
];