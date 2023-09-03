import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      return { ...state, ...action.payload };
    },
    logout() {
      return {};
    }
  }
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;
