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

export interface SearchProductResponse {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
}

export interface SearchProductResponseDTO {
  products: Product[];
  skip: number;
  totalPages: number;
}
