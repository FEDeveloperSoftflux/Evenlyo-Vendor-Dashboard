import React from "react";
import { X, Check, Clock, Truck, Package, User } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

const TrackOrderModal = ({ isOpen, onClose, orderData }) => {
  if (!isOpen || !orderData) return null;

  const orderTimeline = [
    {
      id: 1,
      title: "Request Sent",
      description: "Client sent order request",
      status: "completed",
      date: "2025-01-07",
      time: "07:45",
      icon: User,
      actor: "Client",
    },
    {
      id: 2,
      title: "Order Accepted",
      description: "Vendor accepted the order",
      status: "completed",
      date: "2025-01-07",
      time: "09:00",
      icon: Check,
      actor: "Vendor",
    },
    {
      id: 3,
      title: "Picked Up",
      description: "Order picked up from location",
      status: "completed",
      date: "2025-01-14",
      time: "11:15",
      icon: Package,
      actor: "Driver",
    },
    {
      id: 4,
      title: "Delivered",
      description: "Order delivered to destination",
      status: "pending",
      date: null,
      time: "Pending",
      icon: Truck,
      actor: null,
    },
    {
      id: 5,
      title: "Received",
      description: "Client confirmed receipt",
      status: "pending",
      date: null,
      time: "Pending",
      icon: User,
      actor: null,
    },
    {
      id: 6,
      title: "Completed",
      description: "Total Price: $2100.00",
      status: "pending",
      date: null,
      time: "Pending",
      icon: Check,
      actor: null,
    },
  ];

  return (
    <div>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 sm:inset-y-0 sm:right-0 z-50 w-full sm:max-w-md bg-white shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Order Mapping - {orderData.id}
              </h2>
              <Badge status="on the way" className="mt-1">
                On the way
              </Badge>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Order Information */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            Order Information
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">ORD-003</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Client Name:</span>
              <span className="font-medium">Global Supply Co</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">+1-234-567-8903</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Price:</span>
              <span className="text-lg font-bold text-gray-900">$2100.00</span>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="px-6 py-4">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Order Timeline
          </h3>

          <div className="space-y-4">
            {orderTimeline.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = step.status === "completed";
              const isPending = step.status === "pending";

              return (
                <div
                  key={step.id}
                  className="relative flex items-start space-x-2"
                >
                  {/* Connector line */}
                  {index < orderTimeline.length - 1 && (
                    <div className="absolute left-4 top-8 w-0.5 h-8 bg-gray-200" />
                  )}

                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-green-100 text-green-600"
                        : isPending
                        ? "bg-gray-100 text-gray-400"
                        : "bg-pink-100 text-pink-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {step.title}
                      </h4>
                      {step.actor && (
                        <Badge
                          status={
                            step.actor === "Client"
                              ? "claim"
                              : step.actor === "Vendor"
                              ? "delivered"
                              : "on the way"
                          }
                          className="text-xs"
                        >
                          {step.actor}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </p>
                    {step.date && (
                      <div className="flex items-center mt-2">
                        <Clock className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">
                          {step.date} {step.time}
                        </span>
                      </div>
                    )}
                    {isPending && (
                      <span className="text-xs text-gray-400 flex items-center mt-2">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.time}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Notes */}
        <div className="px-6 py-4 border-t border-gray-100">
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            Progress Notes
          </h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
            <div className="flex items-start">
              <Clock className="w-4 h-4 text-yellow-600 mt-0.5 mr-2" />
              <p className="text-sm text-yellow-800">
                Order is in progress. Next phase will be marked as completed
                once the current step is finished.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={() => {
              // Handle download PDF
              console.log("Download PDF for order:", orderData.id);
            }}
          >
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderModal;
