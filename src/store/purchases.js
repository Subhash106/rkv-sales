import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFetching: false,
  purchases: []
};

const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    fetchingPurchases(state, action) {
      return { ...state, isFetching: action.isFetching };
    },
    getPurchases(state, action) {
      return { ...state, purchases: action.payload };
    }
  }
});

export default purchasesSlice.reducer;

const { fetchingPurchases, getPurchases } = purchasesSlice.actions;

export { fetchingPurchases, getPurchases };
