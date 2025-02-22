import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import type { RootState } from '../store';
import { setupStore } from '../store';
import { configureStore } from '@reduxjs/toolkit/react';
import { ThemeProvider } from '../context/ThemeProvider';
import { MemoryRouter } from 'react-router';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
  initialEntries?: string[];
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    initialEntries = ['/'],
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <ThemeProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={initialEntries}>
            {children}
          </MemoryRouter>
        </Provider>
      </ThemeProvider>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
