import React from 'react';

// --- Helper Functions for Formatting ---

const formatNumber = (num) => {
  if (num === null || num === undefined) return 'N/A';
  return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
};

const formatPrice = (price) => {
  if (price === null || price === undefined) return 'N/A';
  const options = {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 6 : 2,
  };
  return price.toLocaleString('en-US', options);
};

const formatPercent = (percent) => {
  if (percent === null || percent === undefined) return 'N/A';
  const value = percent.toFixed(2);
  const colorClass = percent >= 0 ? 'text-green-600' : 'text-red-600';
  const sign = percent >= 0 ? '▲' : '▼';
  return <span className={colorClass}>{sign} {Math.abs(value)}%</span>;
};

// --- CryptoTableRow Component ---

const CryptoTableRow = ({ asset }) => {
  // Destructure asset properties
  const {
    rank, logo, name, symbol, price, change1h, change24h, change7d,
    marketCap, volume24h, circulatingSupply,
  } = asset;

  // Determine which 7-day chart SVG to display
  let chartSrc = '/charts/generic-flat-trend.svg';
  if (change7d > 0.5) chartSrc = '/charts/generic-up-trend.svg';
  else if (change7d < -0.5) chartSrc = '/charts/generic-down-trend.svg';

  return (
    // Render the table row with asset data
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      {/* Rank */}
      <td className="py-3 px-4 text-center text-sm text-gray-500 dark:text-gray-400">{rank}</td>

      {/* Name & Logo */}
      <td className="py-3 px-4 text-left">
        <div className="flex items-center space-x-2">
          <img src={logo} alt={`${name} logo`} className="h-6 w-6 flex-shrink-0" />
          <div>
            <span className="font-medium text-gray-900 dark:text-white">{name}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">{symbol}</span>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="py-3 px-4 text-right font-medium text-gray-900 dark:text-white">{formatPrice(price)}</td>

      {/* Percentage Changes */}
      <td className="py-3 px-4 text-right">{formatPercent(change1h)}</td>
      <td className="py-3 px-4 text-right">{formatPercent(change24h)}</td>
      <td className="py-3 px-4 text-right">{formatPercent(change7d)}</td>

      {/* Market Stats */}
      <td className="py-3 px-4 text-right text-sm text-gray-700 dark:text-gray-300">${formatNumber(marketCap)}</td>
      <td className="py-3 px-4 text-right text-sm text-gray-700 dark:text-gray-300">${formatNumber(volume24h)}</td>
      <td className="py-3 px-4 text-right text-sm text-gray-700 dark:text-gray-300">
        {formatNumber(circulatingSupply)} {symbol}
      </td>

      {/* 7-Day Chart */}
      <td className="py-3 px-4">
        <img
          src={chartSrc}
          alt={`${symbol} 7d chart trend`}
          className="w-24 h-8 mx-auto"
        />
      </td>
    </tr>
  );
};

export default CryptoTableRow;