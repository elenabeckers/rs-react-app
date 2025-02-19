import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchProductResponseDTO } from '../../services/product.types';
import { productApi } from '../../services/product';

interface SearchProductState {
  searchQuery: string;
  page: number;
  isFetching: boolean;
  data?: SearchProductResponseDTO;
}

const initialState: SearchProductState = {
  searchQuery: '',
  page: 1,
  isFetching: false,
  data: undefined,
};

const searchProductSlice = createSlice({
  name: 'searchProducts',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setData: (
      state,
      action: PayloadAction<SearchProductResponseDTO | undefined>
    ) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.searchProduct.matchPending,
      (state) => {
        state.isFetching = true;
      }
    );
    builder.addMatcher(
      productApi.endpoints.searchProduct.matchFulfilled,
      (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
      }
    );
    builder.addMatcher(
      productApi.endpoints.searchProduct.matchRejected,
      (state) => {
        state.isFetching = false;
      }
    );
  },
});

export const { setSearchQuery, setPage, setData } = searchProductSlice.actions;
export default searchProductSlice.reducer;
