import '@testing-library/jest-dom';
import { renderWithProviders } from '../utils/test-utils';
import HomePage from './Home';
import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Route, Routes } from 'react-router';
import { mockProduct, mockProduct_3 } from '../mocks/productMock';
import { NO_RESULTS_FOUND_MESSAGE } from '../constants/errorMessages';
import { downloadCSV } from '../utils/csvUtils';

jest.mock('../utils/csvUtils', () => ({
  ...jest.requireActual('../utils/csvUtils'),
  downloadCSV: jest.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.setItem('searchQuery', 'saved search query');
  });

  it('loads data and displays Loader on initial load', async () => {
    localStorage.setItem('searchQuery', 'saved search query');
    renderWithProviders(
      <Routes>
        <Route path="/search/:page?" element={<HomePage />} />
      </Routes>,
      { initialEntries: ['/search/1'] }
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    });

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('displays NO_RESULTS_FOUND_MESSAGE message if product is not found', async () => {
    localStorage.setItem('searchQuery', 'empty');
    renderWithProviders(
      <Routes>
        <Route path="/search/:page?" element={<HomePage />} />
      </Routes>,
      { initialEntries: ['/search/1'] }
    );

    await waitFor(() =>
      expect(screen.getByText(NO_RESULTS_FOUND_MESSAGE)).toBeInTheDocument()
    );
  });

  it('restores search query from localStorage on initial load', async () => {
    localStorage.setItem('searchQuery', 'saved search query');

    renderWithProviders(
      <Routes>
        <Route path="/search/:page?" element={<HomePage />} />
      </Routes>,
      { initialEntries: ['/search/1'] }
    );

    await waitFor(() => {
      expect(
        screen.getByDisplayValue('saved search query')
      ).toBeInTheDocument();
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });
  });

  it('stores search query into localStorage on new search', async () => {
    localStorage.setItem('searchQuery', 'saved search query');

    renderWithProviders(
      <Routes>
        <Route path="/search/:page?" element={<HomePage />} />
      </Routes>,
      { initialEntries: ['/search/1'] }
    );

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByRole('button', { name: /search/i });

    //Checking that initial request id finished
    await waitFor(() => {
      expect(
        screen.getByDisplayValue('saved search query')
      ).toBeInTheDocument();
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'new search query' } });
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('new search query')).toBeInTheDocument();
      expect(localStorage.getItem('searchQuery')).toBe('new search query');
    });
  });

  it('search data on Enter Click', async () => {
    localStorage.setItem('searchQuery', 'saved search query');

    renderWithProviders(
      <Routes>
        <Route path="/search/:page?" element={<HomePage />} />
      </Routes>,
      { initialEntries: ['/search/1'] }
    );

    const searchInput = screen.getByTestId('search-input');

    //Checking that initial request id finished
    await waitFor(() => {
      expect(
        screen.getByDisplayValue('saved search query')
      ).toBeInTheDocument();
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'new search query' } });
      fireEvent.keyDown(searchInput, {
        key: 'Enter',
        code: 'Enter',
        charCode: 13,
      });
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue('new search query')).toBeInTheDocument();
      expect(localStorage.getItem('searchQuery')).toBe('new search query');
    });
  });

  it('should switch theme when the button is clicked', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/search/:page?" element={<HomePage />} />
      </Routes>,
      { initialEntries: ['/search/1'] }
    );

    const themeButton = screen.getByText('Dark Mode');
    fireEvent.click(themeButton);

    await waitFor(() => {
      expect(screen.getByText('Light Mode')).toBeInTheDocument();
      expect(screen.getByTestId('theme-container')).toHaveClass('dark');
    });

    fireEvent.click(themeButton);

    await waitFor(() => {
      expect(screen.getByText('Dark Mode')).toBeInTheDocument();
      expect(screen.getByTestId('theme-container')).toHaveClass('light');
    });
  });

  it('renders Selected Products Flyout with selected products', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/search/:page?" element={<HomePage />} />
      </Routes>,
      { initialEntries: ['/search/1'] }
    );

    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    const productCheckboxes = screen.getAllByRole('checkbox');

    fireEvent.click(productCheckboxes[0]);

    expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();
  });

  it('unselects all products when "Unselect all" button is clicked', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/search/:page?" element={<HomePage />} />
      </Routes>,
      { initialEntries: ['/search/1'] }
    );

    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    const productCheckboxes = screen.getAllByRole('checkbox');

    fireEvent.click(productCheckboxes[0]);
    fireEvent.click(productCheckboxes[1]);

    expect(screen.getByText(/2 items are selected/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Unselect all/i));

    expect(screen.queryByText(/items are selected/i)).not.toBeInTheDocument();
  });

  it('calls downloadCSV when "Download" button is clicked', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/search/:page?" element={<HomePage />} />
      </Routes>,
      { initialEntries: ['/search/1'] }
    );

    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    const productCheckboxes = screen.getAllByRole('checkbox');

    fireEvent.click(productCheckboxes[0]);

    expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Download/i));

    expect(downloadCSV).toHaveBeenCalledWith(
      expect.any(String),
      '1_products.csv'
    );
  });

  it('navigates to the next page when clicking the "Next" button', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/search/:page?" element={<HomePage />} />
      </Routes>,
      { initialEntries: ['/search/1'] }
    );

    await waitFor(async () => {
      expect(screen.getByText('Next')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Next'));
    });

    await waitFor(() => {
      expect(screen.getByText(mockProduct_3.title)).toBeInTheDocument();
    });
  });

  it('navigates to the previous page when clicking the "Previous" button', async () => {
    renderWithProviders(
      <Routes>
        <Route path="/search/:page?" element={<HomePage />} />
      </Routes>,
      { initialEntries: ['/search/2'] }
    );

    await waitFor(async () => {
      expect(screen.getByText('Previous')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Previous'));
    });

    await waitFor(() => {
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });
  });
});
