import React, { useState } from "react";
import { Download, Eye, Mail } from "lucide-react";
import TrackOrderModal from "./TrackOrderModal";
import TrackingTableRow from "./TrackingTableRow";
import Badge from "../ui/Badge";

const TrackingTable = ({ data, onStatusChange }) => {
  const [popoverInfo, setPopoverInfo] = useState(null);
  const [modalOrder, setModalOrder] = useState(null);

  const handleMouseEnter = (type, index) => {
    setPopoverInfo({ type, index });
    // Set up global handler for track button in popover
    window.trackingPopoverTrackHandler = () => {
      const order = data[index];
      setModalOrder(order);
      setPopoverInfo(null);
    };
  };

  const handleMouseLeave = () => {
    setPopoverInfo(null);
    // Clean up global handler
    window.trackingPopoverTrackHandler = null;
  };

  const handleOrderClick = (order) => {
    setModalOrder(order);
  };

  const closeModal = () => {
    setModalOrder(null);
  };

  return (
    <div className="w-full">
      {/* Desktop/Tablet Table View */}
      <div className="hidden md:block">
        <table className="w-full divide-y divide-gray-200 shadow-sm rounded-lg bg-white border border-gray-200">
          <thead className="bg-pink-50 border-b border-pink-100">
            <tr>
              <th className="px-3 sm:px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tracking ID
              </th>
              <th className="px-3 sm:px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-3 sm:px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Buyer Details
              </th>
              <th className="px-3 sm:px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Item List
              </th>
              <th className="px-3 sm:px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Delivery
              </th>
              <th className="px-3 sm:px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Location
              </th>
              <th className="px-3 sm:px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-3 sm:px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((order, index) => (
              <TrackingTableRow
                key={`${order.id}-${index}`}
                order={order}
                index={index}
                onOrderClick={handleOrderClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                popoverInfo={popoverInfo}
                onStatusChange={onStatusChange}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile responsive cards */}
      <div className="md:hidden space-y-4">
        {data.map((order, index) => (
          <div
            key={`${order.id}-${index}`}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-black">{order.id}</h3>
                <p className="text-sm text-black">{order.dateTime}</p>
              </div>
              <Badge status={order.status.toLowerCase()}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-black">Buyer:</span>{" "}
                <span className="text-black">{order.buyer.name}</span>
                <div className="text-xs text-gray-500">
                  ID: {order.buyer.id}
                </div>
              </div>
              <div>
                <span className="font-medium text-black">Items:</span>{" "}
                <span className="text-black">{order.items.join(", ")}</span>
                <div className="text-xs text-gray-500">
                  {new Date(order.dateTime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
              <div>
                <span className="font-medium text-black">Delivery:</span>{" "}
                <span className="text-black">{order.deliveryDate}</span>
              </div>
              <div>
                <span className="font-medium text-black">Location:</span>{" "}
                <div className="text-black leading-tight">
                  {order.destination.split(",").map((part, index) => (
                    <div
                      key={index}
                      className={index === 0 ? "font-medium" : "text-gray-600"}
                    >
                      {part.trim()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleOrderClick(order)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => console.log("Download invoice for:", order.id)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Download Invoice"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => console.log("Send email for:", order.id)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {modalOrder && (
        <TrackOrderModal
          isOpen={!!modalOrder}
          onClose={closeModal}
          orderData={modalOrder}
        />
      )}
    </div>
  );
};

export default TrackingTable;
