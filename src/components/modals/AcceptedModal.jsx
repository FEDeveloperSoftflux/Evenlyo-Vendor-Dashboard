import React from 'react';
import { X, CheckCircle } from 'lucide-react';

const AcceptedModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-3xl px-6 pt-6 pb-6 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-primary text-white hover:opacity-90 transition-opacity"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Booking Accepted
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              This booking has been successfully accepted.
            </p>

            {/* Booking details */}
            {booking && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-medium text-gray-900">{booking.title}</h4>
                <p className="text-sm text-gray-600">{booking.date} • {booking.time}</p>
                <p className="text-sm text-gray-600">{booking.client}</p>
              </div>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-gradient-primary py-3 px-6 rounded-2xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptedModal;
