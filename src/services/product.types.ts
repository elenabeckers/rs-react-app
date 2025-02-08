export interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  category: string;
  price: number;
  rating: number;
  stock: number;
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
}

export interface SearchProductsResponse {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
}
