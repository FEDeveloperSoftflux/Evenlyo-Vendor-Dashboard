import React from 'react';
import { Download, Eye, Mail } from 'lucide-react';
import TrackingPopover from './TrackingPopover';
import Badge from '../ui/Badge';

const TrackingTableRow = ({ order, index, onOrderClick, onMouseEnter, onMouseLeave, popoverInfo }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-2 sm:px-4 py-3 text-sm text-gray-900 w-[12%]">
        <button
          onClick={() => onOrderClick(order)}
          className="text-indigo-600 hover:text-indigo-900 font-medium truncate block max-w-full"
        >
          {order.id}
        </button>
      </td>
      <td className="px-2 sm:px-4 py-3 text-sm text-gray-500 w-[15%]">
        <div className="truncate">{order.dateTime}</div>
      </td>
      <td
        className="px-2 sm:px-4 py-3 text-sm text-gray-500 relative w-[18%]"
        onMouseEnter={() => onMouseEnter('buyer', index)}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex items-center min-w-0">
          <img
            src={order.buyer.avatar}
            alt={order.buyer.name}
            className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-gray-900 truncate">{order.buyer.name}</div>
            <div className="text-xs text-gray-500 truncate">ID: {order.buyer.id}</div>
          </div>
        </div>
        {popoverInfo &&
          popoverInfo.type === 'buyer' &&
          popoverInfo.index === index && (
            <TrackingPopover 
              person={order.buyer} 
              type="Buyer" 
              isVisible 
              onTrackClick={() => onOrderClick(order)}
            />
          )}
      </td>
      <td className="px-2 sm:px-4 py-3 text-sm text-gray-500 w-[15%]">
        <div className="truncate" title={order.items.join(', ')}>{order.items.join(', ')}</div>
      </td>
      <td className="px-2 sm:px-4 py-3 text-sm text-gray-500 w-[12%]">
        <div className="truncate">{order.deliveryDate}</div>
      </td>
      <td className="px-2 sm:px-4 py-3 text-sm text-gray-500 w-[15%]">
        <div className="truncate" title={order.destination}>{order.destination}</div>
      </td>
      <td className="px-2 sm:px-4 py-3 text-sm text-gray-500 w-[8%]">
        <Badge status={order.status.toLowerCase()} />
      </td>
      <td className="px-2 sm:px-4 py-3 text-sm font-medium w-[5%]">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => {
              // Handle download functionality
              console.log('Download invoice for:', order.id);
            }}
            className="text-gray-600 hover:text-gray-900 transition-colors p-1"
            title="Download Invoice"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOrderClick(order)}
            className="text-gray-600 hover:text-gray-900 transition-colors p-1"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              // Handle send email functionality
              console.log('Send email for order:', order.id);
            }}
            className="text-gray-600 hover:text-gray-900 transition-colors p-1"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TrackingTableRow;

