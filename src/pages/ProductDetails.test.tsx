import '@testing-library/jest-dom';
import { renderWithProviders } from '../utils/test-utils';
import ProductDetailsPage from '../pages/ProductDetails';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router';
import { mockProduct } from '../mocks/productMock';
import { FETCH_ERROR_MESSAGE } from '../constants/errorMessages';
import HomePage from './Home';

describe('ProductDetailsPage', () => {
  it('should show loader when data is fetching', async () => {
    renderWithProviders(
      <Routes>
        <Route path="details/:productId" element={<ProductDetailsPage />} />
      </Routes>,
      { initialEntries: ['/details/1'] }
    );
    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });

  it('should display product details when data is fetched successfully', async () => {
    renderWithProviders(
      <Routes>
        <Route path="details/:productId" element={<ProductDetailsPage />} />
      </Routes>,
      { initialEntries: ['/details/1'] }
    );

    await waitFor(() => screen.getByText(mockProduct.title));
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it('should show error message when there is an error', async () => {
    renderWithProviders(
      <Routes>
        <Route path="details/:productId" element={<ProductDetailsPage />} />
      </Routes>,
      { initialEntries: ['/details/2'] }
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    await waitFor(() =>
      expect(screen.getByText(FETCH_ERROR_MESSAGE)).toBeInTheDocument()
    );
  });

  it('should not render the component if productDetailsPage is undefined', () => {
    renderWithProviders(
      <Routes>
        <Route path="details/:productId" element={<ProductDetailsPage />} />
      </Routes>,
      { initialEntries: ['/details/bla'] }
    );
    renderWithProviders(<ProductDetailsPage />);

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByText('No results found.')).not.toBeInTheDocument();
  });

  it('opens product details on product click', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/search/:page?" element={<HomePage />}>
          <Route path="details/:productId" element={<ProductDetailsPage />} />
        </Route>
      </Routes>,
      { initialEntries: ['/search/1'] }
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });

    await act(async () => {
      const productLink = await screen.findByText(mockProduct.title);
      fireEvent.click(productLink);
    });

    await waitFor(() => {
      expect(
        screen.getByText(mockProduct.shippingInformation)
      ).toBeInTheDocument();
    });
  });

  it('closes the product details when the Close button is clicked', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/search/:page?" element={<HomePage />}>
          <Route path="details/:productId" element={<ProductDetailsPage />} />
        </Route>
      </Routes>,
      { initialEntries: ['/search/1/details/1'] }
    );

    expect(screen.getByTestId('product-details')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText('Close'));
    });

    expect(screen.queryByTestId('product-details')).not.toBeInTheDocument();
  });
});
