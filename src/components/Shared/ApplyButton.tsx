import { Button, ButtonProps, styled } from '@mui/material';

const ApplyButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: '#55efc4',
  marginTop: 20,
  '&:hover': {
    backgroundColor: '#4fe2b9'
  },
  color: 'black',
  width: '100%',
  textTransform: 'none',
  borderRadius: '7px'
}));

export default ApplyButton;
