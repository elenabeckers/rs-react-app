import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setData } from '../store/slices/searchProductSlice';
import { productApi } from '../services/product';
import ProductSearchInput from '../components/Product/Search/Input';
import ProductSearchResult from '../components/Product/Search/Result';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../constants';
import ProductDetailsPage from '../components/Product/Details';
import Pagination from '../components/common/Pagination';
import { GetServerSideProps } from 'next';
import { wrapper } from '../store/index';
import { SearchProductResponseDTO } from '../services/product.types';

interface SearchPageProps {
  searchProduct: SearchProductResponseDTO | null;
}

const SearchPage = ({ searchProduct = null }: SearchPageProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { query, productId } = router.query;

  const { theme, toggleTheme } = useTheme();
  const [searchQuery, storeSearchQuery] = useSearchQuery();

  useEffect(() => {
    if (query === undefined && searchQuery !== undefined) {
      router.push(`/?query=${searchQuery}&page=1`);
    }
  }, [searchQuery, query, router]);

  const onSearch = (query: string) => {
    router.push(`/?query=${query}&page=1`);
    storeSearchQuery(query);
  };

  useEffect(() => {
    if (searchProduct) {
      dispatch(setData(searchProduct));
    }
  }, [searchProduct, dispatch]);

  return (
    <div className="min-h-screen mx-auto pt-14 pb-20 px-10 overflow-auto dark:bg-gray-800">
      <div className="fixed top-5 right-5">
        <button onClick={toggleTheme}>
          {theme === Theme.LIGHT ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>

      <header className="w-1/2 mx-auto mb-12">
        <ProductSearchInput onSearch={onSearch} initialValue={searchQuery} />
      </header>
      <main className="flex mx-auto">
        <div className="h-[65vh] w-1/2 overflow-auto flex-1">
          <ProductSearchResult />
        </div>
        {productId && <ProductDetailsPage />}
      </main>
      <Pagination />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const page = query.page ? Number(query.page) : 1;
    const searchQuery = (query.query as string) || '';

    const searchProduct = await store.dispatch(
      productApi.endpoints.searchProduct.initiate({ searchQuery, page })
    );

    const productDetails = query.productId
      ? await store.dispatch(
          productApi.endpoints.getProductDetails.initiate(
            Number(query.productId as string)
          )
        )
      : null;

    return {
      props: {
        searchProduct: searchProduct.data ?? null,
        productDetails: productDetails?.data ?? null,
      },
    };
  });

export default SearchPage;
