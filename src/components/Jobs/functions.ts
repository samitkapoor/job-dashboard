import axios from 'axios';

import { JOBS_URL } from './constants';

// * Fetch Jobs from API
export const fetchJobs = async (offset = 0, limit = 10) => {
  try {
    const body = JSON.stringify({
      limit,
      offset
    });

    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(JOBS_URL, body, options);

    return data;
  } catch (err) {
    throw err;
  }
};
