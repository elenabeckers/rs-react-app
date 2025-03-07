import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import type { RootState } from '../store';
import { setupStore } from '../store';
import { configureStore } from '@reduxjs/toolkit/react';
import { ThemeProvider } from '../context/ThemeProvider';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof configureStore>;
  url?: string;
}

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    url = '/',
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <MemoryRouterProvider url={url}>
        <ThemeProvider>
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </MemoryRouterProvider>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
