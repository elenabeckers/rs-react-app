import React from 'react';

import { searchProducts } from '../../../services/product';
import { Product } from '../../../services/product.types';

import ProductSearchInput from '../../../components/Product/Search/Input';
import ProductSearchList from './List';

interface ProductSearchSectionState {
  products: Product[];
  isLoading: boolean;
  errorMessage: string | null;
}

class ProductSearchSection extends React.Component<
  object,
  ProductSearchSectionState
> {
  state = {
    products: [],
    isLoading: false,
    errorMessage: null,
  };

  onSearch = async (searchTerm: string): Promise<void> => {
    try {
      this.setState({ isLoading: true, errorMessage: null });
      const searchResponse = await searchProducts(searchTerm.trim());
      this.setState({
        products: searchResponse.products,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        products: [],
        errorMessage:
          error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    }
  };

  render() {
    const { isLoading, products, errorMessage } = this.state;

    return (
      <section className="w-full">
        <header className="w-2/4 mx-auto mb-12">
          <ProductSearchInput onSearch={this.onSearch} isLoading={isLoading} />
        </header>
        <main className="max-w-7xl h-[500px] mx-auto border overflow-auto">
          <ProductSearchList
            products={products}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </main>
      </section>
    );
  }
}

export default ProductSearchSection;
