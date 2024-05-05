import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { Box, Grid } from '@mui/material';

import { fetchJobs } from './functions';
import { addMoreJobs, filter, increaseOffset, resetJobs, setJobs } from '../../redux/slice/jobs';
import { FiltersState, Job, JobsState, State } from '../../types';
import JobCard from './JobCard';

// * Job cards in Job Dashboard
const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // * Jobs
  const state: JobsState = useSelector((state: State) => state.jobsSlice);
  // * Filters
  const filters: FiltersState = useSelector((state: State) => state.filtersSlice);

  // * Infinite Scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const lastJobEle = useCallback(
    (ele: Element | null) => {
      // * If data is being fetched from the API, we don't want to call the API again
      if (loading) return;
      // * Data is loaded and now we want to watch the new last element
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && state.hasMore) {
          // * On changing the offset, more data is fetched from the API
          dispatch(increaseOffset());
        }
      });
      if (ele) observer.current.observe(ele);
    },
    [loading]
  );

  // * Load more data whenever the offset is changed
  useEffect(() => {
    (async () => {
      if (state.offset != 0) {
        setLoading(true);
        const jobs = await fetchJobs(state.offset);
        dispatch(addMoreJobs({ data: jobs.jdList }));
        // * Are any filters set?
        const filterValues: Array<Boolean> = (Object.keys(filters) as Array<keyof FiltersState>).map(
          (key) => filters[key] === '' || filters[key] === undefined
        );
        const isNotFilter = filterValues.reduce((load, curr) => load === curr && load === true);
        console.log({ isNotFilter, offset: state.offset });
        if (!isNotFilter) {
          // * Filters are set, we need to filter the data
          dispatch(filter({ filters }));
        } else if (state.offset > state.totalJobs && isNotFilter) {
          // * Reset state if the filters are not applied and offset is increased.
          const jobs = await fetchJobs();
          dispatch(setJobs({ data: jobs }));
        } else {
          // * Filters are not set yet
          dispatch(resetJobs());
        }
        // * Loading is complete
        setLoading(false);
      } else {
        // * Initially we just want to load and display the data
        const jobs = await fetchJobs();
        dispatch(setJobs({ data: jobs }));
        setLoading(false);
      }
    })();
  }, [state.offset]);

  return loading && state.filteredJobs.length === 0 ? (
    // * Loading, and no jobs in our store, so just show a loading icon
    <Box mt="100px">
      <Oval color="#0c8ce9" width="30" secondaryColor="transparent" strokeWidth={3} />
    </Box>
  ) : state.filteredJobs.length === 0 ? (
    // * Not loading and no jobs, so we just show No jobs available
    <Box mt="100px" className="gapped-column">
      <img src="icons/not-found.png" height="200px" />
      <p className="bold-text">No Jobs available for this category at the moment</p>
    </Box>
  ) : (
    // * Not loading and jobs are available
    <Box my="50px" display="flex" flexDirection="column" alignItems={'center'} justifyContent={'center'}>
      <Grid container sx={{ width: { sx: '500px', md: '1000px' } }} rowGap="20px">
        {state.filteredJobs.map((job: Job, index: number) =>
          index + 1 === state.filteredJobs.length ? <JobCard refEle={lastJobEle} key={job.jdUid} job={job} /> : <JobCard key={job.jdUid} job={job} />
        )}
      </Grid>
      <Box mt="10px" height="50px">
        {/* // * Have jobs and still loading more (Infinite Scroll Feedback) */}
        {loading && <Oval color="#0c8ce9" width="30" secondaryColor="transparent" strokeWidth={3} />}
      </Box>
    </Box>
  );
};

export default Jobs;
