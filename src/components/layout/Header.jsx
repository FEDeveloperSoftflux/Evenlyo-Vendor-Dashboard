import React, { useState } from 'react';
import { Settings, LogOut, ChevronDown, Menu } from 'lucide-react';
import notificationIcon from '../../assets/icons/notification.svg';
import userPhoto from '../../assets/images/jaydeep.png';

const Header = ({ userName = 'John Doe', userRole = 'Vendor', onMenuToggle }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <>
      <header className="bg-background">
        {/* Subtle border that doesn't touch sidebar on desktop, full width on mobile */}
        <div className="absolute left-0 lg:left-64 right-0 h-px bg-gray-200 top-[72px] z-10"></div>
        {/* Top Header */}
        <div className="px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Mobile menu + Dashboard title */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button 
                onClick={onMenuToggle}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>

            {/* Right side - Notifications and User dropdown */}
            <div className="flex items-center space-x-4">
              {/* Notification bell */}
              <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
                <img src={notificationIcon} alt="Notifications" className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <img 
                    src={userPhoto} 
                    alt="John Doe" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-900">John Doe</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">john@evenlyo.com</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Setting</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome section */}
      <div className="bg-background px-4 lg:px-8 pb-4 lg:pb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome, {userName}</h2>
        <p className="text-gray-400 mt-1 text-sm lg:text-base">
          Role: {userRole} • Here's an overview of your business performance
        </p>
      </div>
    </>
  );
};

export default Header;
