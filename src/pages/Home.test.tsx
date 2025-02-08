import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import {
  mockEmptySearchProductResponse,
  mockProduct,
  mockSearchProductResponse,
} from '../../__mocks__/product';
import { getProductDetails, searchProducts } from '../services/product';
import ProductDetailsPage from './ProductDetails';
import HomePage from './Home';
import {
  NO_RESULTS_FOUND_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
} from '../constants/errorMessages';

import { useNavigate } from 'react-router';

jest.mock('../services/product', () => ({
  getProductDetails: jest.fn().mockResolvedValue(mockProduct),
  searchProducts: jest.fn().mockResolvedValue(mockSearchProductResponse),
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

describe('HomePage', () => {
  it('displays loader while loads products and hide loader', async () => {
    (searchProducts as jest.Mock).mockResolvedValue(mockSearchProductResponse);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => expect(searchProducts).toHaveBeenCalledWith('', 1));

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();

    mockSearchProductResponse.products.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });

  it('displays an error message when there is a loading error', async () => {
    (searchProducts as jest.Mock).mockRejectedValue(new Error('Loading error'));

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText('Loading error')).toBeInTheDocument()
    );
  });

  it('displays NO_RESULTS_FOUND_MESSAGE message if product is not found', async () => {
    (searchProducts as jest.Mock).mockResolvedValue(
      mockEmptySearchProductResponse
    );

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(NO_RESULTS_FOUND_MESSAGE)).toBeInTheDocument()
    );
  });

  it('displays UNKNOWN_ERROR_MESSAGE when there is an unknown error', async () => {
    (searchProducts as jest.Mock).mockRejectedValue('Unknown error');

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(UNKNOWN_ERROR_MESSAGE)).toBeInTheDocument()
    );
  });

  it('navigates to product details on product click', async () => {
    (searchProducts as jest.Mock).mockResolvedValue(mockSearchProductResponse);

    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="/search/:page?" element={<HomePage />}>
            <Route path="details/:productId" element={<ProductDetailsPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await act(async () => {
      expect(searchProducts).toHaveBeenCalled();
    });

    await act(async () => {
      const productLink = await screen.findByText(mockProduct.title);
      fireEvent.click(productLink);
    });

    await act(async () => {
      expect(getProductDetails).toHaveBeenCalled();
    });
  });

  it('closes the details when the Close button is clicked', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (searchProducts as jest.Mock).mockResolvedValue(mockSearchProductResponse);
    (getProductDetails as jest.Mock).mockResolvedValue(mockProduct);

    render(
      <MemoryRouter initialEntries={['/search/1/details/1']}>
        <Routes>
          <Route path="/search/:page?" element={<HomePage />}>
            <Route path="details/:productId" element={<ProductDetailsPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Close')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText('Close'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/search/1');
  });

  it('pagination updates URL query parameter when page changes', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (searchProducts as jest.Mock).mockResolvedValue(mockSearchProductResponse);

    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Next')).toBeInTheDocument());

    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/search/2');
  });
});
