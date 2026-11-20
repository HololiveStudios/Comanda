import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import WaiterInterface from './interfaces/waiter/WaiterInterface';
import CustomerInterface from './interfaces/customer/CustomerInterface';
import CashierInterface from './interfaces/cashier/CashierInterface';
import HomeScreen from './screens/HomeScreen';
import { AnimatePresence } from 'framer-motion';
import AdminInterface from './interfaces/admin/AdminInterface';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/waiter/*" element={<WaiterInterface />} />
            <Route path="/customer/*" element={<CustomerInterface />} />
            <Route path="/cashier/*" element={<CashierInterface />} />
            <Route path="/admin/*" element={<AdminInterface />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </Provider>
  );
}

export default App;