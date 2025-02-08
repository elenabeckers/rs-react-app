import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductSearchInput from './Input';

describe('ProductSearchInput', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with the initial value', () => {
    render(
      <ProductSearchInput
        initialValue="Laptop"
        onSearch={mockOnSearch}
        isLoading={false}
      />
    );

    expect(
      screen.getByPlaceholderText('Search for products like Phones, Laptops...')
    ).toHaveValue('Laptop');
  });

  it('renders the correct placeholder text', () => {
    render(<ProductSearchInput onSearch={mockOnSearch} isLoading={false} />);

    expect(
      screen.getByPlaceholderText('Search for products like Phones, Laptops...')
    ).toBeInTheDocument();
  });

  it('calls onSearch when search button is clicked', async () => {
    render(<ProductSearchInput onSearch={mockOnSearch} isLoading={false} />);

    const searchInput = screen.getByPlaceholderText(
      'Search for products like Phones, Laptops...'
    );
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Smartphone' } });
    fireEvent.click(searchButton);

    await waitFor(() =>
      expect(mockOnSearch).toHaveBeenCalledWith('Smartphone')
    );
  });

  it('disables input and button when isLoading is true', () => {
    render(<ProductSearchInput onSearch={mockOnSearch} isLoading={true} />);

    const searchInput = screen.getByPlaceholderText(
      'Search for products like Phones, Laptops...'
    );
    const searchButton = screen.getByRole('button', { name: /search/i });

    expect(searchInput).toBeDisabled();
    expect(searchButton).toBeDisabled();
  });

  it('calls onSearch when Enter key is pressed', async () => {
    render(<ProductSearchInput onSearch={mockOnSearch} isLoading={false} />);

    const searchInput = screen.getByPlaceholderText(
      'Search for products like Phones, Laptops...'
    );
    fireEvent.change(searchInput, { target: { value: 'Tablet' } });
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith('Tablet'));
  });
});
