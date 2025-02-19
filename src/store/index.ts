import { configureStore } from '@reduxjs/toolkit';
import selectedProductsSliceReducer from './slices/selectedProductsSlice';
import searchProductReducer from './slices/searchProductSlice';
import productDetailsReducer from './slices/productDetailsSlice';
import { productApi } from '../services/product';

export const store = configureStore({
  reducer: {
    selectedProducts: selectedProductsSliceReducer,
    searchProduct: searchProductReducer,
    productDetails: productDetailsReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
