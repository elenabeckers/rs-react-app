import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectSearchProduct = (state: RootState) => state.searchProduct;
export const selectProductDetails = (state: RootState) => state.productDetails;

export const selectSearchResults = createSelector(
  [selectSearchProduct],
  (searchProduct) => ({
    foundProducts: searchProduct.data?.products,
  })
);

export const selectSearchResultPagination = createSelector(
  [selectSearchProduct],
  (searchProduct) => ({
    totalPages: searchProduct.data?.totalPages ?? 0,
    isProductsEmpty: !searchProduct.data?.products.length,
  })
);

export const selectedProductDetail = createSelector(
  [selectProductDetails],
  (productDetails) => ({
    isFetching: productDetails.isFetching,
    productDetails: productDetails.product,
  })
);
