import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:9000';
const API_URL = `${API_BASE}/api/product`;

export const fetchProducts = createAsyncThunk('product/fetchAll', async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data.data;
});

export const createProduct = createAsyncThunk('product/create', async (formData) => {
  const response = await axios.post(`${API_URL}/create`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.data;
});

export const updateProduct = createAsyncThunk('product/update', async ({ id, formData }) => {
  const response = await axios.put(`${API_URL}/update/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.data;
});

export const deleteProduct = createAsyncThunk('product/delete', async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
  return id;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default productSlice.reducer;
