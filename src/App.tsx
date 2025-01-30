import HomePage from './pages/Home';
import ErrorBoundary from './components/common/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    <HomePage />
  </ErrorBoundary>
);

export default App;
