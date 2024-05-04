import { Button, ButtonProps, styled } from '@mui/material';
import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: '#55efc4',
  marginTop: 20,
  '&:hover': {
    backgroundColor: '#4fe2b9'
  }
}));

export default ColorButton;
