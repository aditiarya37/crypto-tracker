import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';

// Render the root component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provide the Redux store to the entire application */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);