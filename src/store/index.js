import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import purchasesReducer from './purchases';
import authReducer from './auth';
import baseAPIs from '../services/base';

const store = configureStore({
  reducer: {
    purchases: purchasesReducer,
    auth: authReducer,
    [baseAPIs.reducerPath]: baseAPIs.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseAPIs.middleware)
});

export default store;

//Optional but required for refechOnFocus and refetchOnReconnect
setupListeners(store.dispatch);
