import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch } from 'react-redux';
import salesReducer from '../features/sales/salesSlice';

export const store = configureStore({
  reducer: {
    sales: salesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
