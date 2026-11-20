import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import TableMap from './components/TableMap';
import OrderPanel from './components/OrderPanel';

const WaiterInterface = () => {
  const { tables } = useSelector((state: RootState) => state.tables);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <TableMap tables={tables} />
          </div>
          <div className="lg:w-1/3">
            <OrderPanel />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WaiterInterface;