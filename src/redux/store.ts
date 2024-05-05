import { configureStore } from '@reduxjs/toolkit';

import jobsSlice from './slice/jobs.ts';
import filtersSlice from './slice/filters.ts';

export const store = configureStore({
  reducer: {
    jobsSlice,
    filtersSlice
  }
});
