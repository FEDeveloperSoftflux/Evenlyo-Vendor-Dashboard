import React, { useState } from 'react';
import { Users, Package, CheckCircle, DollarSign } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import StatCard from '../components/dashboard/StatCard';
import OrdersChart from '../components/dashboard/OrdersChart';
import RecentBookings from '../components/dashboard/RecentBookings';
import RecentlyJoined from '../components/dashboard/RecentlyJoined';
import ActivityLog from '../components/dashboard/ActivityLog';
import WelcomeSection from '../components/dashboard/WelcomeSection';

const Dashboard = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  const stats = [
    {
      title: 'All Clients',
      value: '1,247',
      change: '+12% from last month',
      iconType: 'users',
      highlighted: false
    },
    {
      title: 'Total Items',
      value: '89',
      change: '+5% from last month',
      iconType: 'package',
      highlighted: true
    },
    {
      title: 'Complete Bookings',
      value: '456',
      change: '+18% from last month',
      iconType: 'check',
      highlighted: false
    },
    {
      title: 'Monthly Revenue',
      value: '$12,450',
      change: '-3% from last month',
      iconType: 'dollar',
      highlighted: false
    }
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeItem="Dashboard" isOpen={sidebarOpen} onClose={closeSidebar} onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header userName="John Doe" userRole="Vendor" currentModule="Dashboard" onMenuToggle={toggleSidebar} />
        
        {/* Welcome Section - Only for Dashboard */}
        <WelcomeSection userName="John Doe" userRole="Vendor" />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-8">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  iconType={stat.iconType}
                  highlighted={stat.highlighted}
                />
              ))}
            </div>

            {/* Charts and Lists */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              <div className="w-full">
                <OrdersChart />
              </div>
              <div className="w-full">
                <RecentBookings />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
              <div className="w-full">
                <RecentlyJoined />
              </div>
              <div className="w-full">
                <ActivityLog />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
