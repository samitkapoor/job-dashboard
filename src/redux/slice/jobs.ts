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
        totalJobs: action.payload.data.totalCount,
        offset: 0
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

      let filtersApplied = false;

      for (let key of Object.keys(filters)) {
        if (!filters[key] || filters[key] === '' || (typeof filters[key] === 'object' && filters[key].length === 0)) continue;
        else filtersApplied = true;
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

      // * If filters are applied show filtered data,
      // * if filters are not applied and length of jobs fetched till now is less than 100 then show jobs
      if (filtersApplied || filteredJobs.length < 100) {
        return { ...state, filteredJobs };
      }
      // * If filters are removed and jobs length is greater than 100, then reset the state
      // * Data might be too much for redux to crash.
      else {
        return { ...state, filteredJobs: [], offset: state.totalJobs + 1 };
      }
    },
    resetJobs: (state) => {
      return { ...state, filteredJobs: state.jobs };
    },
    increaseOffset: (state) => {
      return { ...state, offset: state.offset + 12 };
    }
  }
});

export const { setJobs, filterJobs, addMoreJobs, filter, resetJobs, increaseOffset } = jobsSlice.actions;
export default jobsSlice.reducer;
