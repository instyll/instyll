import { createSlice } from '@reduxjs/toolkit';

const initialState = { selectedUser: '', selectedUserId: -1 };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      return {
        ...state,
        selectedUser: action.payload,
      }
    },
    setSelectedUserId: (state, action) => {
      return {
        ...state,
        selectedUserId: action.payload,
      }
    },
    clearSelectedUser: (state) => {
      return {
        ...state,
        selectedUser: '',
        selectedUserId: -1,
      }
    },
  },
});

export const { setSelectedUser, setSelectedUserId, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
