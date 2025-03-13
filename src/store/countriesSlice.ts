import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { countries } from '../const';

const initialState = { countries };

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const selectCountries = (state: RootState) => state.countries.countries;
export default countriesSlice.reducer;
