import React, { useState } from "react";
import { ChevronDown, Calendar, Filter, Eye } from "lucide-react";
import StatCards from "../components/dashboard/StatCards";
import BookingCalendar from "../components/booking/NewBookingCalendar";
import BookingDetailDrawer from "../components/booking/BookingDetailDrawer";
import RejectModal from "../components/modals/RejectModal";
import AcceptedModal from "../components/modals/AcceptedModal";
import EventPopover from "../components/booking/EventPopover";
import Card from "../components/ui/Card";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const BookingAnalytics = ({ onNavigate }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [deliveryFilter, setDeliveryFilter] = useState("All Delivery Status");
  const [viewBy, setViewBy] = useState("Week");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAcceptedModalOpen, setIsAcceptedModalOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const statsData = [
    {
      title: "Total Bookings",
      value: "4",
      change: "+12% from last month",
      valueColor: "text-blue-500",
      dotColor: "bg-blue-500",
      highlighted: false,
      showIcon: false,
    },
    {
      title: "Complete Bookings",
      value: "1",
      change: "+5% from last month",
      valueColor: "text-white",
      dotColor: "bg-white",
      highlighted: true,
      showIcon: false,
    },
    {
      title: "Request Bookings",
      value: "1",
      change: "+18% from last month",
      valueColor: "text-green-500",
      dotColor: "bg-green-500",
      highlighted: false,
      showIcon: false,
    },
    {
      title: "In Process",
      value: "1",
      change: "-3% from last month",
      valueColor: "text-yellow-500",
      dotColor: "bg-yellow-500",
      highlighted: false,
      showIcon: false,
    },
  ];

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedBooking(null);
  };

  const handleRejectBooking = () => {
    setIsRejectModalOpen(true);
    setIsDrawerOpen(false);
  };

  const handleAcceptBooking = () => {
    setIsAcceptedModalOpen(true);
    setIsDrawerOpen(false);
  };

  const handleRejectConfirm = (reason) => {
    console.log("Booking rejected with reason:", reason);
    // Handle rejection logic here
    setIsRejectModalOpen(false);
    setSelectedBooking(null);
  };

  const handleAcceptedClose = () => {
    setIsAcceptedModalOpen(false);
    setSelectedBooking(null);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        activeItem="Booking Analytics"
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          userName="John Doe"
          userRole="Vendor"
          currentModule="Booking Analytics"
          onMenuToggle={toggleSidebar}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-background">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <StatCards stats={statsData} />

            {/* Filters and Calendar */}
            <Card className="p-4 md:p-6">
              {/* Filter Section */}
              <div className="space-y-4 mb-6">
                {/* Filter Header */}
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">
                    Filters
                  </span>
                </div>

                {/* First Row: Date, Status, Delivery Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {/* Date Filter */}
                  <div className="relative">
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>Filter by date</span>
                      <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-4 py-3 pl-10 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <option>All Status</option>
                      <option>New Order</option>
                      <option>Complete</option>
                      <option>In Progress</option>
                      <option>Reject</option>
                    </select>
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>

                  {/* Delivery Status Filter */}
                  <div className="relative">
                    <select
                      value={deliveryFilter}
                      onChange={(e) => setDeliveryFilter(e.target.value)}
                      className="w-full px-4 py-3 pl-10 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <option>All Delivery Status</option>
                      <option>Delivered</option>
                      <option>In Transit</option>
                      <option>Pending</option>
                    </select>
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Second Row: View By */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="relative">
                    <select
                      value={viewBy}
                      onChange={(e) => setViewBy(e.target.value)}
                      className="w-full px-4 py-3 pl-10 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <option value="Day">View by Day</option>
                      <option value="Week">View by Week</option>
                      <option value="Month">View by Month</option>
                    </select>
                    <Eye className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Calendar */}
              <BookingCalendar viewBy={viewBy} />
            </Card>
          </div>
        </main>
      </div>

      {/* Booking Detail Drawer */}
      <BookingDetailDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        booking={selectedBooking}
        onReject={handleRejectBooking}
        onAccept={handleAcceptBooking}
      />

      {/* Reject Modal */}
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onConfirm={handleRejectConfirm}
        booking={selectedBooking}
      />

      {/* Accepted Modal */}
      <AcceptedModal
        isOpen={isAcceptedModalOpen}
        onClose={handleAcceptedClose}
        booking={selectedBooking}
      />
    </div>
  );
};

export default BookingAnalytics;
