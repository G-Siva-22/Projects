import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TimeSlot } from '../../types';

interface CalendarProps {
  availableTimeSlots: TimeSlot[];
  onSelectTimeSlot: (timeSlotId: string) => void;
  selectedTimeSlotId?: string;
}

const Calendar: React.FC<CalendarProps> = ({ 
  availableTimeSlots, 
  onSelectTimeSlot,
  selectedTimeSlotId 
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlotsForSelectedDate, setTimeSlotsForSelectedDate] = useState<TimeSlot[]>([]);
  
  // Generate calendar days for the current month
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week of the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    // Start date (might be from previous month)
    const startDate = new Date(year, month, 1 - daysFromPrevMonth);
    
    // Calculate total days to show (42 = 6 weeks)
    const totalDays = 42;
    
    // Generate array of dates
    const days: Date[] = [];
    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    
    setCalendarDays(days);
  }, [currentMonth]);
  
  // Filter time slots for selected date
  useEffect(() => {
    if (selectedDate) {
      const slots = availableTimeSlots.filter(
        timeSlot => timeSlot.date === selectedDate
      );
      setTimeSlotsForSelectedDate(slots);
    } else {
      setTimeSlotsForSelectedDate([]);
    }
  }, [selectedDate, availableTimeSlots]);
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Format date to YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };
  
  // Check if a date has available time slots
  const hasTimeSlots = (date: Date): boolean => {
    const formattedDate = formatDate(date);
    return availableTimeSlots.some(slot => slot.date === formattedDate);
  };
  
  // Handle date selection
  const handleDateClick = (date: Date) => {
    if (!isPastDate(date) && hasTimeSlots(date) && isCurrentMonth(date)) {
      const formattedDate = formatDate(date);
      setSelectedDate(formattedDate);
    }
  };
  
  // Format time for display (e.g., "09:00" to "9:00 AM")
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };
  
  // Check if a date is in the current month
  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth();
  };
  
  // Check if a date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is in the past
  const isPastDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  // Days of the week header
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Format month name
  const monthYearString = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{monthYearString}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={goToPreviousMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPastDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1))}
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button 
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Weekday headers */}
        {weekdays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, index) => {
          const formattedDate = formatDate(day);
          const hasSlots = hasTimeSlots(day);
          const isSelected = selectedDate === formattedDate;
          const isDisabled = !hasSlots || !isCurrentMonth(day) || isPastDate(day);
          
          return (
            <button
              key={index}
              onClick={() => !isDisabled && handleDateClick(day)}
              disabled={isDisabled}
              className={`
                h-10 w-10 rounded-full flex items-center justify-center text-sm relative
                ${!isCurrentMonth(day) ? 'text-gray-300' : 'text-gray-700'}
                ${hasSlots && isCurrentMonth(day) && !isPastDate(day) ? 'hover:bg-blue-50 cursor-pointer' : 'cursor-default'}
                ${isToday(day) ? 'border border-blue-500' : ''}
                ${isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                transition-colors
              `}
            >
              {day.getDate()}
              {hasSlots && isCurrentMonth(day) && !isSelected && !isPastDate(day) && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Time slots */}
      {selectedDate && timeSlotsForSelectedDate.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900 mb-3">Available Times</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {timeSlotsForSelectedDate.map(slot => (
              <button
                key={slot.id}
                onClick={() => onSelectTimeSlot(slot.id)}
                className={`
                  py-2 px-3 rounded-md text-sm font-medium
                  ${selectedTimeSlotId === slot.id 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  transition-colors
                `}
              >
                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                <span className="block text-xs mt-1">
                  {slot.availableSeats} {slot.availableSeats === 1 ? 'seat' : 'seats'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {selectedDate && timeSlotsForSelectedDate.length === 0 && (
        <div className="mt-6 text-center py-4 bg-gray-50 rounded-md">
          <p className="text-gray-500">No available time slots for this date.</p>
        </div>
      )}
    </div>
  );
};

export default Calendar;