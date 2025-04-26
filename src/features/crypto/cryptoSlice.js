import { createSlice, createSelector } from '@reduxjs/toolkit';
import { initialCryptoData } from '../../data/sampleData';

// Function to safely load sort preferences from localStorage
const loadSortPreferences = () => {
  try {
    const serializedPrefs = localStorage.getItem('cryptoSortPreferences');
    if (serializedPrefs === null) {
      return undefined;
    }
    const prefs = JSON.parse(serializedPrefs);
    if (prefs && typeof prefs.sortKey === 'string' && typeof prefs.sortDirection === 'string') {
       return prefs;
    }
    return undefined;
  } catch (err) {
    console.error("Could not load sort preferences from localStorage", err);
    return undefined;
  }
};

// Load preferences or use defaults
const savedPrefs = loadSortPreferences();
const defaultSortKey = 'marketCap';
const defaultSortDirection = 'desc';

// Initial state for the crypto slice
const initialState = {
  assets: initialCryptoData,
  status: 'idle',
  error: null,
  sortKey: savedPrefs?.sortKey || defaultSortKey,
  sortDirection: savedPrefs?.sortDirection || defaultSortDirection,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAssets(state, action) {
      const updates = action.payload;
      updates.forEach(update => {
        const assetIndex = state.assets.findIndex(asset => asset.id === update.id);
        if (assetIndex !== -1) {
          state.assets[assetIndex] = { ...state.assets[assetIndex], ...update };
        }
      });
    },
    setSort(state, action) {
      const { key } = action.payload;
      if (state.sortKey === key) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortKey = key;
        state.sortDirection = (key === 'name') ? 'asc' : 'desc';
      }
    }
  },
});

const selectRawAssets = (state) => state.crypto.assets;
const selectSortKey = (state) => state.crypto.sortKey;
const selectSortDirection = (state) => state.crypto.sortDirection;

export const selectSortedCryptoAssets = createSelector(
  [selectRawAssets, selectSortKey, selectSortDirection],
  (assets, sortKey, sortDirection) => {
    const sortedAssets = [...assets];
    sortedAssets.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA == null && valB == null) return 0;
      if (valA == null) return sortDirection === 'asc' ? 1 : -1;
      if (valB == null) return sortDirection === 'asc' ? -1 : 1;
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
    return sortedAssets;
  }
);

export { selectSortKey, selectSortDirection };
export const selectCryptoStatus = (state) => state.crypto.status;
export const selectCryptoAssets = selectRawAssets;

export default cryptoSlice.reducer;
export const { updateAssets, setSort } = cryptoSlice.actions;