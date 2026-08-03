import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:9000/api/auth'; // Change back to vercel URL for production

// Login Thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

// Register Thunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Registration failed');
      }
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

// Google Auth Thunk
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Google login failed');
      }
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('ecovibe_user')) || null,
  token: localStorage.getItem('ecovibe_token') || null,
  isAuthenticated: !!localStorage.getItem('ecovibe_token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('ecovibe_user');
      localStorage.removeItem('ecovibe_token');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('ecovibe_token', action.payload.token);
      localStorage.setItem('ecovibe_user', JSON.stringify(action.payload.user));
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      // You can auto-login here if backend returns token, or require manual login
      // Assuming backend just registers, they might need to login manually.
      // But if token is returned:
      if (action.payload.token) {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('ecovibe_token', action.payload.token);
        localStorage.setItem('ecovibe_user', JSON.stringify(action.payload.user));
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Google Login
    builder.addCase(googleLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('ecovibe_token', action.payload.token);
      localStorage.setItem('ecovibe_user', JSON.stringify(action.payload.user));
    });
    builder.addCase(googleLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
