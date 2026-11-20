import { motion } from 'framer-motion';
import OrderList from './components/OrderList';
import PaymentPanel from './components/PaymentPanel';

const CashierInterface = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <OrderList />
          <PaymentPanel />
        </div>
      </div>
    </motion.div>
  );
};

export default CashierInterface;