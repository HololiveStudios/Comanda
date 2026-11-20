import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './slices/ordersSlice';
import tablesReducer from './slices/tablesSlice';
import menuReducer from './slices/menuSlice';
import settingsReducer from './slices/settingsSlice';
import socketMiddleware from './middleware/socketMiddleware';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    tables: tablesReducer,
    menu: menuReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;