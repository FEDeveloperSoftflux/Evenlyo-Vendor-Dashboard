import React, { useState } from 'react';
import { Search, Filter, Download, ChevronDown } from 'lucide-react';
import TrackingTable from '../components/tracking/TrackingTable';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import userPhoto from '../assets/images/jaydeep.png';

const Tracking = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subCategoryFilter, setSubCategoryFilter] = useState('');
  const [vendorFilter, setVendorFilter] = useState('');

  // Comprehensive sample data for tracking
  const trackingData = [
    {
      id: 'TRK001',
      dateTime: '2024-06-27 10:00',
      buyer: {
        avatar: userPhoto,
        name: 'John Smith',
        id: 'USR001',
        email: 'john@example.com',
        phone: '1234567890',
        location: '456 Business Ave, Commerce City'
      },
      seller: {
        avatar: userPhoto,
        name: 'Tech Store',
        location: 'New York, NY',
        email: 'tech@example.com',
        phone: '1234567890'
      },
      items: ['2024-06-27'],
      deliveryDate: '2024-06-27',
      destination: '456 Business Ave, Commerce City',
      status: 'delivered',
    },
    {
      id: 'TRK002',
      dateTime: '2024-06-27 10:00',
      buyer: {
        avatar: userPhoto,
        name: 'John Smith',
        id: 'USR001',
        email: 'john@example.com',
        phone: '1234567890',
        location: '456 Business Ave, Commerce City'
      },
      seller: {
        avatar: userPhoto,
        name: 'Tech Store',
        location: 'New York, NY',
        email: 'tech@example.com',
        phone: '1234567890'
      },
      items: ['2024-06-27'],
      deliveryDate: '2024-06-27',
      destination: '456 Business Ave, Commerce City',
      status: 'on the way',
    },
    {
      id: 'TRK003',
      dateTime: '2024-06-27 10:00',
      buyer: {
        avatar: userPhoto,
        name: 'John Smith',
        id: 'USR001',
        email: 'john@example.com',
        phone: '1234567890',
        location: '456 Business Ave, Commerce City'
      },
      seller: {
        avatar: userPhoto,
        name: 'Tech Store',
        location: 'New York, NY',
        email: 'tech@example.com',
        phone: '1234567890'
      },
      items: ['2024-06-27'],
      deliveryDate: '2024-06-27',
      destination: '456 Business Ave, Commerce City',
      status: 'received back',
    },
    {
      id: 'TRK004',
      dateTime: '2024-06-27 10:00',
      buyer: {
        avatar: userPhoto,
        name: 'John Smith',
        id: 'USR001',
        email: 'john@example.com',
        phone: '1234567890',
        location: '456 Business Ave, Commerce City'
      },
      seller: {
        avatar: userPhoto,
        name: 'Tech Store',
        location: 'New York, NY',
        email: 'tech@example.com',
        phone: '1234567890'
      },
      items: ['2024-06-27'],
      deliveryDate: '2024-06-27',
      destination: '456 Business Ave, Commerce City',
      status: 'complete',
    },
    {
      id: 'TRK005',
      dateTime: '2024-06-27 10:00',
      buyer: {
        avatar: userPhoto,
        name: 'John Smith',
        id: 'USR001',
        email: 'john@example.com',
        phone: '1234567890',
        location: '456 Business Ave, Commerce City'
      },
      seller: {
        avatar: userPhoto,
        name: 'Tech Store',
        location: 'New York, NY',
        email: 'tech@example.com',
        phone: '1234567890'
      },
      items: ['2024-06-27'],
      deliveryDate: '2024-06-27',
      destination: '456 Business Ave, Commerce City',
      status: 'rejected',
    },
    {
      id: 'TRK006',
      dateTime: '2024-06-27 10:00',
      buyer: {
        avatar: userPhoto,
        name: 'John Smith',
        id: 'USR001',
        email: 'john@example.com',
        phone: '1234567890',
        location: '456 Business Ave, Commerce City'
      },
      seller: {
        avatar: userPhoto,
        name: 'Tech Store',
        location: 'New York, NY',
        email: 'tech@example.com',
        phone: '1234567890'
      },
      items: ['2024-06-27'],
      deliveryDate: '2024-06-27',
      destination: '456 Business Ave, Commerce City',
      status: 'claim',
    },
    {
      id: 'TRK007',
      dateTime: '2024-06-27 10:00',
      buyer: {
        avatar: userPhoto,
        name: 'John Smith',
        id: 'USR001',
        email: 'john@example.com',
        phone: '1234567890',
        location: '456 Business Ave, Commerce City'
      },
      seller: {
        avatar: userPhoto,
        name: 'Tech Store',
        location: 'New York, NY',
        email: 'tech@example.com',
        phone: '1234567890'
      },
      items: ['2024-06-27'],
      deliveryDate: '2024-06-27',
      destination: '456 Business Ave, Commerce City',
      status: 'delivered',
    },
    {
      id: 'TRK008',
      dateTime: '2024-06-27 10:00',
      buyer: {
        avatar: userPhoto,
        name: 'John Smith',
        id: 'USR001',
        email: 'john@example.com',
        phone: '1234567890',
        location: '456 Business Ave, Commerce City'
      },
      seller: {
        avatar: userPhoto,
        name: 'Tech Store',
        location: 'New York, NY',
        email: 'tech@example.com',
        phone: '1234567890'
      },
      items: ['2024-06-27'],
      deliveryDate: '2024-06-27',
      destination: '456 Business Ave, Commerce City',
      status: 'on the way',
    },
    {
      id: 'TRK009',
      dateTime: '2024-06-27 10:00',
      buyer: {
        avatar: userPhoto,
        name: 'John Smith',
        id: 'USR001',
        email: 'john@example.com',
        phone: '1234567890',
        location: '456 Business Ave, Commerce City'
      },
      seller: {
        avatar: userPhoto,
        name: 'Tech Store',
        location: 'New York, NY',
        email: 'tech@example.com',
        phone: '1234567890'
      },
      items: ['2024-06-27'],
      deliveryDate: '2024-06-27',
      destination: '456 Business Ave, Commerce City',
      status: 'received back',
    },
    {
      id: 'TRK010',
      dateTime: '2024-06-27 10:00',
      buyer: {
        avatar: userPhoto,
        name: 'John Smith',
        id: 'USR001',
        email: 'john@example.com',
        phone: '1234567890',
        location: '456 Business Ave, Commerce City'
      },
      seller: {
        avatar: userPhoto,
        name: 'Tech Store',
        location: 'New York, NY',
        email: 'tech@example.com',
        phone: '1234567890'
      },
      items: ['2024-06-27'],
      deliveryDate: '2024-06-27',
      destination: '456 Business Ave, Commerce City',
      status: 'complete',
    },
    {
      id: 'TRK011',
      dateTime: '2024-06-27 10:00',
      buyer: {
        avatar: userPhoto,
        name: 'John Smith',
        id: 'USR001',
        email: 'john@example.com',
        phone: '1234567890',
        location: '456 Business Ave, Commerce City'
      },
      seller: {
        avatar: userPhoto,
        name: 'Tech Store',
        location: 'New York, NY',
        email: 'tech@example.com',
        phone: '1234567890'
      },
      items: ['2024-06-27'],
      deliveryDate: '2024-06-27',
      destination: '456 Business Ave, Commerce City',
      status: 'rejected',
    },
    {
      id: 'TRK012',
      dateTime: '2024-06-27 10:00',
      buyer: {
        avatar: userPhoto,
        name: 'John Smith',
        id: 'USR001',
        email: 'john@example.com',
        phone: '1234567890',
        location: '456 Business Ave, Commerce City'
      },
      seller: {
        avatar: userPhoto,
        name: 'Tech Store',
        location: 'New York, NY',
        email: 'tech@example.com',
        phone: '1234567890'
      },
      items: ['2024-06-27'],
      deliveryDate: '2024-06-27',
      destination: '456 Business Ave, Commerce City',
      status: 'claim',
    },
  ];

  const filteredData = trackingData.filter(item => {
    return (
      (searchTerm === '' || item.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === '' || item.status === statusFilter)
    );
  });

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        activeItem="Tracking" 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={onNavigate}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          userName="John Doe"
          userRole="Vendor"
          currentModule="Tracking" 
          onMenuToggle={() => setIsSidebarOpen(true)}
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">All Order Tracking</h1>
                <p className="text-gray-600 text-sm lg:text-base">You can track, see status and download the invoice</p>
              </div>

              {/* Filters */}
              <Card className="p-4 sm:p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search Input */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Item Name / ID"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:border-transparent transition-colors text-sm"
                    />
                  </div>
                  
                  {/* Filter Dropdowns */}
                  <div className="flex flex-wrap gap-3 lg:gap-4">
                    <select 
                      className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:outline-none bg-white text-sm hover:border-gray-400 transition-colors min-w-[120px]"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="">Main Category</option>
                      <option value="electronics">Electronics</option>
                      <option value="services">Services</option>
                    </select>
                    
                    <select 
                      className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:outline-none bg-white text-sm hover:border-gray-400 transition-colors min-w-[120px]"
                      value={subCategoryFilter}
                      onChange={(e) => setSubCategoryFilter(e.target.value)}
                    >
                      <option value="">Sub Category</option>
                      <option value="phones">Phones</option>
                      <option value="laptops">Laptops</option>
                    </select>
                    
                    <select 
                      className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:outline-none bg-white text-sm hover:border-gray-400 transition-colors min-w-[120px]"
                      value={vendorFilter}
                      onChange={(e) => setVendorFilter(e.target.value)}
                    >
                      <option value="">All Vendors</option>
                      <option value="tech-store">Tech Store</option>
                      <option value="electronics-hub">Electronics Hub</option>
                    </select>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <input
                        type="date"
                        className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-mid focus:outline-none bg-white text-sm hover:border-gray-400 transition-colors"
                      />
                      <span className="text-sm text-gray-500 whitespace-nowrap">Filter by date</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tracking Table */}
              <Card className="overflow-hidden">
                <TrackingTable data={filteredData} />
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tracking;
