import { configureStore } from '@reduxjs/toolkit';
import bannerReducer from './slices/bannerSlice';
import categoryReducer from './slices/categorySlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import authReducer from './slices/authSlice';
import reviewReducer from './slices/reviewSlice';
import contactReducer from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    banner: bannerReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    review: reviewReducer,
    contact: contactReducer,
  },
});
