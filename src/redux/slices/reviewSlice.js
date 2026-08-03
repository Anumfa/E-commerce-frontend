import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:9000';
const API_URL = `${API_BASE}/api/review`;

export const fetchReviews = createAsyncThunk('review/fetchAll', async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data.data;
});

export const fetchApprovedReviews = createAsyncThunk('review/fetchApproved', async () => {
  const response = await axios.get(`${API_URL}/approved`);
  return response.data.data;
});

export const createReview = createAsyncThunk('review/create', async (reviewData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/create`, reviewData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const approveReview = createAsyncThunk('review/approve', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/approve/${id}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const declineReview = createAsyncThunk('review/decline', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/decline/${id}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteReview = createAsyncThunk('review/delete', async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
  return id;
});

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    items: [],
    approvedItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => { state.loading = true; })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchApprovedReviews.fulfilled, (state, action) => {
        state.approvedItems = action.payload;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(approveReview.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(declineReview.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default reviewSlice.reducer;
