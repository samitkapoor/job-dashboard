import { createSlice } from '@reduxjs/toolkit';

import { JobsState } from '../../types';
import { companyNameId, experienceId, locationId, minBasePayId, rolesId } from '../../components/Filters/constants';

const initialState: JobsState = {
  jobs: [],
  filteredJobs: [],
  totalJobs: 0,
  hasMore: true,
  offset: 0,
  limit: 10
};

// * All operations related to jobs including filters are stored in this slice
const jobsSlice = createSlice({
  name: 'jobsSlice',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      return {
        ...state,
        jobs: action.payload.data.jdList || [], // * Empty array handles the case when API throw an error and no jobs are fetched
        filteredJobs: action.payload.data.jdList || [],
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
        // * We have fetched all the jobs the API had to offer, so don't fetch more jobs
        _state.hasMore = false;
        return _state;
      }
    },
    // * Filters
    filter: (state, action) => {
      const { filters } = action.payload;

      let filteredJobs = state.jobs;

      for (let key of Object.keys(filters)) {
        if (!filters[key] || filters[key] === '') continue;
        if (key === companyNameId) {
          filteredJobs = filteredJobs.filter((job) => job.companyName.toLowerCase().includes(filters[key].toLowerCase()));
        } else if (key === minBasePayId) {
          filteredJobs = filteredJobs.filter((job) => job.minJdSalary && job.minJdSalary >= filters[key]);
        } else if (key === experienceId) {
          filteredJobs = filteredJobs.filter((job) => job.minExp && job.minExp <= filters[key]);
        } else if (key === locationId) {
          filteredJobs = filteredJobs.filter(
            (job) => job.location && (filters[key] === 'remote' ? job.location === 'remote' : job.location !== 'remote')
          );
        } else if (key === rolesId) {
          filteredJobs = filteredJobs.filter((job) => {
            for (let i = 0; i < filters[key].length; i++) {
              if (filters[key][i].toLowerCase() === job.jobRole) {
                return true;
              }
            }

            return false;
          });
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
