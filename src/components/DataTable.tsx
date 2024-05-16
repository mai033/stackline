import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

interface SalesData {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

const DataTable: React.FC = () => {
  const sales = useSelector((state: RootState) => state.sales.sales);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof SalesData;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const sortedSales = React.useMemo(() => {
    const sortableSales = [...sales];
    if (sortConfig !== null) {
      sortableSales.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableSales;
  }, [sales, sortConfig]);

  const requestSort = (key: keyof SalesData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${month}-${day}-${year}`;
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const getClassNamesFor = (name: keyof SalesData) => {
    if (!sortConfig) {
      return null;
    }
    return sortConfig.key === name
      ? sortConfig.direction === 'ascending'
        ? 'ascending'
        : 'descending'
      : null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('weekEnding')}
            >
              Week Ending{' '}
              {getClassNamesFor('weekEnding') === 'ascending' ? (
                <ChevronUpIcon className="inline-block w-4 h-4 ml-1" />
              ) : (
                <ChevronDownIcon className="inline-block w-4 h-4 ml-1" />
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('retailSales')}
            >
              Retail Sales{' '}
              {getClassNamesFor('retailSales') === 'ascending' ? (
                <ChevronUpIcon className="inline-block w-4 h-4 ml-1" />
              ) : (
                <ChevronDownIcon className="inline-block w-4 h-4 ml-1" />
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('wholesaleSales')}
            >
              Wholesale Sales{' '}
              {getClassNamesFor('wholesaleSales') === 'ascending' ? (
                <ChevronUpIcon className="inline-block w-4 h-4 ml-1" />
              ) : (
                <ChevronDownIcon className="inline-block w-4 h-4 ml-1" />
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('unitsSold')}
            >
              Units Sold{' '}
              {getClassNamesFor('unitsSold') === 'ascending' ? (
                <ChevronUpIcon className="inline-block w-4 h-4 ml-1" />
              ) : (
                <ChevronDownIcon className="inline-block w-4 h-4 ml-1" />
              )}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => requestSort('retailerMargin')}
            >
              Retailer Margin{' '}
              {getClassNamesFor('retailerMargin') === 'ascending' ? (
                <ChevronUpIcon className="inline-block w-4 h-4 ml-1" />
              ) : (
                <ChevronDownIcon className="inline-block w-4 h-4 ml-1" />
              )}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedSales.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-400">
                {formatDate(row.weekEnding)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-right pr-12">
                {formatCurrency(row.retailSales)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-right pr-12 ">
                {formatCurrency(row.wholesaleSales)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-right pr-12 ">
                {row.unitsSold}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-right pr-12 ">
                {formatCurrency(row.retailerMargin)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
