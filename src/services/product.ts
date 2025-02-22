import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Product,
  SearchProductResponse,
  SearchProductResponseDTO,
} from './product.types';
import { API_URL, ITEMS_DISPLAY_LIMIT } from '../constants';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    searchProduct: builder.query<
      SearchProductResponseDTO,
      { searchQuery?: string; page: number }
    >({
      query: ({ searchQuery = '', page }) => {
        const skip = (page - 1) * ITEMS_DISPLAY_LIMIT;
        return `products/search?q=${encodeURIComponent(searchQuery)}&limit=${ITEMS_DISPLAY_LIMIT}&skip=${skip}`;
      },
      transformResponse: (
        response: SearchProductResponse
      ): SearchProductResponseDTO => {
        return {
          products: response.products,
          skip: response.skip,
          totalPages: Math.ceil(response.total / ITEMS_DISPLAY_LIMIT),
        };
      },
      transformErrorResponse: (error) => {
        if ('status' in error) {
          return `Error ${error.status}: Something went wrong`;
        }
        return 'Network error or server unreachable';
      },
    }),
    getProductDetails: builder.query<Product, number>({
      query: (productId) => `products/${encodeURIComponent(productId)}`,
      transformErrorResponse: (error) => {
        if ('status' in error) {
          return `Error ${error.status}: Failed to fetch product details`;
        }
        return 'Network error or server unreachable';
      },
    }),
  }),
});

export const { useSearchProductQuery, useGetProductDetailsQuery } = productApi;
