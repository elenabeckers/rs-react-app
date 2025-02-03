import { SearchProductsResponse } from './product.types';
import { request } from './request';

const API_URL: string = import.meta.env.VITE_API_URL;

const ITEMS_DISPLAY_LIMIT: number = 10;

export async function searchProducts(
  searchQuery: string,
  limit: number | undefined = ITEMS_DISPLAY_LIMIT
): Promise<SearchProductsResponse> {
  return await request<SearchProductsResponse>(
    `${API_URL}/products/search?q=${encodeURIComponent(searchQuery)}&limit=${limit}`
  );
}
