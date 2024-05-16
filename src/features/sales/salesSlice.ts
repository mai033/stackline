import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

interface Product {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: { customer: string; review: string; score: number }[];
  retailer: string;
  details: string[];
  tags: string[];
}

interface SalesState {
  product: Product | null;
  sales: Sale[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SalesState = {
  product: null,
  sales: [],
  status: 'idle',
  error: null,
};

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  const response = await fetch('/data.json');
  const data = await response.json();
  return {
    product: data[0],
    sales: data[0].sales,
  };
});

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload.product;
        state.sales = action.payload.sales;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default salesSlice.reducer;


