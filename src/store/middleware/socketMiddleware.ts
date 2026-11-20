import { Middleware } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { addOrder, updateOrder } from '../slices/ordersSlice';
import { updateTable } from '../slices/tablesSlice';

const socket = io('http://localhost:3000'); // Replace with your actual WebSocket server URL

const socketMiddleware: Middleware = (store) => (next) => (action) => {
  // Handle incoming socket events
  socket.on('newOrder', (order) => {
    store.dispatch(addOrder(order));
  });

  socket.on('orderUpdated', (order) => {
    store.dispatch(updateOrder(order));
  });

  socket.on('tableUpdated', (table) => {
    store.dispatch(updateTable(table));
  });

  // Handle outgoing socket events
  if (action.type === 'orders/addOrder') {
    socket.emit('newOrder', action.payload);
  }

  if (action.type === 'orders/updateOrder') {
    socket.emit('updateOrder', action.payload);
  }

  if (action.type === 'tables/updateTable') {
    socket.emit('updateTable', action.payload);
  }

  return next(action);
};

export default socketMiddleware;