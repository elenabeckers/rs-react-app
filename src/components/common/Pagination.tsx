interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isVisible: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isVisible,
}: PaginationProps) => {
  return (
    isVisible && (
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
          disabled={currentPage === 1 || currentPage > totalPages}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          {currentPage} / {totalPages}
        </span>
        <button
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
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
