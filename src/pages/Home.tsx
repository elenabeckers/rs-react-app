import React from 'react';
import { searchProducts } from '../services/product';
import { Product } from '../services/product.types';
import ProductSearchInput from '../components/Product/Search/Input';
import ProductSearchResult from '../components/Product/Search/Result';

interface HomePageState {
  isThrowError: boolean;
  products: Product[];
  isLoading: boolean;
  fetchErrorMessage: string | null;
}

class HomePage extends React.Component<object, HomePageState> {
  state = {
    isThrowError: false,
    products: [],
    isLoading: false,
    fetchErrorMessage: null,
  };

  onErrorThrow = () => {
    this.setState({
      isThrowError: true,
    });
  };

  onSearch = async (searchTerm: string): Promise<void> => {
    try {
      this.setState({ isLoading: true, fetchErrorMessage: null });
      const searchResponse = await searchProducts(searchTerm.trim());
      this.setState({
        products: searchResponse.products,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        products: [],
        fetchErrorMessage:
          error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    }
  };

  render() {
    const { isThrowError, isLoading, products, fetchErrorMessage } = this.state;

    if (isThrowError) {
      throw new Error('Unexpected ERROR');
    }

    return (
      <div className="max-w-7xl min-h-screen mx-auto py-12 px-10">
        <header className="w-2/4 mx-auto mb-12">
          <ProductSearchInput onSearch={this.onSearch} isLoading={isLoading} />
        </header>
        <main className="max-w-7xl h-[500px] mx-auto border overflow-auto">
          <ProductSearchResult
            products={products}
            isLoading={isLoading}
            errorMessage={fetchErrorMessage}
          />
        </main>
        <footer className="text-right py-8">
          <button onClick={this.onErrorThrow}>Throw Error</button>
        </footer>
      </div>
    );
  }
}

export default HomePage;
