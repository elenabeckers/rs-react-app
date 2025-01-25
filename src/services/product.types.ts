export interface Product {
  id: number;
  title: string;
  description: string;
}

export interface SearchProductsResponse {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
}
