import { motion } from 'framer-motion';
import QRScanner from './components/QRScanner';
import Menu from './components/Menu';
import OrderStatus from './components/OrderStatus';

const CustomerInterface = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QRScanner />
        <Menu />
        <OrderStatus />
      </div>
    </motion.div>
  );
};

export default CustomerInterface;