import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../services/product.types';
import { productApi } from '../../services/product';

interface ProductDetailsState {
  productId?: number;
  isFetching: boolean;
  product?: Product;
}

const initialState: ProductDetailsState = {
  productId: undefined,
  isFetching: false,
  product: undefined,
};

const searchProductSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    setProductId: (state, action: PayloadAction<number>) => {
      state.productId = action.payload;
    },
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

export const { setProductId, setProduct } = searchProductSlice.actions;
export default searchProductSlice.reducer;
