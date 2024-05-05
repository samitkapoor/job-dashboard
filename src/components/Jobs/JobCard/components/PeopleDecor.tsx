import { Avatar, Box } from '@mui/material';

import { peopleImageLinks } from './constants';

// * Blurred images of online users in Unlock Referral asks button
const PeopleDecor = () => {
  return (
    <Box display="flex" gap="10px">
      {peopleImageLinks.map((link) => (
        <Box height="22px" width="22px" position="relative">
          <Avatar sx={{ height: '22px', width: '22px' }}>
            <img className="blur" src={link} height="22px" width="22px" />
          </Avatar>
          <Box position="absolute" bottom="0px" right="0px" className="online-dot"></Box>
        </Box>
      ))}
    </Box>
  );
};

export default PeopleDecor;
