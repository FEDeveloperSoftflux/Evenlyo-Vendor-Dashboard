import React, { useState } from "react";
import { Download, Eye, Mail } from 'lucide-react';
import TrackOrderModal from "./TrackOrderModal";
import TrackingTableRow from "./TrackingTableRow";
import Badge from '../ui/Badge';

const TrackingTable = ({ data }) => {
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
    <div className="w-full overflow-x-auto">
      <div className="min-w-full">
        <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg bg-white border border-gray-200">
          <thead className="bg-pink-50 border-b border-pink-100">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider whitespace-nowrap">
                Tracking ID
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider whitespace-nowrap">
                Date & Time
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider whitespace-nowrap">
                Buyer Details
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider whitespace-nowrap">
                Seller Details
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider whitespace-nowrap">
                Item List
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider whitespace-nowrap">
                Delivery Date
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider whitespace-nowrap">
                Destination Location
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider whitespace-nowrap">
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
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile responsive cards */}
      <div className="lg:hidden space-y-4">
        {data.map((order, index) => (
          <div key={`${order.id}-${index}`} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{order.id}</h3>
                <p className="text-sm text-gray-500">{order.dateTime}</p>
              </div>
              <Badge status={order.status.toLowerCase()} />
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Buyer:</span> {order.buyer.name}
              </div>
              <div>
                <span className="font-medium text-gray-700">Seller:</span> {order.seller.name}
              </div>
              <div>
                <span className="font-medium text-gray-700">Items:</span> {order.items.join(', ')}
              </div>
              <div>
                <span className="font-medium text-gray-700">Delivery:</span> {order.deliveryDate}
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
                onClick={() => console.log('Download invoice for:', order.id)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Download Invoice"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => console.log('Send email for:', order.id)}
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
