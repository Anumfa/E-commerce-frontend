import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:9000';
const API_URL = `${API_BASE}/api/contact`;

export const fetchContacts = createAsyncThunk('contact/fetchAll', async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data.data;
});

export const createContact = createAsyncThunk('contact/create', async (contactData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/create`, contactData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const setMeeting = createAsyncThunk('contact/setMeeting', async ({ id, meetingData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/meeting/${id}`, meetingData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateMeetingStatus = createAsyncThunk('contact/updateMeetingStatus', async ({ id, meetingStatus }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/meeting-status/${id}`, { meetingStatus });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteContact = createAsyncThunk('contact/delete', async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
  return id;
});

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => { state.loading = true; })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(setMeeting.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateMeetingStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export default contactSlice.reducer;
