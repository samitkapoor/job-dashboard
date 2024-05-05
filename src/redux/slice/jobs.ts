import { createSlice } from '@reduxjs/toolkit';

import { JobsState } from '../../types';
import { companyNameId, minBasePayId } from '../../components/Filters/constants';

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
      return {
        ...state,
        jobs: action.payload.data.jdList,
        filteredJobs: action.payload.data.jdList,
        totalJobs: action.payload.data.totalCount
      };
    },
    filterJobs: (state, action) => {
      return { ...state, filteredJobs: action.payload.data };
    },
    addMoreJobs: (state, action) => {
      const _state = { ...state, jobs: [...state.jobs, ...action.payload.data], filteredJobs: [...state.jobs, ...action.payload.data] };
      if (_state.jobs.length < state.totalJobs) {
        _state.hasMore = true;
        return _state;
      } else {
        _state.hasMore = false;
        return _state;
      }
    },
    // * Filters
    filter: (state, action) => {
      const { filters } = action.payload;

      let filteredJobs = state.jobs;

      for (let key of Object.keys(filters)) {
        switch (key) {
          case companyNameId:
            filteredJobs = filteredJobs.filter((job) => job.companyName.toLowerCase().includes(filters[key].toLowerCase()));
            break;
          case minBasePayId:
            filteredJobs = filteredJobs.filter((job) => job.minJdSalary && job.minJdSalary >= filters[key]);
            break;
        }
      }
      return { ...state, filteredJobs };
    },
    resetJobs: (state) => {
      return { ...state, filteredJobs: state.jobs };
    }
  }
});

export const { setJobs, filterJobs, addMoreJobs, filter, resetJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
