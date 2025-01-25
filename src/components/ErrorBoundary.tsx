import React, { ErrorInfo, ReactNode } from 'react';
import ErrorPage from '../pages/ErrorPage';

interface ErrorBoundaryProps {
  children?: ReactNode;
}
interface ErrorBoundaryState {
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {};

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo.componentStack);
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <ErrorPage errorTitle={error.message} returnUrl={'/'} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
