import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FallingLines } from 'react-loader-spinner';
import { Box, Grid } from '@mui/material';

import { fetchJobs } from './functions';
import { setJobs } from '../../redux/slice/jobs';
import { Job, JobsState } from '../../types';
import JobCard from './JobCard';

const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const state: JobsState = useSelector((state: { jobsSlice: JobsState }) => state.jobsSlice);

  useEffect(() => {
    (async () => {
      const jobs = await fetchJobs();
      dispatch(setJobs({ data: jobs.jdList }));
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
      <Grid container justifyContent={'center'} columns={{ xs: 4, sm: 8, md: 12 }} rowGap={5} columnGap={4}>
        {state.filteredJobs.map((job: Job) => (
          <JobCard key={job.jdUid} job={job} />
        ))}
      </Grid>
    </Box>
  );
};

export default Jobs;
