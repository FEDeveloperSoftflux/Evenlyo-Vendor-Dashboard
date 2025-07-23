import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ListManagement from './pages/ListManagement';
import BookingAnalytics from './pages/BookingAnalytics';
import Tracking from './pages/Tracking';
import RoleManagement from './pages/RoleManagement';
import StockManagement from './pages/StockManagement';
import AnalyticsReport from './pages/AnalyticsReport';
import { SidebarProvider } from './contexts/SidebarContext';

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
      case 'Stock Management':
        return <StockManagement onNavigate={handleNavigation} />;
      case 'Analytics & Report':
        return <AnalyticsReport onNavigate={handleNavigation} />;
      default:
        return <Dashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <SidebarProvider>
      {renderPage()}
    </SidebarProvider>
  );
}

export default App;
