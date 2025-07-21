import React from 'react';
import { Download, Eye, Mail } from 'lucide-react';
import TrackingPopover from './TrackingPopover';
import Badge from '../ui/Badge';

const TrackingTableRow = ({ order, index, onOrderClick, onMouseEnter, onMouseLeave, popoverInfo }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <button
          onClick={() => onOrderClick(order)}
          className="text-indigo-600 hover:text-indigo-900 font-medium"
        >
          {order.id}
        </button>
      </td>
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.dateTime}
      </td>
      <td
        className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative"
        onMouseEnter={() => onMouseEnter('buyer', index)}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex items-center">
          <img
            src={order.buyer.avatar}
            alt={order.buyer.name}
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
          <div>
            <div className="text-sm font-medium text-gray-900">{order.buyer.name}</div>
            <div className="text-xs text-gray-500">ID: {order.buyer.id}</div>
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
      <td
        className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative"
        onMouseEnter={() => onMouseEnter('seller', index)}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex items-center">
          <img
            src={order.seller.avatar}
            alt={order.seller.name}
            className="w-8 h-8 rounded-full object-cover mr-2"
          />
          <div>
            <div className="text-sm font-medium text-gray-900">{order.seller.name}</div>
            <div className="text-xs text-gray-500">{order.seller.location}</div>
          </div>
        </div>
        {popoverInfo &&
          popoverInfo.type === 'seller' &&
          popoverInfo.index === index && (
            <TrackingPopover 
              person={order.seller} 
              type="Seller" 
              isVisible 
              onTrackClick={() => onOrderClick(order)}
            />
          )}
      </td>
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <span className="truncate max-w-[150px] block">{order.items.join(', ')}</span>
      </td>
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.deliveryDate}
      </td>
      <td className="px-4 lg:px-6 py-4 text-sm text-gray-500">
        <span className="truncate max-w-[200px] block">{order.destination}</span>
      </td>
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <Badge status={order.status.toLowerCase()} />
      </td>
      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              // Handle download functionality
              console.log('Download invoice for:', order.id);
            }}
            className="text-gray-600 hover:text-gray-900 transition-colors"
            title="Download Invoice"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOrderClick(order)}
            className="text-gray-600 hover:text-gray-900 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              // Handle send email functionality
              console.log('Send email for order:', order.id);
            }}
            className="text-gray-600 hover:text-gray-900 transition-colors"
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

