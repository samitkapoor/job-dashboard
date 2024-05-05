import { Button, ButtonProps, styled } from '@mui/material';

const UnlockReferralButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: '#4943da',
  marginTop: '10px',
  padding: '8px',
  '&:hover': {
    backgroundColor: '#433ecc'
  },
  color: 'white',
  width: '100%',
  boxShadow: 'none'
}));

export default UnlockReferralButton;
