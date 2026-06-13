import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const createBooking = createAsyncThunk('bookings/createBooking', async (bookingData) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData);
  return response.data.data;
});

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    lastBooking: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetBookingStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lastBooking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetBookingStatus } = bookingsSlice.actions;
export default bookingsSlice.reducer;
