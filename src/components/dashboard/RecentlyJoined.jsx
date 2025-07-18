import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const RecentlyJoined = () => {
  const clients = [
    {
      id: 1,
      name: 'Alex Turner',
      initials: 'AT',
      joinDate: '11 Jan 2025'
    },
    {
      id: 2,
      name: 'Lisa Wang',
      initials: 'LW',
      joinDate: '11 Jan 2025'
    },
    {
      id: 3,
      name: 'Tom Rodriguez',
      initials: 'TR',
      joinDate: '11 Jan 2025'
    },
    {
      id: 4,
      name: 'Tom Rodriguez',
      initials: 'TR',
      joinDate: '11 Jan 2025'
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recently Joined Clients</h3>
        <button className="text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {clients.map((client) => (
          <div key={client.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">{client.initials}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{client.name}</h4>
                <div className="flex items-center space-x-1 mt-1">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{client.joinDate}</span>
                </div>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              More Details
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentlyJoined;
