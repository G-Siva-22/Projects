import React, { createContext, useState, useContext, useEffect } from 'react';
import { Exam, Booking, Location, TimeSlot } from '../types';
import { mockExams, mockLocations, mockTimeSlots } from '../data/mockData';

interface ExamContextType {
  exams: Exam[];
  locations: Location[];
  timeSlots: TimeSlot[];
  filteredExams: Exam[];
  isLoading: boolean;
  error: string | null;
  getExamById: (id: string) => Exam | undefined;
  getLocationById: (id: string) => Location | undefined;
  getTimeSlotById: (id: string) => TimeSlot | undefined;
  filterExams: (searchTerm: string, category?: string) => void;
  bookExam: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => Promise<string>;
  getBookingsByUserId: (userId: string) => Booking[];
  getBookingById: (id: string) => Booking | undefined;
  updateBookingStatus: (id: string, status: string) => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const useExams = () => {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error('useExams must be used within an ExamProvider');
  }
  return context;
};

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load data from localStorage or use mock data
    const loadInitialData = () => {
      setIsLoading(true);
      
      try {
        // Load exams
        const storedExams = localStorage.getItem('exams');
        if (storedExams) {
          setExams(JSON.parse(storedExams));
          setFilteredExams(JSON.parse(storedExams));
        } else {
          setExams(mockExams);
          setFilteredExams(mockExams);
        }
        
        // Load locations
        const storedLocations = localStorage.getItem('locations');
        if (storedLocations) {
          setLocations(JSON.parse(storedLocations));
        } else {
          setLocations(mockLocations);
        }
        
        // Load timeSlots
        const storedTimeSlots = localStorage.getItem('timeSlots');
        if (storedTimeSlots) {
          setTimeSlots(JSON.parse(storedTimeSlots));
        } else {
          setTimeSlots(mockTimeSlots);
        }
        
        // Load bookings
        const storedBookings = localStorage.getItem('bookings');
        if (storedBookings) {
          setBookings(JSON.parse(storedBookings));
        } else {
          setBookings([]);
        }
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  const getExamById = (id: string): Exam | undefined => {
    return exams.find(exam => exam.id === id);
  };

  const getLocationById = (id: string): Location | undefined => {
    return locations.find(location => location.id === id);
  };

  const getTimeSlotById = (id: string): TimeSlot | undefined => {
    return timeSlots.find(timeSlot => timeSlot.id === id);
  };

  const filterExams = (searchTerm: string, category?: string) => {
    let filtered = exams;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        exam => 
          exam.title.toLowerCase().includes(term) || 
          exam.description.toLowerCase().includes(term)
      );
    }
    
    if (category && category !== 'all') {
      filtered = filtered.filter(exam => exam.category === category);
    }
    
    setFilteredExams(filtered);
  };

  const bookExam = async (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<string> => {
    // Create new booking
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    
    // Add to bookings array
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    
    // Save to localStorage
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    return newBooking.id;
  };

  const getBookingsByUserId = (userId: string): Booking[] => {
    return bookings.filter(booking => booking.userId === userId);
  };

  const getBookingById = (id: string): Booking | undefined => {
    return bookings.find(booking => booking.id === id);
  };

  const updateBookingStatus = (id: string, status: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    );
    
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const value = {
    exams,
    locations,
    timeSlots,
    filteredExams,
    isLoading,
    error,
    getExamById,
    getLocationById,
    getTimeSlotById,
    filterExams,
    bookExam,
    getBookingsByUserId,
    getBookingById,
    updateBookingStatus
  };

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
};