import { createSlice } from '@reduxjs/toolkit';
import { services } from '../../data/services';

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    items: services,
    status: 'succeeded',
    error: null,
  },
  reducers: {},
});

export default servicesSlice.reducer;
