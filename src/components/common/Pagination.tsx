import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectSearchResultPagination } from '../../store/selectors';

const Pagination = () => {
  const navigate = useNavigate();

  const { isFetching, currentPage, totalPages, isProductsEmpty } = useSelector(
    selectSearchResultPagination
  );

  const onPageChange = (page: number) => {
    navigate(`/search/${page}`);
  };

  return (
    !isFetching &&
    !isProductsEmpty && (
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-600"
          disabled={currentPage === 1 || currentPage > totalPages}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-sm font-medium dark:text-gray-100">
          {currentPage} / {totalPages}
        </span>
        <button
          className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100 hover:bg-gray-300  dark:hover:bg-gray-700 disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-600"
          disabled={currentPage === totalPages || currentPage > totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    )
  );
};

export default Pagination;
