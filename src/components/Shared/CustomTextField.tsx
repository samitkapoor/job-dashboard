import { TextField, TextFieldProps, styled } from '@mui/material';

// * Search Company Name Input Field
const CustomTextField = styled(TextField)<TextFieldProps>(() => ({
  fontWeight: '600',
  fontFamily: 'lexend',
  fontSize: '5px'
}));

export default CustomTextField;
