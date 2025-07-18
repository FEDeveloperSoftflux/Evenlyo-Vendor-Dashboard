import React from 'react';
import { 
  Home, 
  List, 
  BarChart3, 
  MapPin, 
  Users, 
  Package, 
  FileText, 
  CreditCard,
  Inbox,
  Bell,
  User,
  Settings,
  X
} from 'lucide-react';
import brandLogo from '../../assets/icons/brand.svg';

const Sidebar = ({ activeItem = 'Dashboard', isOpen = false, onClose }) => {
  const navigation = [
    { name: 'Dashboard', icon: Home, active: activeItem === 'Dashboard' },
    { name: 'Listing Management', icon: List, active: false },
    { name: 'Booking Analytics', icon: BarChart3, active: false },
    { name: 'Tracking', icon: MapPin, active: false },
    { name: 'Role Management', icon: Users, active: false },
    { name: 'Stock Management', icon: Package, active: false },
    { name: 'Analytics & Report', icon: FileText, active: false },
    { name: 'Billing', icon: CreditCard, active: false },
    { name: 'Inbox / Chat', icon: Inbox, active: false },
    { name: 'Notifications', icon: Bell, active: false },
  ];

  const bottomNavigation = [
    { name: 'Profile Management', icon: User, active: false },
    { name: 'Setting', icon: Settings, active: false },
  ];

  const NavItem = ({ item }) => (
    <div className={`flex items-center space-x-3 px-4 py-3 rounded-2xl mx-4 mb-1 transition-all duration-200 cursor-pointer ${
      item.active 
        ? 'bg-gradient-primary text-white shadow-lg' 
        : 'text-gray-600 hover:bg-gray-50'
    }`}>
      <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-gray-500'}`} />
      <span className="text-sm font-medium">{item.name}</span>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white h-screen sidebar-shadow flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:flex`}>
        {/* Logo */}
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={brandLogo} alt="Evenlyo" className="h-7" style={{filter: 'hue-rotate(320deg) saturate(1.5) brightness(1.1)'}} />
            </div>
            {/* Close button for mobile */}
            <button 
              onClick={onClose}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-100 pt-4 pb-6">
          <div className="space-y-1">
            {bottomNavigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
