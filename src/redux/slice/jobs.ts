import { createSlice } from '@reduxjs/toolkit';

import { JobsState } from '../../types';

const initialState: JobsState = {
  jobs: [],
  filteredJobs: [],
  totalJobs: 0,
  hasMore: true,
  offset: 0,
  limit: 10
};

const jobsSlice = createSlice({
  name: 'jobsSlice',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      return { ...state, jobs: action.payload.data.jdList, filteredJobs: action.payload.data.jdList, totalJobs: action.payload.data.totalCount };
    },
    filterJobs: (state, action) => {
      return { ...state, filteredJobs: action.payload.data };
    },
    addMoreJobs: (state, action) => {
      const _state = { ...state, jobs: [...state.jobs, ...action.payload.data], filteredJobs: [...state.jobs, ...action.payload.data] };
      if (_state.jobs.length < state.totalJobs) {
        return _state;
      } else {
        _state.hasMore = false;
        return _state;
      }
    }
  }
});

export const { setJobs, filterJobs, addMoreJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
