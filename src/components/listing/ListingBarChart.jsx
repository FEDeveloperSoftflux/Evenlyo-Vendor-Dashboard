import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Card from '../ui/Card';

const ListingBarChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1 Month');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const periods = ['1 Month', '3 Months', '6 Months', '1 Year'];
  
  const data = [
    { name: 'Food & Drinks', value: 10, shortName: 'Food & Drinks' },
    { name: 'Decoration & Styling', value: 45, shortName: 'Decoration & Styling' },
    { name: 'Location & Party Tents', value: 30, shortName: 'Location & Party Tents' },
    { name: 'Entertainment & Attractions', value: 60, shortName: 'Entertainment & Attractions' },
    { name: 'Staff & Services', value: 15, shortName: 'Staff & Services' },
    { name: 'Food & Drinks', value: 30, shortName: 'Food & Drinks' },
    { name: 'Decoration & Styling', value: 42, shortName: 'Decoration & Styling' },
    { name: 'Location & Party Tents', value: 28, shortName: 'Location & Party Tents' }
  ];
  
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <Card className="p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Mostly book items Overview</h3>
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-500 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
          >
            <span>{selectedPeriod}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative h-80">
        {/* Y-axis */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pr-3">
          <span>60</span>
          <span>45</span>
          <span>30</span>
          <span>15</span>
          <span>0</span>
        </div>

        {/* Grid Lines */}
        <div className="absolute left-8 top-0 right-0 h-full">
          {[0, 1, 2, 3, 4].map((line, index) => (
            <div
              key={line}
              className="absolute w-full border-t border-gray-100"
              style={{ top: `${(index / 4) * 100}%` }}
            />
          ))}
        </div>

        {/* Chart Bars */}
        <div className="ml-8 h-full flex items-end justify-between px-1">
          {data.map((item, index) => {
            const heightPercentage = (item.value / maxValue) * 85; // 85% max height for better visibility
            return (
              <div key={index} className="flex flex-col items-center" style={{ width: '11%', minWidth: '32px' }}>
                <div 
                  className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                  style={{ 
                    height: `${heightPercentage}%`,
                    minHeight: '20px',
                    background: 'linear-gradient(180deg, #FF295D 0%, #E31B95 48.56%, #C817AE 100%)',
                    boxShadow: '0 4px 8px rgba(255, 41, 93, 0.3)'
                  }}
                  title={`${item.name}: ${item.value} bookings`}
                />
              </div>
            );
          })}
        </div>

        {/* X-axis Labels */}
        <div className="absolute -bottom-16 left-8 right-0 flex justify-between px-1">
          {data.map((item, index) => (
            <div key={index} className="text-center" style={{ width: '11%', minWidth: '32px' }}>
              <div className="text-xs text-gray-500 leading-tight">
                {item.shortName}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra spacing for labels */}
      <div className="h-16"></div>
    </Card>
  );
};

export default ListingBarChart;
