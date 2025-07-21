import React from "react";
import { X, Clock, Calendar as CalendarIcon } from "lucide-react";

const BookingDetailDrawer = ({ isOpen, onClose, booking, onAccept, onReject }) => {
  if (!isOpen || !booking) return null;

  const getStatusColor = (status) => {
    const colors = {
      "New Order": "bg-pink-100 text-pink-600",
      Complete: "bg-green-100 text-green-600",
      "In Progress": "bg-yellow-100 text-yellow-600",
      Reject: "bg-red-100 text-red-600",
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 p-6 pb-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Booking Details
              </h2>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={onClose}
                aria-label="Close drawer"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Booking ID and Status */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Booking #TRK001
                </h3>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  booking.status
                )}`}>
                {booking.status}
              </span>
            </div>

            {/* Date and Time */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  2024-06-27
                </p>
                <p className="text-sm text-gray-500">10:00</p>
              </div>
            </div>

            {/* Tracking ID */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Tracking ID
                </p>
                <p className="text-sm text-gray-500">TRK001</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 overflow-y-auto">
            {/* Buyer Details */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Buyer Details
              </h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JS</span>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">John Smith</h5>
                  <p className="text-sm text-gray-500">ID: USR001</p>
                </div>
              </div>
            </div>

            {/* Seller Details */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Seller Details
              </h4>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-red-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TS</span>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900">
                    Tech Solutions Ltd
                  </h5>
                  <p className="text-sm text-gray-500">New York, NY</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex-shrink-0 p-6 pt-4 space-y-3">
            <div className="flex gap-4">
              <button
                className="flex-1 py-3 px-4 border border-pink-500 text-pink-500 rounded-2xl font-medium hover:bg-pink-50 transition-colors"
                onClick={onAccept}
              >
                Accept
              </button>
              <button
                className="flex-1 py-3 px-4 bg-gradient-primary text-white rounded-2xl font-medium hover:opacity-90 transition-opacity"
                onClick={onReject}
              >
                Reject
              </button>
            </div>
            <button className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-colors">
              Track Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailDrawer;
