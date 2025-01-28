import React from 'react';
import HomePage from './pages/Home';
import ErrorBoundary from './components/common/ErrorBoundary';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    );
  }
}

export default App;
