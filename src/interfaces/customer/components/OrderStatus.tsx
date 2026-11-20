import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Clock, CheckCircle, ChefHat, Truck } from 'lucide-react';

const OrderStatus = () => {
  const { orders } = useSelector((state: RootState) => state.orders);
  const currentOrder = orders[orders.length - 1];

  if (!currentOrder) return null;

  const statusSteps = [
    { status: 'pending', icon: Clock, label: 'Order Received' },
    { status: 'preparing', icon: ChefHat, label: 'Preparing' },
    { status: 'ready', icon: CheckCircle, label: 'Ready' },
    { status: 'served', icon: Truck, label: 'Served' },
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.status === currentOrder.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 mt-8"
    >
      <h2 className="text-2xl font-semibold mb-6">Order Status</h2>
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
        {statusSteps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <motion.div
              key={step.status}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center mb-8 last:mb-0"
            >
              <div
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center z-10
                  ${isCompleted ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}
                  ${isCurrent ? 'ring-2 ring-primary-500 ring-offset-2' : ''}
                `}
              >
                <Icon className="w-8 h-8" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">{step.label}</h3>
                {isCurrent && (
                  <p className="text-sm text-gray-600">Your order is being processed</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default OrderStatus;