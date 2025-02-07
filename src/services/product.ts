import { Product, SearchProductsResponse } from './product.types';
import { request } from './request';

const API_URL: string = import.meta.env.VITE_API_URL;

export const ITEMS_DISPLAY_LIMIT: number = 10;

export async function searchProducts(
  searchQuery: string,
  page: number,
  limit: number | undefined = ITEMS_DISPLAY_LIMIT
): Promise<SearchProductsResponse> {
  const skip = (page - 1) * limit;

  return await request<SearchProductsResponse>(
    `${API_URL}/products/search?q=${encodeURIComponent(searchQuery)}&limit=${limit}&skip=${skip}`
  );
}

export async function getProductDetails(productId: number): Promise<Product> {
  return await request<Product>(
    `${API_URL}/products/${encodeURIComponent(productId)}`
  );
}
