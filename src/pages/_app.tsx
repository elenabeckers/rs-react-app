import '../index.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from '../context/ThemeProvider';
import { wrapper } from '../store';
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/common/ErrorBoundary';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
