import { useState } from 'react';
import { Autocomplete, Box, FormControl, TextField, debounce } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import debouncedFilter from './functions';
import { companyNameId, experienceId, getExperienceOptions, getLocationOptions, locationId, minBasePayId, minBasePayOptions } from './constants';
import { State } from '../../types';
import CustomTextField from '../Shared/CustomTextField';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: State) => state.filtersSlice);
  const [basePayOptions, setBasePayOptions] = useState(minBasePayOptions());
  const [experienceOptions, setExperienceOptions] = useState(getExperienceOptions());
  const [locationOptions, setLocationOptions] = useState(getLocationOptions);

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
      <FormControl className="form-control">
        <Autocomplete
          id={experienceId}
          options={experienceOptions}
          onChange={(event, value) => {
            if (!value) setExperienceOptions(getExperienceOptions());
            debouncedOnChange({ target: { id: experienceId, value: value?.value } });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => {
                const { value } = e.target;
                const temp = getExperienceOptions().filter((option) => option.label.includes(value.toString()));
                setExperienceOptions(temp);
              }}
              label="Experience"
              sx={{ width: '130px' }}
            ></TextField>
          )}
        ></Autocomplete>
      </FormControl>
      <FormControl className="form-control">
        <Autocomplete
          id={locationId}
          options={locationOptions}
          onChange={(event, value) => {
            if (!value) setLocationOptions(getLocationOptions);
            debouncedOnChange({ target: { id: locationId, value: value?.value } });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => {
                const { value } = e.target;
                const temp = getLocationOptions.filter((option) => option.value.includes(value.toLowerCase()));
                setLocationOptions(temp);
              }}
              label="Remote"
              sx={{ width: '130px' }}
            ></TextField>
          )}
        ></Autocomplete>
      </FormControl>
      <CustomTextField id={companyNameId} label="Search Company Name" variant="outlined" onChange={debouncedOnChange}></CustomTextField>
    </Box>
  );
};

export default Filters;
