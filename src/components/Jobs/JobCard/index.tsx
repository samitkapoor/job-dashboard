import { Avatar, Box, Grid, capitalize } from '@mui/material';

import { Job } from '../../../types';
import { CURRENCY } from '../constants';
import ColorButton from '../../Shared/ColorButton';

const JobCard = (props: { job: Job }) => {
  const { job } = props;

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
      xs={6}
      md={3}
      width="100px"
      display="flex"
      borderRadius={3}
      flexDirection="column"
      alignItems="start"
      justifyContent="center"
      p={2}
      className="job-card-item"
      sx={{ maxWidth: '50px', width: '100%' }}
      overflow={'hidden'}
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
      <h3>About Company:</h3>
      <p className="short-text extra-bold-text">About us</p>
      <Box className="layer-box">
        <Box className="end-layer">
          <p className="short-text">{job.jobDetailsFromCompany}</p>
        </Box>
        <Box className="fade-layer"></Box>
        <Box className="front-layer">
          <a href={job.jdLink} target="_blank">
            View job
          </a>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap="3px" mt="20px">
        <p className="short-text faded">Minimum Experience</p>
        <p className="short-text">{(job.minExp || 0) + ' years'}</p>
      </Box>
      <ColorButton className="apply-btn" variant="contained">
        ⚡ Easy Apply
      </ColorButton>
    </Grid>
  );
};

export default JobCard;
