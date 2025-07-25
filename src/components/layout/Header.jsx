import React, { useState } from "react";
import { Settings, LogOut, ChevronDown, Menu } from "lucide-react";
import notificationIcon from "../../assets/icons/notification.svg";
import userPhoto from "../../assets/images/jaydeep.png";
import { useSidebar } from "../../contexts/SidebarContext";

const Header = ({
  userName = "John Doe",
  userRole = "Vendor",
  currentModule = "Dashboard",
}) => {
  const { isCollapsed, toggleMobile } = useSidebar();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <>
      <header className="bg-background">
        {/* Subtle border that doesn't touch sidebar on desktop, shortened on mobile and desktop */}
        <div
          className={`absolute left-0 ${
            isCollapsed ? "lg:left-20" : "lg:left-64"
          } right-4 lg:right-8 h-px bg-gray-200 top-[74px] z-10 transition-all duration-300`}
        ></div>
        {/* Top Header */}
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Mobile menu + Dashboard title */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={toggleMobile}
                className="lg:hidden p-1.5 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Menu className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                {currentModule}
              </h1>
            </div>

            {/* Right side - Notifications and User dropdown */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Notification bell */}
              <button className="relative p-1.5 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
                <img
                  src={notificationIcon}
                  alt="Notifications"
                  className="w-3.5 sm:w-4 h-3.5 sm:h-4"
                />
                <span className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <img
                    src={userPhoto}
                    alt="John Doe"
                    className="w-6 sm:w-8 h-6 sm:h-8 rounded-full object-cover"
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-900 hidden xs:block">
                    John Doe
                  </span>
                  <ChevronDown className="w-3 sm:w-4 h-3 sm:h-4" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        John Doe
                      </p>
                      <p className="text-xs text-gray-500">john@evenlyo.com</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Settings className="w-4 h-4 text-primary-mid" />
                      <span>Setting</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <LogOut className="w-4 h-4 text-primary-mid" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
