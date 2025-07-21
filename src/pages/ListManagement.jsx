import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import AddNewListingModal from '../components/modals/AddNewListingModal';
import AddNewCategoryModal from '../components/modals/AddNewCategoryModal';
import ListingBarChart from '../components/listing/ListingBarChart';
import ListingTable from '../components/listing/ListingTable';
import { Plus } from 'lucide-react';
import listC1Icon from '../assets/icons/list-c1.svg';
import listC2Icon from '../assets/icons/list-c2.svg';
import listC3Icon from '../assets/icons/list-c3.svg';

const ListManagement = ({ onNavigate }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeItem="Listing Management" isOpen={sidebarOpen} onClose={closeSidebar} onNavigate={onNavigate} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header userName="John Doe" userRole="Vendor" currentModule="Listing Management" onMenuToggle={toggleSidebar} />

        {/* List Management Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-background">
          {/* Page Header with Title and Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">All Listings</h2>
              <p className="text-base text-gray-500 mt-1">You can manage all your items: Add, Update, Delete.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setCategoryModalOpen(true)}
                className="flex items-center justify-center space-x-2 px-5 py-2.5 text-sm border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 rounded-full font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add More Categories</span>
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center space-x-2 px-5 py-2.5 text-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 rounded-full font-medium transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Listing</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {/* Total Main Category Card */}
            <Card className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[140px]">
              <div className="flex items-center justify-between h-full">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Main category</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">6</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center">
                  <img src={listC1Icon} alt="Main Category Icon" className="w-6 h-6" />
                </div>
              </div>
            </Card>

            {/* Total Sub Category Card - Pink Gradient */}
            <Card className="p-8 bg-gradient-primary text-white rounded-2xl shadow-md min-h-[140px]">
              <div className="flex items-center justify-between h-full">
                <div>
                  <p className="text-sm font-medium text-white/90">Total Sub category</p>
                  <p className="text-3xl font-bold text-white mt-2">23</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <img src={listC2Icon} alt="Sub Category Icon" className="w-6 h-6 filter brightness-0 invert" />
                </div>
              </div>
            </Card>

            {/* Total Items Card */}
            <Card className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[140px]">
              <div className="flex items-center justify-between h-full">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">555</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                  <img src={listC3Icon} alt="Items Icon" className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </div>

          {/* Bar Chart Section */}
          <div className="mb-8">
            <ListingBarChart />
          </div>

          {/* Listings Table */}
          <div>
            <ListingTable />
          </div>
        </main>
      </div>
      
      {/* Add New Listing Modal */}
      <AddNewListingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      
      {/* Add New Category Modal */}
      <AddNewCategoryModal isOpen={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} />
    </div>
  );
};

export default ListManagement;

