import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/crypto/cryptoSlice';

// Configure the Redux store
export const store = configureStore({
  // Combine reducers for different state slices
  reducer: {
    crypto: cryptoReducer
  },
});