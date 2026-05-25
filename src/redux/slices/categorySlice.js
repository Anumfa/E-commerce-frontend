import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:9000';
const API_URL = `${API_BASE}/api/category`;

export const fetchCategories = createAsyncThunk('category/fetchAll', async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data.data;
});

export const createCategory = createAsyncThunk('category/create', async (formData) => {
  const response = await axios.post(`${API_URL}/create`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.data;
});

export const updateCategory = createAsyncThunk('category/update', async ({ id, formData }) => {
  const response = await axios.put(`${API_URL}/update/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.data;
});

export const deleteCategory = createAsyncThunk('category/delete', async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
  return id;
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
