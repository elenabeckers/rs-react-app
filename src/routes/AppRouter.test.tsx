import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AppRouter from './AppRouter';

import {
  mockProduct,
  mockSearchProductResponse,
} from '../../__mocks__/product';

import { getProductDetails, searchProducts } from '../services/product';

jest.mock('../services/product', () => ({
  getProductDetails: jest.fn(),
  searchProducts: jest.fn(),
}));

describe('AppRouter', () => {
  it('redirects to /search/1 on the root path', async () => {
    (searchProducts as jest.Mock).mockResolvedValue(mockSearchProductResponse);

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByPlaceholderText(
          'Search for products like Phones, Laptops...'
        )
      ).toBeInTheDocument()
    );
  });

  it('renders HomePage for /search/:page', async () => {
    (searchProducts as jest.Mock).mockResolvedValue(mockSearchProductResponse);

    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByPlaceholderText(
          'Search for products like Phones, Laptops...'
        )
      ).toBeInTheDocument()
    );
  });

  it('renders ProductDetailsPage for /search/:page/details/:productId', async () => {
    (getProductDetails as jest.Mock).mockResolvedValue(mockProduct);

    render(
      <MemoryRouter initialEntries={['/search/1/details/10']}>
        <AppRouter />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText(mockProduct.shippingInformation)
      ).toBeInTheDocument()
    );
  });

  it('renders ErrorPage for unknown paths', async () => {
    render(
      <MemoryRouter initialEntries={['/unknown/path']}>
        <AppRouter />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('404: Page not found')).toBeInTheDocument()
    );
  });
});
