import { Routes, Route, Navigate } from 'react-router';
import HomePage from '../pages/Home';
import ProductDetailsPage from '../pages/ProductDetails';
import ErrorPage from '../pages/Error';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/search/1" replace />} />
      <Route path="/search/:page?" element={<HomePage />}>
        <Route path="details/:productId" element={<ProductDetailsPage />} />
      </Route>

      <Route
        path="*"
        element={<ErrorPage errorTitle={'404: Page not found'} />}
      />
    </Routes>
  );
};

export default AppRouter;
