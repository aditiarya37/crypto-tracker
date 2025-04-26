import React, { useEffect, useRef } from 'react';
import CryptoTable from './components/CryptoTable';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssets, selectCryptoAssets } from './features/crypto/cryptoSlice';

// Helper function for random value fluctuation
const getRandomFluctuation = (value, factor = 0.005) => {
  const randomFactor = (Math.random() - 0.5) * 2 * factor;
  return value * (1 + randomFactor);
};

// Main application component
function App() {
  const dispatch = useDispatch();
  const cryptoAssets = useSelector(selectCryptoAssets);

  // Ref to hold the latest asset data for use inside setInterval
  const assetsRef = useRef(cryptoAssets);
  useEffect(() => {
    assetsRef.current = cryptoAssets;
  }, [cryptoAssets]);

  // Effect to run the data simulation interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentAssets = assetsRef.current;
      if (!currentAssets || currentAssets.length === 0) return;

      // Generate simulated updates for a few assets
      const updates = [];
      const assetsToUpdateCount = Math.random() < 0.6 ? 1 : 2;
      const shuffledAssets = [...currentAssets].sort(() => 0.5 - Math.random());

      for (let i = 0; i < Math.min(assetsToUpdateCount, shuffledAssets.length); i++) {
        const assetToUpdate = shuffledAssets[i];
        // Calculate new simulated values
        const newPrice = getRandomFluctuation(assetToUpdate.price);
        const newChange1h = getRandomFluctuation(assetToUpdate.change1h, 0.1);
        const newChange24h = getRandomFluctuation(assetToUpdate.change24h, 0.05);
        const newVolume24h = getRandomFluctuation(assetToUpdate.volume24h, 0.02);

        updates.push({ id: assetToUpdate.id, price: newPrice, change1h: newChange1h, change24h: newChange24h, volume24h: newVolume24h });
      }

      // Dispatch the updates to Redux
      if (updates.length > 0) {
        dispatch(updateAssets(updates));
      }

    }, 1500);

    // Cleanup function to clear interval on unmount
    return () => clearInterval(intervalId);

  }, [dispatch]);

  return (
    <div className="App bg-gray-100 dark:bg-gray-900 min-h-screen">
      <CryptoTable />
    </div>
  );
}

export default App;