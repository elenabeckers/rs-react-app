import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './index.css';
import ErrorBoundary from './components/common/ErrorBoundary';
import AppRouter from './routes/AppRouter';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.VITE_BASENAME}>
        <AppRouter />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
