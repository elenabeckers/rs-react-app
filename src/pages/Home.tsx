import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { ITEMS_DISPLAY_LIMIT, searchProducts } from '../services/product';
import { Product } from '../services/product.types';
import ProductSearchInput from '../components/Product/Search/Input';
import ProductSearchResult from '../components/Product/Search/Result';
import { UNKNOWN_ERROR_MESSAGE } from '../constants/errorMessages';
import Pagination from '../components/common/Pagination';
import useSearchQuery from '../hooks/useSearchQuery';

const HomePage = () => {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPaginationVisible, setIsPaginationVisible] =
    useState<boolean>(false);

  const [searchQuery, storeSearchQuery] = useSearchQuery();
  const [totalItems, setTotalItems] = useState<number>(0);

  const [products, setProducts] = useState<Product[]>([]);

  const { page, productId } = useParams<{
    page?: string;
    productId?: string;
  }>();
  const currentPage = page ? parseInt(page, 10) : 1;

  useEffect(() => {
    const fetchSearchProducts = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const searchResponse = await searchProducts(searchQuery, currentPage);
        const { skip, total, products } = searchResponse;

        if (skip > total) {
          navigateRef.current('/search/1');
          return;
        }

        setIsPaginationVisible(true);
        setTotalItems(total);
        setProducts(products);
      } catch (error) {
        setProducts([]);
        setIsPaginationVisible(false);
        setTotalItems(0);
        setErrorMessage(
          error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchProducts();
  }, [currentPage, searchQuery]);

  const onPageChange = (page: number) => {
    navigate(`/search/${page}`);
  };

  const onSearch = (query: string) => {
    navigate(`/search/1`);
    storeSearchQuery(query);
    setIsPaginationVisible(false);
  };

  const closeDetails = () => navigate(`/search/${currentPage}`);

  return (
    <div className="min-h-screen mx-auto py-12 px-10">
      <header className="w-1/2 mx-auto mb-12">
        <ProductSearchInput
          initialValue={searchQuery}
          onSearch={onSearch}
          isLoading={isLoading}
        />
      </header>
      <main className="flex mx-auto">
        <div
          className="h-[70vh] w-1/2 overflow-auto flex-1"
          onClick={closeDetails}
        >
          <ProductSearchResult
            products={products}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </div>
        {productId && (
          <div className="w-1/2 relative bg-gray-100">
            <button className="absolute top-4 right-6" onClick={closeDetails}>
              Close
            </button>
            <Outlet />
          </div>
        )}
      </main>
      <Pagination
        isVisible={isPaginationVisible}
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / ITEMS_DISPLAY_LIMIT)}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default HomePage;
