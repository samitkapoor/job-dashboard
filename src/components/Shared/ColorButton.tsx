import { Button, ButtonProps, styled } from '@mui/material';

const ColorButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: '#55efc4',
  marginTop: 20,
  '&:hover': {
    backgroundColor: '#4fe2b9'
  },
  color: 'black'
}));

export default ColorButton;