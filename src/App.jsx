import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ListManagement from './pages/ListManagement';
import BookingAnalytics from './pages/BookingAnalytics';
import Tracking from './pages/Tracking';
import RoleManagement from './pages/RoleManagement';

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const handleNavigation = (pageName) => {
    setCurrentPage(pageName);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard onNavigate={handleNavigation} />;
      case 'Listing Management':
        return <ListManagement onNavigate={handleNavigation} />;
      case 'Booking Analytics':
        return <BookingAnalytics onNavigate={handleNavigation} />;
      case 'Tracking':
        return <Tracking onNavigate={handleNavigation} />;
      case 'Role Management':
        return <RoleManagement onNavigate={handleNavigation} />;
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return renderPage();
}

export default App;
