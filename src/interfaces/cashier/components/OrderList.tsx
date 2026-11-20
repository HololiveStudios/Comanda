import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Clock, DollarSign } from 'lucide-react';

const OrderList = () => {
  const { orders } = useSelector((state: RootState) => state.orders);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Active Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`
              border rounded-lg p-4
              ${order.status === 'pending' ? 'border-yellow-400 bg-yellow-50' : ''}
              ${order.status === 'preparing' ? 'border-blue-400 bg-blue-50' : ''}
              ${order.status === 'ready' ? 'border-green-400 bg-green-50' : ''}
            `}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Table {order.tableNumber}</h3>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.menuItem.name}</span>
                  <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
              <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                <DollarSign className="w-4 h-4" />
                Process Payment
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;