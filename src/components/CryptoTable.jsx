// src/components/CryptoTable.jsx
import React from 'react';
import CryptoTableRow from './CryptoTableRow';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSortedCryptoAssets,
  setSort,
  selectSortKey,
  selectSortDirection
} from '../features/crypto/cryptoSlice';

// Component for sortable table header cell
const SortableHeader = ({ children, columnKey, sortKey, sortDirection, onSort }) => {
  const isSorted = sortKey === columnKey;
  const arrow = isSorted ? (sortDirection === 'asc' ? '▲' : '▼') : '';

  return (
    <th
      scope="col"
      className="py-3 px-4 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={() => onSort(columnKey)}
    >
      <div className="flex items-center justify-between">
        <span>{children}</span>
        <span className={`ml-1 ${isSorted ? 'opacity-100' : 'opacity-30'}`}>{isSorted ? arrow : '↕'}</span>
      </div>
    </th>
  );
};


const CryptoTable = () => {
  const dispatch = useDispatch();
  // Get the SORTED assets using the new selector
  const sortedCryptoAssets = useSelector(selectSortedCryptoAssets);
  // Get current sort state to pass to headers
  const sortKey = useSelector(selectSortKey);
  const sortDirection = useSelector(selectSortDirection);

  // Handler function to dispatch the sorting action
  const handleSort = (key) => {
    dispatch(setSort({ key }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Cryptocurrency Prices</h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {/* Non-sortable Rank Header */}
              <th scope="col" className="py-3 px-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>

              {/* Use SortableHeader for sortable columns */}
              <SortableHeader columnKey="name" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort}>Name</SortableHeader>
              <SortableHeader columnKey="price" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort}>Price</SortableHeader>
              <SortableHeader columnKey="change1h" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort}>1h %</SortableHeader>
              <SortableHeader columnKey="change24h" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort}>24h %</SortableHeader>
              <SortableHeader columnKey="change7d" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort}>7d %</SortableHeader>
              <SortableHeader columnKey="marketCap" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort}>Market Cap</SortableHeader>
              <SortableHeader columnKey="volume24h" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort}>Volume(24h)</SortableHeader>
              <SortableHeader columnKey="circulatingSupply" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort}>Circulating Supply</SortableHeader>

              {/* Non-sortable Chart Header */}
              <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last 7 Days</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {/* Map over the SORTED crypto assets */}
            {sortedCryptoAssets.map(asset => (
              <CryptoTableRow key={asset.id} asset={asset} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;