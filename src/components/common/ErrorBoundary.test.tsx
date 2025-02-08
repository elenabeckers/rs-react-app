import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <div>Child Component</div>
        </ErrorBoundary>
      </MemoryRouter>
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

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();
    expect(consoleError).toHaveBeenCalled();
  });
});
