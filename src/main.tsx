import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import UncontrolledForm from './pages/UncontrolledForm.tsx';
import ReactHookForm from './pages/ReactHookForm.tsx';
import { Provider } from 'react-redux';
import { store } from './store';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="/react-hook-form" element={<ReactHookForm />} />
          <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
