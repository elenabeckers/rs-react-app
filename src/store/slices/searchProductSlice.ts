import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchProductResponseDTO } from '../../services/product.types';

export interface SearchProductState {
  page: number;
  data: SearchProductResponseDTO | null;
  error: string | null;
}

const initialState: SearchProductState = {
  page: 1,
  data: null,
  error: null,
};

const searchProductSlice = createSlice({
  name: 'searchProducts',
  initialState,
  reducers: {
    HYDRATE: (state, action) => {
      return { ...state, ...action.payload };
    },
    setData: (
      state,
      action: PayloadAction<SearchProductResponseDTO | undefined>
    ) => {
      state.data = action.payload ?? null;
    },
  },
});

export const { setData } = searchProductSlice.actions;
export default searchProductSlice.reducer;
