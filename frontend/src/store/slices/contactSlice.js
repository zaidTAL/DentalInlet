import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const sendContactMessage = createAsyncThunk(
  'contact/sendContactMessage',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/contact`, contactData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {
    resetContactStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetContactStatus } = contactSlice.actions;
export default contactSlice.reducer;
