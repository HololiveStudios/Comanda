import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Users, Wallet } from 'lucide-react';

const HomeScreen = () => {
  const interfaces = [
    {
      title: 'Waiter Interface',
      description: 'Manage tables, take orders, and track order status',
      icon: ChefHat,
      path: '/waiter',
      color: 'bg-blue-500',
    },
    {
      title: 'Customer Interface',
      description: 'Browse menu, place orders, and make payments',
      icon: Users,
      path: '/customer',
      color: 'bg-green-500',
    },
    {
      title: 'Cashier Interface',
      description: 'Process payments and manage orders',
      icon: Wallet,
      path: '/cashier',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Restaurant Management System
          </h1>
          <p className="text-lg text-gray-600">
            Select an interface to get started
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {interfaces.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="block h-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-xl shadow-lg p-8 h-full flex flex-col items-center text-center"
                  >
                    <div className={`${item.color} p-4 rounded-full mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 flex-grow">
                      {item.description}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`mt-6 px-6 py-2 rounded-lg text-white ${item.color} hover:opacity-90 transition-opacity`}
                    >
                      Enter Interface
                    </motion.button>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-gray-600"
        >
          <p>Version 1.0.0 | © 2025 Restaurant Management System</p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeScreen;