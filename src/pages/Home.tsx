import { Outlet, useNavigate, useParams } from 'react-router';
import { useSearchProductQuery } from '../services/product';
import ProductSearchInput from '../components/Product/Search/Input';
import ProductSearchResult from '../components/Product/Search/Result';
import Pagination from '../components/common/Pagination';
import useSearchQuery from '../hooks/useSearchQuery';
import { useDispatch } from 'react-redux';
import { setData, setPage } from '../store/slices/searchProductSlice';
import { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../constants';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { theme, toggleTheme } = useTheme();
  const [searchQuery, storeSearchQuery] = useSearchQuery();

  const { page } = useParams<{
    page?: string;
  }>();

  const productSearchPage = Number(page);

  const { data, error, isFetching } = useSearchProductQuery(
    {
      searchQuery,
      page: productSearchPage,
    },
    { skip: !searchQuery }
  );

  useEffect(() => {
    dispatch(setData(data));
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setPage(productSearchPage));
  }, [productSearchPage, dispatch]);

  const onSearch = (query: string) => {
    navigate('/search/1');
    storeSearchQuery(query);
  };

  const onPageChange = (page: number) => {
    navigate(`/search/${page}`);
  };

  return (
    <div className="min-h-screen mx-auto pt-14 pb-20 px-10 overflow-auto dark:bg-gray-800 ">
      <div className="fixed top-5 right-5">
        <button onClick={toggleTheme}>
          {theme === Theme.LIGHT ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>

      <header className="w-1/2 mx-auto mb-12">
        <ProductSearchInput
          initialValue={searchQuery}
          onSearch={onSearch}
          isLoading={isFetching}
        />
      </header>
      <main className="flex mx-auto">
        <div className="h-[65vh] w-1/2 overflow-auto flex-1">
          <ProductSearchResult error={error as string | undefined} />
        </div>
        <Outlet />
      </main>
      <Pagination
        isVisible={!isFetching && Boolean(data?.products.length)}
        currentPage={productSearchPage}
        totalPages={data?.totalPages ?? 0}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default HomePage;
