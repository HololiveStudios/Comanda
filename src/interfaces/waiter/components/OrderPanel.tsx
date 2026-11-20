import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

const OrderPanel = () => {
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
            className="border rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Table {order.tableNumber}</h3>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleTimeString()}
              </span>
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
              <div className="flex gap-2">
                <button className="p-2 hover:bg-green-100 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </button>
                <button className="p-2 hover:bg-red-100 rounded-full">
                  <XCircle className="w-5 h-5 text-red-600" />
                </button>
                <button className="p-2 hover:bg-blue-100 rounded-full">
                  <Clock className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderPanel;