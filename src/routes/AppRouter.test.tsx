import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import AppRouter from './AppRouter';
import { mockProduct } from '../mocks/productMock';
import { renderWithProviders } from '../utils/test-utils';

describe('AppRouter', () => {
  it('redirects to /search/1 on the root path', async () => {
    renderWithProviders(<AppRouter />, { initialEntries: ['/'] });

    await waitFor(() =>
      expect(
        screen.getByPlaceholderText(
          'Search for products like Phones, Laptops...'
        )
      ).toBeInTheDocument()
    );
  });

  it('renders HomePage for /search/:page', async () => {
    renderWithProviders(<AppRouter />, { initialEntries: ['/search/1'] });

    await waitFor(() =>
      expect(
        screen.getByPlaceholderText(
          'Search for products like Phones, Laptops...'
        )
      ).toBeInTheDocument()
    );
  });

  it('renders ProductDetailsPage for /search/:page/details/:productId', async () => {
    renderWithProviders(<AppRouter />, {
      initialEntries: ['/search/1/details/1'],
    });

    await waitFor(() =>
      expect(
        screen.getByText(mockProduct.shippingInformation)
      ).toBeInTheDocument()
    );
  });

  it('renders ErrorPage for unknown paths', async () => {
    renderWithProviders(<AppRouter />, { initialEntries: ['/unknown/path'] });

    await waitFor(() =>
      expect(screen.getByText('404: Page not found')).toBeInTheDocument()
    );
  });
});
