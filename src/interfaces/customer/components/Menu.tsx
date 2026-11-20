import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Plus } from 'lucide-react';

const Menu = () => {
  const { items, categories } = useSelector((state: RootState) => state.menu);

  return (
    <div className="space-y-8">
      {categories.map((category, index) => (
        <motion.section
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-6 capitalize">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items
              .filter(item => item.category === category)
              .map(item => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex gap-4 p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-semibold">${item.price.toFixed(2)}</span>
                      <button className="p-2 hover:bg-primary-50 rounded-full">
                        <Plus className="w-5 h-5 text-primary-600" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default Menu;