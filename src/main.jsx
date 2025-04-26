import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';

const saveSortPreferences = (state) => {
  try {
    const prefsToSave = {
      sortKey: state.crypto.sortKey,
      sortDirection: state.crypto.sortDirection,
    };
    const serializedPrefs = JSON.stringify(prefsToSave);
    localStorage.setItem('cryptoSortPreferences', serializedPrefs);
  } catch (err) {
    console.error("Could not save sort preferences to localStorage", err);
  }
};

// --- Store Subscription Logic ---
let previousSortKey = store.getState().crypto.sortKey;
let previousSortDirection = store.getState().crypto.sortDirection;

store.subscribe(() => {
  const currentState = store.getState();
  const currentSortKey = currentState.crypto.sortKey;
  const currentSortDirection = currentState.crypto.sortDirection;

  // Check if the sort preferences have actually changed
  if (currentSortKey !== previousSortKey || currentSortDirection !== previousSortDirection) {
    saveSortPreferences(currentState);

    // Update the previous values for the next check
    previousSortKey = currentSortKey;
    previousSortDirection = currentSortDirection;
  }
});

// Render the root component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);