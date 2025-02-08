import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import ProductDetailsPage from '../pages/ProductDetails';
import { getProductDetails } from '../services/product';

import {
  NO_RESULTS_FOUND_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from '../constants/errorMessages';

import { mockProduct } from '../../__mocks__/product';

jest.mock('../services/product', () => ({
  getProductDetails: jest.fn(),
}));

describe('ProductDetailsPage', () => {
  it('displays loader and loads product details', async () => {
    (getProductDetails as jest.Mock).mockResolvedValue(mockProduct);

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => expect(getProductDetails).toHaveBeenCalledWith(1));

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
  });

  it('displays an error message when there is a loading error', async () => {
    (getProductDetails as jest.Mock).mockRejectedValue(
      new Error('Loading error')
    );

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText('Loading error')).toBeInTheDocument()
    );
  });

  it("displays 'no results' message if product is not found", async () => {
    (getProductDetails as jest.Mock).mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(NO_RESULTS_FOUND_MESSAGE)).toBeInTheDocument()
    );
  });

  it('displays UNKNOWN_ERROR_MESSAGE when there is an unknown error', async () => {
    (getProductDetails as jest.Mock).mockRejectedValue('Unknown error');

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(UNKNOWN_ERROR_MESSAGE)).toBeInTheDocument()
    );
  });
});
