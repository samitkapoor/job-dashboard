import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FallingLines } from 'react-loader-spinner';
import { Avatar, Box, Grid, capitalize } from '@mui/material';

import { fetchJobs } from './functions';
import { setJobs } from '../../redux/slice/jobs';
import { Job, JobsState } from '../../types';
import { CURRENCY } from './constants';

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
        {state.filteredJobs.map((job: Job) => {
          console.log(job.salaryCurrencyCode);
          let estimatedSalary = 'Estimated Salary: ';
          if (job.minJdSalary && job.maxJdSalary) {
            estimatedSalary += `${CURRENCY[job.salaryCurrencyCode]}${job.minJdSalary} - ${CURRENCY[job.salaryCurrencyCode]}${job.maxJdSalary}`;
          } else if (job.minJdSalary) {
            estimatedSalary += `${CURRENCY[job.salaryCurrencyCode]}${job.minJdSalary}`;
          } else if (job.maxJdSalary) {
            estimatedSalary += `${CURRENCY[job.salaryCurrencyCode]}${job.maxJdSalary}`;
          }

          return (
            <Grid
              item
              key={job.jdUid}
              xs={6}
              md={3}
              display="flex"
              borderRadius={3}
              flexDirection="column"
              alignItems="start"
              justifyContent="center"
              p={2}
              sx={{ border: '1px solid #b3b3b3' }}
            >
              <Box display="flex" width={'100%'} gap="3px" alignItems="start">
                <Avatar sx={{ bgcolor: 'transparent', marginTop: '3px' }} variant="square">
                  <img src={job.logoUrl} height="35px" />
                </Avatar>
                <Box display="flex" gap="2px" flexDirection="column" p={1}>
                  <p className="short-text faded">{capitalize(job.companyName)}</p>
                  <p className="short-text">{capitalize(job.jobRole)}</p>
                  <p className="short-text">{capitalize(job.location)}</p>
                </Box>
              </Box>
              <p className="short-text faded">{estimatedSalary}</p>
              <Box my="7px"></Box>
              <h4>About Company:</h4>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Jobs;
