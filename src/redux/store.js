import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from './slices/bannerSlice';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    category: categoryReducer,
    product: productReducer,
  },
});
