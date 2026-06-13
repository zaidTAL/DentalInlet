import { configureStore } from '@reduxjs/toolkit';
import servicesReducer from './slices/servicesSlice';
import reviewsReducer from './slices/reviewsSlice';
import bookingsReducer from './slices/bookingsSlice';
import authReducer from './slices/authSlice';
import contactReducer from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    reviews: reviewsReducer,
    bookings: bookingsReducer,
    auth: authReducer,
    contact: contactReducer,
  },
});

export default store;
