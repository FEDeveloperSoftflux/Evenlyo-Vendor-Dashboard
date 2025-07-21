import React from 'react';
import Card from '../ui/Card';
import dashC1 from '../../assets/icons/dash-c1.svg';
import dashC2 from '../../assets/icons/dash-c2.svg';
import dashC3 from '../../assets/icons/dash-c3.svg';
import dashC4 from '../../assets/icons/dash-c4.svg';

const StatCard = ({ title, value, change, iconType, valueColor, dotColor, highlighted = false, showIcon = true }) => {

  // Icon mapping
  const iconMap = {
    users: dashC1,
    package: dashC2,
    check: dashC3,
    dollar: dashC4
  };

  return (
    <Card gradient={highlighted} className="p-4 md:p-6 relative overflow-hidden">
      <div className="relative z-10">
        {/* Show icon for dashboard stats only */}
        {showIcon && iconType && (
          <div className="absolute right-3 top-3 w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center">
            <img src={iconMap[iconType]} alt={iconType} className="w-8 h-8 opacity-90" />
          </div>
        )}
        
        {/* Show colored dot for booking stats */}
        {!showIcon && dotColor && (
          <div className="absolute right-4 top-4">
            <div className={`w-3 h-3 ${dotColor} rounded-full`}></div>
          </div>
        )}
        
        <p className={`text-sm font-medium mb-3 ${highlighted ? 'text-white/90' : 'text-gray-700'}`}>
          {title}
        </p>
        <p className={`text-3xl md:text-4xl font-bold mb-2 ${
          valueColor || (highlighted ? 'text-white' : 'text-gray-900')
        }`}>
          {value}
        </p>
        <p className={`text-xs md:text-sm ${highlighted ? 'text-white/80' : 'text-gray-500'}`}>
          {change}
        </p>
      </div>
    </Card>
  );
};

export default StatCard;
