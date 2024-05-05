import { Box, TextField, debounce } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import debouncedFilter from './functions';
import { companyNameId } from './constants';
import { State } from '../../types';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: State) => state.filtersSlice);

  const debouncedOnChange = debounce((e) => {
    debouncedFilter(e, dispatch, filters);
  }, 200);

  return (
    <Box mt="100px" display="flex" flexWrap="wrap" gap="10px" alignItems="center">
      <TextField id={companyNameId} label="Search Company Name" variant="outlined" onChange={debouncedOnChange}></TextField>
    </Box>
  );
};

export default Filters;
