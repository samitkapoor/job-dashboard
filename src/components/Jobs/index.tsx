import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { Box, Grid } from '@mui/material';

import { fetchJobs } from './functions';
import { addMoreJobs, filter, resetJobs, setJobs } from '../../redux/slice/jobs';
import { FiltersState, Job, JobsState, State } from '../../types';
import JobCard from './JobCard';

const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const state: JobsState = useSelector((state: State) => state.jobsSlice);
  const filters: FiltersState = useSelector((state: State) => state.filtersSlice);

  // * Infinite Scroll
  const observer = useRef<IntersectionObserver | null>(null);
  const lastJobEle = useCallback(
    (ele: Element | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && state.hasMore) {
          setOffset((prevOffset) => prevOffset + 12);
        }
      });
      if (ele) observer.current.observe(ele);
    },
    [loading]
  );

  useEffect(() => {
    if (offset != 0)
      (async () => {
        setLoading(true);
        const jobs = await fetchJobs(offset);
        dispatch(addMoreJobs({ data: jobs.jdList }));
        const filterValues: Array<Boolean> = (Object.keys(filters) as Array<keyof FiltersState>).map((key) => filters[key] === '');
        const canLoadMore = filterValues.reduce((load, curr) => load === curr && load === true);
        if (!canLoadMore) {
          dispatch(filter({ filters }));
        } else {
          dispatch(resetJobs());
        }
        setLoading(false);
      })();
  }, [offset]);

  useEffect(() => {
    (async () => {
      const jobs = await fetchJobs();
      dispatch(setJobs({ data: jobs }));
      setLoading(false);
    })();
  }, []);

  return loading && state.filteredJobs.length === 0 ? (
    <Box mt="100px">
      <Oval color="#0c8ce9" width="30" secondaryColor="transparent" strokeWidth={3} />
    </Box>
  ) : state.filteredJobs.length === 0 ? (
    <Box mt="100px" className="gapped-column">
      <img src="icons/not-found.png" height="200px" />
      <p className="bold-text">No Jobs available for this category at the moment</p>
    </Box>
  ) : (
    <Box my="50px" display="flex" flexDirection="column" alignItems={'center'} justifyContent={'center'}>
      <Grid container width="1000px" rowGap="20px">
        {state.filteredJobs.map((job: Job, index: number) =>
          index + 1 === state.filteredJobs.length ? <JobCard refEle={lastJobEle} key={job.jdUid} job={job} /> : <JobCard key={job.jdUid} job={job} />
        )}
      </Grid>
      <Box mt="10px" height="50px">
        {loading && <Oval color="#0c8ce9" width="30" secondaryColor="transparent" strokeWidth={3} />}
      </Box>
    </Box>
  );
};

export default Jobs;
