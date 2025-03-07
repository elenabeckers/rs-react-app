import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import selectedProductsSliceReducer from './slices/selectedProductsSlice';
import searchProductReducer from './slices/searchProductSlice';
import productDetailsReducer from './slices/productDetailsSlice';
import { productApi } from '../services/product';

const rootReducer = combineReducers({
  selectedProducts: selectedProductsSliceReducer,
  searchProduct: searchProductReducer,
  productDetails: productDetailsReducer,
  [productApi.reducerPath]: productApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
  });
};

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

//export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
export const wrapper = createWrapper<AppStore>(makeStore);
