import { useState } from 'react';
import { Autocomplete, Box, FormControl, TextField, debounce } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import debouncedFilter from './functions';
import { companyNameId, minBasePayId, minBasePayOptions } from './constants';
import { State } from '../../types';
import CustomTextField from '../Shared/CustomTextField';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: State) => state.filtersSlice);
  const [basePayOptions, setBasePayOptions] = useState(minBasePayOptions());

  const debouncedOnChange = debounce((e) => {
    debouncedFilter(e, dispatch, filters);
  }, 200);

  return (
    <Box mt="100px" display="flex" flexWrap="wrap" gap="10px" alignItems="center">
      <FormControl className="form-control">
        <Autocomplete
          id={minBasePayId}
          options={basePayOptions}
          onChange={(event, value) => {
            if (!value) setBasePayOptions(minBasePayOptions());
            debouncedOnChange({ target: { id: minBasePayId, value: value?.value } });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => {
                const { value } = e.target;
                const temp = minBasePayOptions().filter((option) => option.label.toLowerCase().includes(value.toLowerCase()));
                setBasePayOptions(temp);
              }}
              label="Minimum Base Pay Salary"
              sx={{ width: '240px' }}
            ></TextField>
          )}
        ></Autocomplete>
      </FormControl>
      <CustomTextField id={companyNameId} label="Search Company Name" variant="outlined" onChange={debouncedOnChange}></CustomTextField>
    </Box>
  );
};

export default Filters;
