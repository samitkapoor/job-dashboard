import { useEffect } from 'react';

import { fetchJobs } from './functions';
import { useDispatch } from 'react-redux';
import { setJobs } from '../../redux/slice/jobs';

const Jobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const jobs = await fetchJobs();
      dispatch(setJobs({ data: jobs.jdList }));
    })();
  });

  return <div>Jobs</div>;
};

export default Jobs;
