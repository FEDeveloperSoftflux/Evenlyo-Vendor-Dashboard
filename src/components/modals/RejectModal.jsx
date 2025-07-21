import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

const RejectModal = ({ isOpen, onClose, onConfirm, booking }) => {
  const [rejectReason, setRejectReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const predefinedReasons = [
    'Double booking',
    'Venue unavailable',
    'Equipment not available',
    'Staff shortage',
    'Weather conditions',
    'Client requirements not met',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalReason = selectedReason === 'Other' ? rejectReason : selectedReason;
    onConfirm(finalReason);
    setRejectReason('');
    setSelectedReason('');
    onClose();
  };

  const handleClose = () => {
    setRejectReason('');
    setSelectedReason('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Reject Booking
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to reject this booking? Please select a reason.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                {/* Booking details */}
                {booking && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900">{booking.title}</h4>
                    <p className="text-sm text-gray-600">{booking.date} • {booking.time}</p>
                    <p className="text-sm text-gray-600">{booking.client}</p>
                  </div>
                )}

                {/* Reason selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for rejection
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {predefinedReasons.map((reason) => (
                      <label key={reason} className="flex items-center">
                        <input
                          type="radio"
                          name="rejectReason"
                          value={reason}
                          checked={selectedReason === reason}
                          onChange={(e) => setSelectedReason(e.target.value)}
                          className="mr-2 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{reason}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Custom reason input */}
                {selectedReason === 'Other' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please specify
                    </label>
                    <textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      rows="3"
                      placeholder="Enter custom reason..."
                      required
                    />
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedReason || (selectedReason === 'Other' && !rejectReason.trim())}
                    className="flex-1 bg-red-600 py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reject Booking
                  </button>
                </div>
              </form>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
