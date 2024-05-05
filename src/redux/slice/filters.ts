import { createSlice } from '@reduxjs/toolkit';

import { FiltersState } from '../../types';

const initialState: FiltersState = {
  companyName: '',
  minBasePay: 0,
  experience: 0
};

const filtersSlice = createSlice({
  name: 'filtersSlice',
  initialState,
  reducers: {
    setCompanyName: (state, action) => {
      return { ...state, companyName: action.payload.data };
    },
    setMinBasePay: (state, action) => {
      return { ...state, minBasePay: action.payload.data };
    },
    setExperience: (state, action) => {
      return { ...state, experience: action.payload.data };
    }
  }
});

export const { setCompanyName, setMinBasePay, setExperience } = filtersSlice.actions;
export default filtersSlice.reducer;
