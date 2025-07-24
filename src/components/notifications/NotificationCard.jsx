import React from 'react';
import { Calendar, Clock, User, Eye, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

const NotificationCard = ({ notification, onViewBooking }) => {
  const getTimeElapsed = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return notificationTime.toLocaleDateString();
  };

  const isUnread = notification.status.toLowerCase() === 'unread';

  return (
    <div className="p-4 sm:p-6 hover:bg-gray-50/50 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 mt-1">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1">
                {notification.title}
              </h3>
              <p className="text-gray-700 text-sm mb-2">
                {notification.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-red-500">
                <Clock className="w-3 h-3" />
                <span className="font-medium">
                  5 days
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Action */}
        <div className="flex-shrink-0">
          <Button
            variant="gradient"
            size="sm"
            onClick={() => onViewBooking(notification)}
            className="bg-gradient-primary text-white hover:shadow-lg hover:scale-105 px-4 py-2 text-sm font-semibold transition-all duration-200 shadow-md"
          >
            View Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
