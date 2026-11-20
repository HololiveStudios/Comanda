// src/store/slices/menuSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  order: number;
  active: boolean;
}

interface MenuState {
  categories: MenuCategory[];
}

const initialState: MenuState = {
  categories: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<MenuCategory>) {
      state.categories.push(action.payload);
    },
    updateCategory(state, action: PayloadAction<MenuCategory>) {
      const index = state.categories.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter(c => c.id !== action.payload);
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } = menuSlice.actions;
export default menuSlice.reducer;