import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectSearchProduct = (state: RootState) => state.searchProduct;

export const selectSearchResults = createSelector(
  [selectSearchProduct],
  (searchProduct) => ({
    isFetching: searchProduct.isFetching,
    foundProducts: searchProduct.data?.products,
  })
);

export const selectSearchResultPagination = createSelector(
  [selectSearchProduct],
  (searchProduct) => ({
    isFetching: searchProduct.isFetching,
    currentPage: searchProduct.page,
    totalPages: searchProduct.data?.totalPages ?? 0,
    isProductsEmpty: !searchProduct.data?.products.length,
  })
);

export const selectSearchInput = createSelector(
  [selectSearchProduct],
  (searchProduct) => ({
    isFetching: searchProduct.isFetching,
  })
);
