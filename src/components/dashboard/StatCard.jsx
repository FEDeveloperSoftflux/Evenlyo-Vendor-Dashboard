import React from 'react';
import { Users, Package, CheckCircle, DollarSign } from 'lucide-react';
import Card from '../ui/Card';

const StatCard = ({ title, value, change, icon: Icon, highlighted = false }) => {
  const getIcon = (iconName) => {
    const icons = {
      users: Users,
      package: Package,
      check: CheckCircle,
      dollar: DollarSign,
    };
    return icons[iconName] || Users;
  };

  const IconComponent = Icon || getIcon('users');

  return (
    <Card gradient={highlighted} className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${highlighted ? 'text-white/80' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${highlighted ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
          <p className={`text-sm mt-1 ${highlighted ? 'text-white/80' : 'text-gray-500'}`}>
            {change}
          </p>
        </div>
        <div className={`p-3 rounded-2xl ${highlighted ? 'bg-white/20' : 'bg-pink-50'}`}>
          <IconComponent className={`w-6 h-6 ${highlighted ? 'text-white' : 'text-pink-500'}`} />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
