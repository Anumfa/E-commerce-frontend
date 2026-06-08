import { createSlice } from '@reduxjs/toolkit';

const getInitialWishlist = () => {
  const storedWishlist = localStorage.getItem('ecovibe_wishlist');
  if (storedWishlist) {
    try {
      return JSON.parse(storedWishlist);
    } catch (e) {
      return [];
    }
  }
  return [];
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: getInitialWishlist(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(item => item._id === product._id);
      
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(product);
      }
      localStorage.setItem('ecovibe_wishlist', JSON.stringify(state.items));
    }
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
