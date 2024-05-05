import { Button, ButtonProps, styled } from '@mui/material';

// * Unlock Referral Button
const UnlockReferralButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: '#4943da',
  marginTop: '10px',
  padding: '9px',
  '&:hover': {
    backgroundColor: '#433ecc'
  },
  color: 'white',
  width: '100%',
  boxShadow: 'none',
  textTransform: 'none',
  borderRadius: '7px',
  fontWeight: '300',
  fontFamily: 'lexend',
  fontSize: '14px'
}));

export default UnlockReferralButton;
