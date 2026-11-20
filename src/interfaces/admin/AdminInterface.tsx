import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import TableManagement from './components/TableManagement';
import DeliverySettings from './components/DeliverySettings';
import BusinessSettings from './components/BusinessSettings';
import TaxSettings from './components/TaxSettings';
import StaffManagement from './components/StaffManagement';
import MenuCategories from './components/MenuCategories';

export const AdminInterface = () => {
  const dispatch = useDispatch();
  const { tables } = useSelector((state: RootState) => state.tables);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Administração do Restaurante</h1>
            <p className="mt-1 text-gray-500">Configure mesas, entregas e outras configurações do restaurante</p>
          </div>
        </div>

        <Tabs defaultValue="tables" className="w-full">
          <TabsList className="mb-8 flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="tables" className="flex-1 rounded-md py-2">
              Mesas
            </TabsTrigger>
            <TabsTrigger value="delivery" className="flex-1 rounded-md py-2">
              Entregas
            </TabsTrigger>
            <TabsTrigger value="business" className="flex-1 rounded-md py-2">
              Negócio
            </TabsTrigger>
            <TabsTrigger value="taxes" className="flex-1 rounded-md py-2">
              Impostos
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex-1 rounded-md py-2">
              Funcionários
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex-1 rounded-md py-2">
              Categorias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tables" className="mt-6">
            <TableManagement />
          </TabsContent>

          <TabsContent value="delivery" className="mt-6">
            <DeliverySettings />
          </TabsContent>

          <TabsContent value="business" className="mt-6">
            <BusinessSettings />
          </TabsContent>

          <TabsContent value="taxes" className="mt-6">
            <TaxSettings />
          </TabsContent>

          <TabsContent value="staff" className="mt-6">
            <StaffManagement />
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <MenuCategories />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default AdminInterface;