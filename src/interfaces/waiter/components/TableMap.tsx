import React from 'react';
import { motion } from 'framer-motion';
import { Table } from '../../../types';
import { Circle } from 'lucide-react';

interface TableMapProps {
  tables: Table[];
}

const TableMap: React.FC<TableMapProps> = ({ tables }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Table Map</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tables.map((table) => (
          <motion.div
            key={table.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              p-4 rounded-lg cursor-pointer text-center
              ${table.status === 'available' ? 'bg-green-100' : ''}
              ${table.status === 'occupied' ? 'bg-red-100' : ''}
              ${table.status === 'reserved' ? 'bg-yellow-100' : ''}
              ${table.status === 'cleaning' ? 'bg-blue-100' : ''}
            `}
          >
            <Circle className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold">Table {table.number}</p>
            <p className="text-sm text-gray-600">{table.seats} seats</p>
            <p className="text-xs capitalize mt-1">{table.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TableMap;