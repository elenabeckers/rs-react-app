import { Outlet, useNavigate, useParams } from 'react-router';
import { useSearchProductQuery } from '../services/product';
import ProductSearchInput from '../components/Product/Search/Input';
import ProductSearchResult from '../components/Product/Search/Result';
import Pagination from '../components/common/Pagination';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { useDispatch } from 'react-redux';
import { setData, setPage } from '../store/slices/searchProductSlice';
import { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Theme } from '../constants';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();
  const [searchQuery, storeSearchQuery] = useSearchQuery();

  const { page } = useParams<{
    page?: string;
  }>();

  const productSearchPage = page ? Number(page) : 1;

  const { data, error } = useSearchProductQuery(
    {
      searchQuery,
      page: productSearchPage,
    },
    { skip: searchQuery === undefined }
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

  return (
    <div className="min-h-screen mx-auto pt-14 pb-20 px-10 overflow-auto dark:bg-gray-800 ">
      <div className="fixed top-5 right-5">
        <button onClick={toggleTheme}>
          {theme === Theme.LIGHT ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>

      <header className="w-1/2 mx-auto mb-12">
        <ProductSearchInput initialValue={searchQuery} onSearch={onSearch} />
      </header>
      <main className="flex mx-auto">
        <div className="h-[65vh] w-1/2 overflow-auto flex-1">
          <ProductSearchResult error={error as string | undefined} />
        </div>
        <Outlet />
      </main>
      <Pagination />
    </div>
  );
};

export default HomePage;
