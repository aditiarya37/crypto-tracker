import React from 'react';
import CryptoTableRow from './CryptoTableRow';
import { useSelector } from 'react-redux';
import { selectCryptoAssets } from '../features/crypto/cryptoSlice';

// Component to display the table of cryptocurrencies
const CryptoTable = () => {
  // Select crypto assets data from the Redux store
  const cryptoAssets = useSelector(selectCryptoAssets);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Cryptocurrency Prices</h1>

      {/* Wrapper for horizontal scrolling on small screens */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {/* Table Header */}
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="py-3 px-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>
              <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
              <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">1h %</th>
              <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">24h %</th>
              <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">7d %</th>
              <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Market Cap</th>
              <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Volume(24h)</th>
              <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Circulating Supply</th>
              <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last 7 Days</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {/* Map over assets and render a row for each */}
            {cryptoAssets.map(asset => (
              <CryptoTableRow key={asset.id} asset={asset} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;