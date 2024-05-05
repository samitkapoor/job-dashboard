import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { companyNameId, experienceId, minBasePayId } from './constants';
import { filter, resetJobs } from '../../redux/slice/jobs';
import { setCompanyName, setMinBasePay, setExperience } from '../../redux/slice/filters';
import { FiltersState } from '../../types';

const debouncedFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, dispatch: Dispatch<UnknownAction>, filters: FiltersState) => {
  const { id, value } = e?.target;

  switch (id) {
    case companyNameId:
      dispatch(setCompanyName({ data: value }));
      break;
    case minBasePayId:
      dispatch(setMinBasePay({ data: value }));
      break;
    case experienceId:
      dispatch(setExperience({ data: value }));
      break;
    default:
      dispatch(resetJobs());
      break;
  }

  const _filters = {
    ...filters,
    [id]: value
  };

  dispatch(filter({ filters: _filters }));
};

export default debouncedFilter;
