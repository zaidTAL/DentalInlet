import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const response = await axios.get(`${API_URL}/reviews`);
  return response.data.data;
});

export const submitReview = createAsyncThunk('reviews/submitReview', async (reviewData) => {
  const response = await axios.post(`${API_URL}/reviews`, reviewData);
  return response.data.data;
});

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        // Add the new review to the beginning of the list for instant update
        state.items.unshift(action.payload);
      });
  },
});

export default reviewsSlice.reducer;
