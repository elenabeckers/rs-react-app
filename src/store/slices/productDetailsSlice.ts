import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../services/product.types';
import { productApi } from '../../services/product';

export interface ProductDetailsState {
  isFetching: boolean;
  product: Product | null;
}

const initialState: ProductDetailsState = {
  isFetching: false,
  product: null,
};

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    HYDRATE: (state, action) => ({ ...state, ...action.payload }),
    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.getProductDetails.matchPending,
      (state) => {
        state.isFetching = true;
      }
    );
    builder.addMatcher(
      productApi.endpoints.getProductDetails.matchFulfilled,
      (state, action) => {
        state.isFetching = false;
        state.product = action.payload;
      }
    );
    builder.addMatcher(
      productApi.endpoints.getProductDetails.matchRejected,
      (state) => {
        state.isFetching = false;
      }
    );
  },
});

export const { setProduct } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
