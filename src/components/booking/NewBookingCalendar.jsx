import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import Badge from '../ui/Badge';
import EventPopover from './EventPopover';
import BookingDetailDrawer from './BookingDetailDrawer';
import AcceptedModal from '../modals/AcceptedModal';
import RejectModal from '../modals/RejectModal';
import { getBadgeStyle } from '../../assets/styleguide/badges';

const BookingCalendar = ({ viewBy = "Week" }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2)); // March 2025
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const navigateDay = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + direction);
      return newDate;
    });
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

  // Sample events data
  const events = [
    { id: 1, date: '2025-03-01', status: 'rejected', title: 'Reject', time: '9:00', customer: 'Jane D.' },
    { id: 2, date: '2025-03-04', status: 'new', title: 'New Order', time: '12:30', customer: 'John S.' },
    { id: 3, date: '2025-03-05', status: 'complete', title: 'Complete', time: '11:30', customer: 'Mike R.' },
    { id: 4, date: '2025-03-09', status: 'new', title: 'New Order', time: '2:00', customer: 'Sarah L.' },
    { id: 5, date: '2025-03-12', status: 'complete', title: 'Complete', time: '9:30', customer: 'Alex T.' },
    { id: 6, date: '2025-03-16', status: 'in-progress', title: 'In Progress', time: '4:00', customer: 'Emma W.' },
    { id: 7, date: '2025-03-19', status: 'in-progress', title: 'In Progress', time: '1:00', customer: 'David M.' },
    { id: 8, date: '2025-03-21', status: 'rejected', title: 'Reject', time: '9:30', customer: 'Lisa K.' },
    { id: 9, date: '2025-03-25', status: 'complete', title: 'Complete', time: '11:00', customer: 'Tom H.' }
  ];

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === dateString);
      days.push({ day, dayEvents });
    }
    return days;
  };

  const calendarDays = renderCalendarDays();
  
  const DayView = () => {
    const dayEvents = events.filter(event => event.date === currentDate.toISOString().split('T')[0]);
    
    return (
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Day Navigation */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <button onClick={() => navigateDay(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Previous day">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>
          <button onClick={() => navigateDay(1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Next day">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Time Schedule */}
        <div className="p-4 sm:p-6">
          <div className="space-y-2">
            {Array.from({ length: 14 }, (_, i) => {
              const hour = i + 7; // Start from 7 AM
              const timeString = `${hour.toString().padStart(2, '0')}:00`;
              const hourEvents = dayEvents.filter(event => {
                const eventHour = parseInt(event.time?.split(':')[0] || '0');
                return eventHour === hour;
              });
              
              return (
                <div key={hour} className="grid grid-cols-12 gap-2 sm:gap-4 min-h-[50px] border-b border-gray-100 last:border-b-0">
                  <div className="col-span-2 sm:col-span-1 flex items-center">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium">{timeString}</span>
                  </div>
                  <div className="col-span-10 sm:col-span-11 flex items-center">
                    {hourEvents.length > 0 ? (
                      <div className="w-full space-y-1">
                        {hourEvents.map((event, idx) => (
                          <div key={idx} 
                               className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium cursor-pointer transition-all hover:shadow-sm ${getBadgeStyle(event.status)}`}
                               onClick={() => { setSelectedBooking(event); setIsDrawerOpen(true); }}>
                            <div className="flex items-center justify-between">
                              <span className="truncate">{event.title}</span>
                              <span className="ml-2 text-xs opacity-75">{event.time}</span>
                            </div>
                            {event.customer && (
                              <div className="text-xs opacity-80 mt-1">{event.customer}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center">
                        <div className="w-full h-8 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer opacity-50"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {dayEvents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm sm:text-base">No bookings scheduled for this day</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const MonthView = () => (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      {/* Week Days Header */}
      <div className="grid grid-cols-7 bg-gray-50">
        {weekDays.map(day => (
          <div key={day} className="p-2 sm:p-4 text-center border-r border-gray-200 last:border-r-0">
            <span className="text-xs sm:text-sm font-medium text-gray-600">{day}</span>
          </div>
        ))}
      </div>
      
      {/* Calendar Days */}
      <div className="grid grid-cols-7">
        {calendarDays.map((cell, index) => (
          <div key={index} className={`min-h-[80px] sm:min-h-[120px] p-1 sm:p-2 border-r border-b border-gray-200 last:border-r-0 ${
            cell ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
          }`}>
            {cell && (
              <>
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-900">{cell.day}</span>
                  {cell.dayEvents.length > 0 && (
                    <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      cell.dayEvents[0].status === 'new' ? 'bg-pink-500' :
                      cell.dayEvents[0].status === 'complete' ? 'bg-green-500' :
                      cell.dayEvents[0].status === 'in-progress' ? 'bg-yellow-500' :
                      cell.dayEvents[0].status === 'rejected' ? 'bg-red-500' : 'bg-gray-500'
                    }`}></span>
                  )}
                </div>
                <div className="space-y-1">
                  {cell.dayEvents.map((event, i) => (
                    <div key={i} 
                         className={`px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg text-xs font-medium cursor-pointer transition-all hover:shadow-sm ${getBadgeStyle(event.status)}`}
                         onMouseEnter={(e) => {
                           const rect = e.currentTarget.getBoundingClientRect();
                           setHoveredEvent(event);
                           setPopoverPosition({
                             x: rect.left + rect.width / 2,
                             y: rect.top
                           });
                         }}
                         onMouseLeave={() => setHoveredEvent(null)}
                         onClick={() => { setSelectedBooking(event); setIsDrawerOpen(true); }}>
                      <div className="flex items-center justify-between">
                        <span className="truncate text-xs">{event.title}</span>
                        {event.time && <span className="ml-1 text-xs hidden sm:inline">{event.time}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Navigation Header */}
      {viewBy !== "Day" && (
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Previous month">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Next month">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}
      {/* Render appropriate view */}
      {viewBy === "Day" ? <DayView /> : <MonthView />}

      {/* Event Popover */}
      {hoveredEvent && <EventPopover event={hoveredEvent} position={popoverPosition} onClose={() => setHoveredEvent(null)} />}

      {/* Booking Detail Drawer */}
      <BookingDetailDrawer
        isOpen={isDrawerOpen}
        booking={selectedBooking}
        onAccept={() => { setIsAcceptModalOpen(true); setIsDrawerOpen(false); }}
        onReject={() => { setIsRejectModalOpen(true); setIsDrawerOpen(false); }}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Modals */}
      <AcceptedModal isOpen={isAcceptModalOpen} onClose={() => setIsAcceptModalOpen(false)} booking={selectedBooking} />
      <RejectModal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} booking={selectedBooking} />
    </div>
  );
};

export default BookingCalendar;

