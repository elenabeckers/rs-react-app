import { ButtonHTMLAttributes, ReactNode } from 'react';

interface AsyncButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
}

const AsyncButton = ({
  isLoading,
  children,
  className = '',
  ...props
}: AsyncButtonProps) => (
  <button {...props} className={`min-w-20 text-center ${className}`}>
    {isLoading ? (
      <div className="m-auto animate-spin border-solid border-t-2 border-white rounded-full w-5 h-5" />
    ) : (
      children
    )}
  </button>
);

export default AsyncButton;
