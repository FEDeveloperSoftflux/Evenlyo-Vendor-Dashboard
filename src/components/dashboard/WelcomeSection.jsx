import React from 'react';

const WelcomeSection = ({ userName = 'John Doe', userRole = 'Vendor' }) => {
  return (
    <div className="bg-background px-4 lg:px-8 pb-4 lg:pb-6">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome, {userName}</h2>
      <p className="text-gray-400 mt-1 text-sm lg:text-base">
        Role: {userRole} • Here's an overview of your business performance
      </p>
    </div>
  );
};

export default WelcomeSection;
