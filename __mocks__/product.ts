import { Product } from '../src/services/product.types';

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

export const mockFewPagesSearchProductResponse = {
  products: [mockProduct, mockProduct_2],
  limit: 1,
  skip: 0,
  total: 2,
};
