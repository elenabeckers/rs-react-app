import { useState } from 'react';
import { searchProducts } from '../services/product';
import { Product } from '../services/product.types';
import ProductSearchInput from '../components/Product/Search/Input';
import ProductSearchResult from '../components/Product/Search/Result';
import {
  UNKNOWN_ERROR_MESSAGE,
  USER_GENERATED_ERROR_MESSAGE,
} from '../constants/errorMessages';

const HomePage = () => {
  const [isThrowError, setIsThrowError] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchErrorMessage, setFetchErrorMessage] = useState<string | null>(
    null
  );

  const onErrorThrow = () => setIsThrowError(true);

  const onSearch = async (searchQuery: string): Promise<void> => {
    try {
      setIsLoading(true);
      setFetchErrorMessage(null);

      const searchResponse = await searchProducts(searchQuery.trim());
      setProducts(searchResponse.products);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setProducts([]);
      setFetchErrorMessage(
        error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
      );
    }
  };

  if (isThrowError) {
    throw new Error(USER_GENERATED_ERROR_MESSAGE);
  }

  return (
    <div className="max-w-7xl min-h-screen mx-auto py-12 px-10">
      <header className="w-2/4 mx-auto mb-12">
        <ProductSearchInput onSearch={onSearch} isLoading={isLoading} />
      </header>
      <main className="max-w-7xl h-[500px] mx-auto border overflow-auto">
        <ProductSearchResult
          products={products}
          isLoading={isLoading}
          errorMessage={fetchErrorMessage}
        />
      </main>
      <footer className="text-right py-8">
        <button onClick={onErrorThrow}>Throw Error</button>
      </footer>
    </div>
  );
};

export default HomePage;
