import React from 'react';
import ProductSearchSection from '../components/Product/Search/Section';

interface HomePageState {
  isError: boolean;
}

class HomePage extends React.Component<object, HomePageState> {
  state = {
    isError: false,
  };

  onErrorThrow = () => {
    this.setState({
      isError: true,
    });
  };

  render() {
    const { isError } = this.state;

    if (isError) {
      throw new Error('Unexpected ERROR');
    }

    return (
      <div className="max-w-7xl min-h-screen mx-auto py-12 px-10">
        <ProductSearchSection />
        <footer className="text-right py-8">
          <button onClick={this.onErrorThrow}>Throw Error</button>
        </footer>
      </div>
    );
  }
}

export default HomePage;
