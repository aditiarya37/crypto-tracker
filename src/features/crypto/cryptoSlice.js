import { createSlice } from '@reduxjs/toolkit';
import { initialCryptoData } from '../../data/sampleData';

// Initial state for the crypto slice
const initialState = {
  assets: initialCryptoData,
  status: 'idle', // Potential status: 'loading', 'succeeded', 'failed'
  error: null,
};

// Redux slice for cryptocurrency data
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  // Reducers define how the state can be updated
  reducers: {
    // Updates asset data based on incoming payload
    updateAssets(state, action) {
      const updates = action.payload;
      updates.forEach(update => {
        const assetIndex = state.assets.findIndex(asset => asset.id === update.id);
        if (assetIndex !== -1) {
          state.assets[assetIndex] = { ...state.assets[assetIndex], ...update };
        }
      });
    }
  },
});

// Selectors to retrieve specific parts of the state
export const selectCryptoAssets = (state) => state.crypto.assets;
export const selectCryptoStatus = (state) => state.crypto.status;

// Export the reducer and actions
export default cryptoSlice.reducer;
export const { updateAssets } = cryptoSlice.actions;