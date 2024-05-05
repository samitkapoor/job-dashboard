import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FallingLines } from 'react-loader-spinner';
import { Box, Grid } from '@mui/material';

import { fetchJobs } from './functions';
import { addMoreJobs, setJobs } from '../../redux/slice/jobs';
import { Job, JobsState } from '../../types';
import JobCard from './JobCard';

const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const state: JobsState = useSelector((state: { jobsSlice: JobsState }) => state.jobsSlice);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastJobEle = useCallback(
    (ele: Element | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('hello');
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
        const jobs = await fetchJobs(offset);
        dispatch(addMoreJobs({ data: jobs.jdList }));
      })();
  }, [offset]);

  useEffect(() => {
    (async () => {
      const jobs = await fetchJobs();
      dispatch(setJobs({ data: jobs }));
      setLoading(false);
    })();
  }, []);

  return loading ? (
    <div>
      <FallingLines color="#0c8ce9" width="50" />
    </div>
  ) : state.filteredJobs.length === 0 ? (
    <div className="gapped-column">
      <img src="icons/not-found.png" height="200px" />
      <p className="bold-text">No Jobs available for this category at the moment</p>
    </div>
  ) : (
    <Box>
      <Grid container rowGap="20px">
        {state.filteredJobs.map((job: Job, index: number) =>
          index + 1 === state.filteredJobs.length ? <JobCard refEle={lastJobEle} key={job.jdUid} job={job} /> : <JobCard key={job.jdUid} job={job} />
        )}
      </Grid>
    </Box>
  );
};

export default Jobs;
