import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import ProductSearchResult from './index';
import {
  FETCH_ERROR_MESSAGE,
  NO_RESULTS_FOUND_MESSAGE,
} from '../../../../constants/errorMessages';
import { mockSearchProductResponse } from '../../../../../__mocks__/product';

jest.mock('./Card', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Product Card</div>),
}));

describe('ProductSearchResult', () => {
  it('displays loader while loading', () => {
    render(
      <ProductSearchResult products={[]} isLoading={true} errorMessage={null} />
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays error message if there is an error', async () => {
    render(
      <ProductSearchResult
        products={[]}
        isLoading={false}
        errorMessage="Error loading products"
      />
    );

    await waitFor(() =>
      expect(screen.getByText('Error loading products')).toBeInTheDocument()
    );
    expect(screen.getByText(FETCH_ERROR_MESSAGE)).toBeInTheDocument();
  });

  it('displays "no results" message if no products are found', async () => {
    render(
      <ProductSearchResult
        products={[]}
        isLoading={false}
        errorMessage={null}
      />
    );

    await waitFor(() =>
      expect(screen.getByText(NO_RESULTS_FOUND_MESSAGE)).toBeInTheDocument()
    );
  });

  it('renders the correct number of product cards', async () => {
    render(
      <ProductSearchResult
        products={mockSearchProductResponse.products}
        isLoading={false}
        errorMessage={null}
      />
    );

    await waitFor(() =>
      expect(screen.getAllByText('Product Card')).toHaveLength(2)
    );
  });
});
