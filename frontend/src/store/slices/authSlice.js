import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Check if user is already logged in
const token = localStorage.getItem('doctorToken');

export const checkEmail = createAsyncThunk('auth/checkEmail', async (email) => {
  const response = await axios.post(`${API_URL}/auth/check-email`, { email });
  return response.data;
});

export const loginDoctor = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  localStorage.setItem('doctorToken', response.data.token);
  return response.data;
});

export const getMe = createAsyncThunk('auth/getMe', async (_, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: token || null,
    isAuthenticated: !!token,
    status: 'idle',
    error: null,
    isDoctorEmail: false,
    doctorAccountExists: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('doctorToken');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isDoctorEmail = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.isDoctorEmail = action.payload.isDoctor;
        state.doctorAccountExists = action.payload.exists;
      })
      .addCase(loginDoctor.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginDoctor.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
