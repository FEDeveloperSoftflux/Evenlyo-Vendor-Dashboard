import React, { useState, useEffect, useRef } from "react";
import { Download, Eye, Mail, ChevronDown } from "lucide-react";
import TrackingPopover from "./TrackingPopover";
import Badge from "../ui/Badge";
import StatusChangeConfirmationModal from "../modals/StatusChangeConfirmationModal";

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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState(null);
  const dropdownRef = useRef(null);

  const statusOptions = [
    "delivered",
    "on the way",
    "received back",
    "complete",
    "rejected",
    "claim",
  ];

  const statusIconColors = {
    delivered: "#FFB310",
    "on the way": "#FF0092",
    "received back": "#A05807",
    complete: "#04C373",
    rejected: "#FF0000",
    claim: "#E31B95",
  };

  const handleStatusChange = (newStatus) => {
    if (newStatus === order.status) {
      setShowStatusDropdown(false);
      return;
    }

    setPendingStatusChange(newStatus);
    setShowConfirmationModal(true);
    setShowStatusDropdown(false);
  };

  const handleConfirmStatusChange = () => {
    if (onStatusChange && pendingStatusChange) {
      onStatusChange(order.id, pendingStatusChange);
    }
    setPendingStatusChange(null);
  };

  const handleCancelStatusChange = () => {
    setPendingStatusChange(null);
    setShowConfirmationModal(false);
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
    <>
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
              <Badge
                status={order.status.toLowerCase()}
                color={
                  statusIconColors[order.status.toLowerCase()] || "#374151"
                }
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                <ChevronDown
                  className="w-3 h-3 ml-1"
                  color={
                    statusIconColors[order.status.toLowerCase()] || "#374151"
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

      {/* Status Change Confirmation Modal */}
      {showConfirmationModal && (
        <StatusChangeConfirmationModal
          isOpen={showConfirmationModal}
          onClose={handleCancelStatusChange}
          onConfirm={handleConfirmStatusChange}
          currentStatus={order.status}
          newStatus={pendingStatusChange}
          orderInfo={order}
        />
      )}
    </>
  );
};

export default TrackingTableRow;
