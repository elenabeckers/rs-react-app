import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import ProductSearchResultCard from './Card';
import { mockProduct } from '../../../../../__mocks__/product';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigation: () => ({ state: 'loading' }),
}));

describe('ProductSearchResultCard', () => {
  it('renders product details correctly', () => {
    render(
      <MemoryRouter>
        <ProductSearchResultCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: mockProduct.title })
    ).toHaveAttribute('src', mockProduct.thumbnail);
  });

  it('navigates to the product details page on click', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={<ProductSearchResultCard product={mockProduct} />}
          />
          <Route path="details/:id" element={<div>Product details page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const productLink = screen.getByText(mockProduct.title);
    fireEvent.click(productLink);

    expect(screen.getByText('Product details page')).toBeInTheDocument();
  });

  it('applies the correct class when isActive is true', () => {
    render(
      <MemoryRouter initialEntries={['/search/1/details/1']}>
        <Routes>
          <Route
            path="/search/1"
            element={<ProductSearchResultCard product={mockProduct} />}
          >
            <Route
              path="details/:id"
              element={<div>Product details page</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByText(mockProduct.title);

    expect(link).toHaveClass('text-blue-600 font-normal underline');
  });
});
