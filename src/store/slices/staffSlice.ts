// staffSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StaffMember {
  id: string;
  name: string;
  role: 'manager' | 'waiter' | 'chef' | 'other';
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

interface StaffState {
  members: StaffMember[];
}

const initialState: StaffState = {
  members: [],
};

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    addStaff: (state, action: PayloadAction<StaffMember>) => {
      state.members.push(action.payload);
    },
    updateStaff: (state, action: PayloadAction<StaffMember>) => {
      const index = state.members.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.members[index] = action.payload;
      }
    },
    deleteStaff: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter(m => m.id !== action.payload);
    },
  },
});

export const { addStaff, updateStaff, deleteStaff } = staffSlice.actions;

// Seletor para obter todos os membros da equipe
export const selectStaffMembers = (state: { staff: StaffState }) => state.staff.members;

export default staffSlice.reducer;