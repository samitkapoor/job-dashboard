import { Avatar, Box, Grid, capitalize } from '@mui/material';

import { Job } from '../../../types';
import { CURRENCY } from '../constants';
import ApplyButton from '../../Shared/ApplyButton';
import UnlockReferralButton from '../../Shared/UnlockReferralButton';

const JobCard = (props: { job: Job; refEle?: (ele: Element) => void }) => {
  const { job, refEle } = props;

  let estimatedSalary = 'Estimated Salary: ';
  if (job.minJdSalary && job.maxJdSalary) {
    estimatedSalary += `${CURRENCY[job.salaryCurrencyCode]}${job.minJdSalary} - ${CURRENCY[job.salaryCurrencyCode]}${job.maxJdSalary}`;
  } else if (job.minJdSalary) {
    estimatedSalary += `${CURRENCY[job.salaryCurrencyCode]}${job.minJdSalary}`;
  } else if (job.maxJdSalary) {
    estimatedSalary += `${CURRENCY[job.salaryCurrencyCode]}${job.maxJdSalary}`;
  }

  return (
    <Grid item xs={12} sm={4} md={4} lg={4} display="flex" alignItems="center" justifyContent="center">
      <Box className="job-card-item" ref={refEle}>
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
        <p className="short-text faded">{estimatedSalary} LPA ✅</p>
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
        <ApplyButton variant="contained">⚡ Easy Apply</ApplyButton>
        <UnlockReferralButton
          variant="contained"
          startIcon={
            <Box display="flex" gap="10px">
              <Box height="25px" width="25px" position="relative">
                <Avatar sx={{ height: '25px', width: '25px' }}>
                  <img
                    className="blur"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww"
                    height="25px"
                    width="25px"
                  />
                </Avatar>
                <Box position="absolute" bottom="0px" right="0px" className="online-dot"></Box>
              </Box>
              <Box height="25px" width="25px" position="relative">
                <Avatar sx={{ height: '25px', width: '25px' }}>
                  <img
                    className="blur"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
                    height="25px"
                    width="25px"
                  />
                </Avatar>
                <Box position="absolute" bottom="0px" right="0px" className="online-dot"></Box>
              </Box>
            </Box>
          }
        >
          Unlock referral asks
        </UnlockReferralButton>
      </Box>
    </Grid>
  );
};

export default JobCard;
