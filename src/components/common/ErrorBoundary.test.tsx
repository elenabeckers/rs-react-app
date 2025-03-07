import { screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { renderWithProviders } from 'src/utils/test-utils';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    renderWithProviders(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders ErrorPage when an error is thrown', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const ErrorComponent = () => {
      throw new Error('Test error');
    };

    renderWithProviders(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(consoleError).toHaveBeenCalled();
  });
});
