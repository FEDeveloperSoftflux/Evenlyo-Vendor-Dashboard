import React from 'react';
import { Clock, User, Calendar, Edit, Trash2 } from 'lucide-react';

const EventPopover = ({ event, position }) => {
  if (!event) return null;

  const getStatusColor = (status) => {
    const colors = {
      'New Order': 'bg-pink-100 text-pink-600',
      'Complete': 'bg-green-100 text-green-600',
      'In Progress': 'bg-yellow-100 text-yellow-600',
      'Reject': 'bg-red-100 text-red-600'
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  // Sample extended data for popover
  const eventData = {
    id: event.id || '#TRK001',
    title: 'DJ ABZ WINE',
    type: 'Concert',
    time: event.time || '9:30 AM',
    location: 'MRK Complex Location',
    customer: event.customer || 'John Smith',
    status: event.status || 'Complete'
  };

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x - 150,
        top: position.y - 10,
        transform: 'translateY(-100%)',
      }}
    >
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-4 w-80 relative">
        {/* Triangle pointer */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
        </div>

        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-red-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">DJ</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{eventData.title}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(eventData.status)}`}>
                  {eventData.status}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Edit className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{eventData.time}</span>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>{eventData.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>Customer: {eventData.customer}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Booking ID: {eventData.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPopover;
