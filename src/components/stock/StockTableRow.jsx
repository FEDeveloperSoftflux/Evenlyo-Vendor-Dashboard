import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const StockTableRow = ({ number, id, name, quantity, dateTime, onStockIn }) => {
  return (
    <tr className="text-sm text-gray-700">
      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{number}</td>
      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{id}</td>
      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{name}</td>
      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
        <Badge status="confirmed">
          {quantity}
        </Badge>
      </td>
      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{dateTime}</td>
      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
        <Button variant="secondary" size="sm" onClick={onStockIn}>
          + Stock In
        </Button>
      </td>
    </tr>
  );
};

export default StockTableRow;
