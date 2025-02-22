import { Product } from '../services/product.types';

export const mockProduct: Product = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  description:
    'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
  thumbnail:
    'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  images: [
    'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png',
  ],
  category: 'beauty',
  price: 9.99,
  rating: 4.94,
  stock: 5,
  warrantyInformation: '1 month warranty',
  shippingInformation: 'Ships in 1 month',
  returnPolicy: '30 days return policy',
};

export const mockProduct_2: Product = {
  id: 2,
  title: 'Eyeshadow Palette with Mirror',
  description:
    "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
  thumbnail:
    'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png',
  images: [
    'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png',
  ],
  category: 'beauty',
  price: 9.99,
  rating: 4.94,
  stock: 5,
  warrantyInformation: '1 month warranty',
  shippingInformation: 'Ships in 1 month',
  returnPolicy: '30 days return policy',
};

export const mockProduct_3: Product = {
  id: 3,
  title: 'Powder Canister',
  description:
    'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.',
  thumbnail:
    'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png',
  images: [
    'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png',
  ],
  category: 'beauty',
  price: 14.99,
  rating: 3.82,
  stock: 59,
  warrantyInformation: '2 year warranty',
  shippingInformation: 'Ships in 1-2 business days',
  returnPolicy: '60 days return policy',
};

export const mockSearchProductResponse = {
  products: [mockProduct, mockProduct_2],
  limit: 10,
  skip: 0,
  total: 2,
};

export const mockEmptySearchProductResponse = {
  products: [],
  limit: 10,
  skip: 0,
  total: 0,
};

export const mockFirstPageSearchProductResponse = {
  products: [mockProduct, mockProduct_2],
  limit: 10,
  skip: 0,
  total: 11,
};

export const mockSecondPageSearchProductResponse = {
  products: [mockProduct_3],
  limit: 10,
  skip: 10,
  total: 11,
};
