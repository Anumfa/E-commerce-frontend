import { createSlice } from '@reduxjs/toolkit';

const getInitialCart = () => {
  const storedCart = localStorage.getItem('ecovibe_cart');
  if (storedCart) {
    try {
      return JSON.parse(storedCart);
    } catch (e) {
      return [];
    }
  }
  return [];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: getInitialCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedColor, selectedSize } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product._id === product._id && 
                  item.selectedColor === selectedColor && 
                  item.selectedSize === selectedSize
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity, selectedColor, selectedSize });
      }
      localStorage.setItem('ecovibe_cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const { productId, selectedColor, selectedSize } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.product._id === productId && 
                    item.selectedColor === selectedColor && 
                    item.selectedSize === selectedSize)
      );
      localStorage.setItem('ecovibe_cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { productId, selectedColor, selectedSize, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.product._id === productId && 
                  item.selectedColor === selectedColor && 
                  item.selectedSize === selectedSize
      );
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      localStorage.setItem('ecovibe_cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('ecovibe_cart');
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
