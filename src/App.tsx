import React, { useEffect } from 'react';
import { useAppDispatch } from './app/store';
import { fetchSales } from './features/sales/salesSlice';
import ProductHeader from './components/ProductHeader';
import SalesGraph from './components/SalesGraph';
import DataTable from './components/DataTable';
import logo from './assets/logo.svg';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-[#052849] p-4">
        <div className="container h-20 flex items-center">
          <img src={logo} alt="Stackline Logo" className="h-8" />
        </div>
      </header>
      <div className="flex flex-1 mt-24">
        <aside className="lg:w-1/4 p-4">
          <ProductHeader />
        </aside>
        <main className="flex-1 p-4">
          <div className="mb-4">
            <SalesGraph />
          </div>
          <div>
            <DataTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
