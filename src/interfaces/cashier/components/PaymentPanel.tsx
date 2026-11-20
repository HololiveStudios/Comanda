import { motion } from 'framer-motion';
import { CreditCard, Wallet, Banknote } from 'lucide-react';

const PaymentPanel = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Payment Processing</h2>
      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-4 p-4 rounded-lg border hover:bg-primary-50 transition-colors"
        >
          <CreditCard className="w-6 h-6 text-primary-600" />
          <div className="flex-1 text-left">
            <h3 className="font-semibold">Card Payment</h3>
            <p className="text-sm text-gray-600">Process credit or debit card payment</p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-4 p-4 rounded-lg border hover:bg-primary-50 transition-colors"
        >
          <Wallet className="w-6 h-6 text-primary-600" />
          <div className="flex-1 text-left">
            <h3 className="font-semibold">Digital Wallet</h3>
            <p className="text-sm text-gray-600">Accept digital wallet payments</p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-4 p-4 rounded-lg border hover:bg-primary-50 transition-colors"
        >
          <Banknote className="w-6 h-6 text-primary-600" />
          <div className="flex-1 text-left">
            <h3 className="font-semibold">Cash Payment</h3>
            <p className="text-sm text-gray-600">Process cash payments</p>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default PaymentPanel;