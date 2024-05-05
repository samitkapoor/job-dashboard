import { createSlice } from '@reduxjs/toolkit';

import { FiltersState } from '../../types';

const initialState: FiltersState = {
  companyName: ''
};

const filtersSlice = createSlice({
  name: 'filtersSlice',
  initialState,
  reducers: {
    setCompanyName: (state, action) => {
      return { ...state, companyName: action.payload.data };
    }
  }
});

export const { setCompanyName } = filtersSlice.actions;
export default filtersSlice.reducer;
