import React, { useState, useEffect, useRef } from "react";
import { Download, Eye, Mail, ChevronDown } from "lucide-react";
import TrackingPopover from "./TrackingPopover";
import Badge from "../ui/Badge";

const TrackingTableRow = ({
  order,
  index,
  onOrderClick,
  onMouseEnter,
  onMouseLeave,
  popoverInfo,
  onStatusChange,
}) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const statusOptions = [
    "delivered",
    "on the way",
    "received back",
    "complete",
    "rejected",
    "claim",
  ];

  const statusColors = {
    delivered: "#4ade80", // green-400
    "on the way": "#60a5fa", // blue-400
    "received back": "#fbbf24", // yellow-400
    complete: "#818cf8", // indigo-400
    rejected: "#f87171", // red-400
    claim: "#f472b6", // pink-400
  };

  const statusIconColors = {
    delivered: "#16a34a", // green-600
    "on the way": "#2563eb", // blue-600
    "received back": "#b45309", // yellow-600
    complete: "#3730a3", // indigo-800
    rejected: "#b91c1c", // red-700
    claim: "#be185d", // pink-700
  };

  const handleStatusChange = (newStatus) => {
    if (onStatusChange) {
      onStatusChange(order.id, newStatus);
    }
    setShowStatusDropdown(false);
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false);
      }
    };

    if (showStatusDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStatusDropdown]);
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-2 sm:px-4 py-3 text-sm text-black w-[12%]">
        <button
          onClick={() => onOrderClick(order)}
          className="text-indigo-600 hover:text-indigo-900 font-medium truncate block max-w-full"
        >
          {order.id}
        </button>
      </td>
      <td className="px-2 sm:px-4 py-3 text-sm text-black w-[15%]">
        <div className="truncate">{order.dateTime}</div>
      </td>
      <td
        className="px-2 sm:px-4 py-3 text-sm relative w-[18%]"
        onMouseEnter={() => onMouseEnter("buyer", index)}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex items-center min-w-0">
          <img
            src={order.buyer.avatar}
            alt={order.buyer.name}
            className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-black truncate">
              {order.buyer.name}
            </div>
            <div className="text-xs text-gray-500 truncate">
              ID: {order.buyer.id}
            </div>
          </div>
        </div>
        {popoverInfo &&
          popoverInfo.type === "buyer" &&
          popoverInfo.index === index && (
            <TrackingPopover
              person={order.buyer}
              type="Buyer"
              isVisible
              onTrackClick={() => onOrderClick(order)}
            />
          )}
      </td>
      <td className="px-2 sm:px-4 py-3 text-sm w-[15%]">
        <div className="text-black truncate" title={order.items.join(", ")}>
          {order.items.join(", ")}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {formatTime(order.dateTime)}
        </div>
      </td>
      <td className="px-2 sm:px-4 py-3 text-sm text-black w-[12%]">
        <div className="truncate">{order.deliveryDate}</div>
      </td>
      <td className="px-2 sm:px-4 py-3 text-sm w-[13%]">
        <div
          className="text-black truncate leading-tight"
          title={order.destination}
        >
          {order.destination.split(",").map((part, index) => (
            <div
              key={index}
              className={index === 0 ? "font-medium" : "text-gray-600"}
            >
              {part.trim()}
            </div>
          ))}
        </div>
      </td>
      <td className="px-2 sm:px-4 py-3 text-sm w-[10%] relative">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="flex items-center justify-between w-full min-w-[120px] text-left"
          >
            <Badge status={order.status.toLowerCase()}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              <ChevronDown
                className="w-3 h-3 ml-1"
                color={
                  statusIconColors[order.status.toLowerCase()] || "#374151" // fallback gray-700
                }
              />
            </Badge>
          </button>

          {showStatusDropdown && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg text-gray-700"
                >
                  {status.charAt(0).toUpperCase() +
                    status.slice(1).replace(/\s+/g, " ")}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
      <td className="px-2 sm:px-4 py-3 text-sm font-medium w-[7%]">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => {
              // Handle download functionality
              console.log("Download invoice for:", order.id);
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
              console.log("Send email for order:", order.id);
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
