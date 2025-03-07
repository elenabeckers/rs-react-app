import { render, screen, fireEvent } from '@testing-library/react';
import AsyncButton from './AsyncButton';

describe('AsyncButton', () => {
  it('renders the button with children when not loading', () => {
    render(<AsyncButton isLoading={false}>Click Me</AsyncButton>);

    expect(screen.getByText('Click Me')).toBeInTheDocument();

    expect(screen.queryByTestId('button-loader')).toBeNull();
  });

  it('renders the loading spinner when loading', () => {
    render(<AsyncButton isLoading={true}>Click Me</AsyncButton>);

    expect(screen.getByTestId('button-loader')).toBeInTheDocument();

    expect(screen.queryByText('Click Me')).toBeNull();
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(
      <AsyncButton isLoading={false} onClick={handleClick}>
        Click Me
      </AsyncButton>
    );

    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom class names', () => {
    render(
      <AsyncButton isLoading={false} className="custom-class">
        Click Me
      </AsyncButton>
    );

    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('min-w-20');
    expect(button).toHaveClass('custom-class');
  });

  it('does not display spinner when not loading', () => {
    render(<AsyncButton isLoading={false}>Submit</AsyncButton>);

    const button = screen.getByText('Submit');
    expect(button).toBeInTheDocument();

    expect(screen.queryByTestId('button-loader')).toBeNull();
  });
});
