import { useState } from 'react';
import { Autocomplete, Box, TextField, debounce } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import debouncedFilter from './functions';
import {
  companyNameId,
  experienceId,
  rolesId,
  getExperienceOptions,
  getLocationOptions,
  locationId,
  minBasePayId,
  minBasePayOptions,
  getRolesOptions
} from './constants';
import { State } from '../../types';
import CustomTextField from '../Shared/CustomTextField';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: State) => state.filtersSlice);
  const [basePayOptions, setBasePayOptions] = useState(minBasePayOptions());
  const [experienceOptions, setExperienceOptions] = useState(getExperienceOptions());
  const [locationOptions, setLocationOptions] = useState(getLocationOptions);

  // * Execute the filter query after the user has stopped typing
  const debouncedOnChange = debounce((e) => {
    debouncedFilter(e, dispatch, filters);
  }, 200);

  return (
    <Box mt="100px" display="flex" flexWrap="wrap" gap="10px" alignItems="center">
      {/* // * Select Roles Dropdown */}
      <Autocomplete
        multiple
        onChange={(event, value) => {
          console.log(value);
          debouncedOnChange({ target: { id: rolesId, value: value } });
        }}
        id={rolesId}
        options={getRolesOptions}
        renderInput={(params) => <TextField {...params} variant="outlined" label="Roles" sx={{ minWidth: '100px' }}></TextField>}
      ></Autocomplete>
      {/* // * Minimum Base Pay Salary */}
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
            sx={{ minWidth: '240px' }}
          ></TextField>
        )}
      ></Autocomplete>
      {/* // * Experience Level */}
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
            sx={{ minWidth: '130px' }}
          ></TextField>
        )}
      ></Autocomplete>
      {/* // * Location - Remote, In-office */}
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
            sx={{ minWidth: '130px' }}
          ></TextField>
        )}
      ></Autocomplete>
      {/* // * Company Name */}
      <CustomTextField id={companyNameId} label="Search Company Name" variant="outlined" onChange={debouncedOnChange}></CustomTextField>
    </Box>
  );
};

export default Filters;
