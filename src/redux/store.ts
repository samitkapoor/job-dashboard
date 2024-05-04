import { configureStore } from '@reduxjs/toolkit';

import jobsSlice from './slice/jobs.ts';

export const store = configureStore({
  reducer: {
    jobsSlice
  }
});
