import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:9000';
const API_URL = `${API_BASE}/api/banner`;

export const fetchBanners = createAsyncThunk('banner/fetchAll', async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data.data;
});

export const createBanner = createAsyncThunk('banner/create', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateBanner = createAsyncThunk('banner/update', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteBanner = createAsyncThunk('banner/delete', async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
  return id;
});

const bannerSlice = createSlice({
  name: 'banner',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => { state.loading = true; })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default bannerSlice.reducer;
