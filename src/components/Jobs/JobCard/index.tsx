import { Avatar, Box, Grid, capitalize } from '@mui/material';

import { Job } from '../../../types';
import { CURRENCY } from '../constants';
import ApplyButton from '../../Shared/ApplyButton';
import UnlockReferralButton from '../../Shared/UnlockReferralButton';
import PeopleDecor from './components/PeopleDecor';

// * Each job card on the dashboard
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
        {/* // * Top most header of card, including Company logo, role, name, location */}
        <Box display="flex" width={'100%'} gap="3px" alignItems="start">
          <Avatar sx={{ bgcolor: 'transparent', marginTop: '4px' }} variant="square">
            <img src={job.logoUrl} height="35px" />
          </Avatar>
          <Box display="flex" gap="2px" flexDirection="column" p={1}>
            <p className="short-text faded">{capitalize(job.companyName)}</p>
            <p className="short-text">{capitalize(job.jobRole)}</p>
            <p className="short-text">{capitalize(job.location)}</p>
          </Box>
        </Box>
        {/* // * Estimated Salary */}
        <p className="short-text faded">{estimatedSalary} LPA ✅</p>
        {/* // * Empty Space */}
        <Box my="7px"></Box>
        {/* // * About Company */}
        <h3>About Company:</h3>
        {/* // * About us */}
        <p className="short-text extra-bold-text">About us</p>
        {/* // * Job Details, view job button */}
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
        {/* // * Minimum Experience */}
        <Box display="flex" flexDirection="column" gap="3px" mt="20px">
          <p className="short-text faded">Minimum Experience</p>
          <p className="short-text">{(job.minExp || 0) + ' years'}</p>
        </Box>
        {/* // * Easy Apply Button */}
        <ApplyButton variant="contained">⚡ Easy Apply</ApplyButton>
        {/* // * Unlock Referral Button */}
        <UnlockReferralButton variant="contained" startIcon={<PeopleDecor />}>
          Unlock referral asks
        </UnlockReferralButton>
      </Box>
    </Grid>
  );
};

export default JobCard;
