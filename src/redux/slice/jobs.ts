import { createSlice } from '@reduxjs/toolkit';

import { JobsState } from '../../types';

const initialState: JobsState = {
  jobs: [],
  filteredJobs: []
};

const jobsSlice = createSlice({
  name: 'jobsSlice',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      return { ...state, jobs: action.payload.data, filteredJobs: action.payload.data };
    },
    filterJobs: (state, action) => {
      return { ...state, filteredJobs: action.payload.data };
    }
  }
});

export const { setJobs, filterJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
