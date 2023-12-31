import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      return { ...state, ...action.payload };
    },
    logout() {
      return null;
    }
  }
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;
