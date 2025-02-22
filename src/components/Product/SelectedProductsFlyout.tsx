import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../store/slices/selectedProductsSlice';
import { RootState } from '../../store';
import { convertProductsToCSV, downloadCSV } from '../../utils/csvUtils';

const SelectedProductsFlyout = () => {
  const dispatch = useDispatch();

  const selectedProducts = useSelector(
    (state: RootState) => state.selectedProducts.products
  );

  if (selectedProducts.length === 0) return null;

  const onClearAll = () => {
    dispatch(clearAll());
  };

  const onSave = () => {
    downloadCSV(
      convertProductsToCSV(selectedProducts),
      `${selectedProducts.length}_products.csv`
    );
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:border-t p-4 flex justify-center items-center
     gap-4"
    >
      <span className="text-base text-gray-700 dark:text-gray-200">
        {selectedProducts.length} items are selected
      </span>
      <div>
        <button
          className="mr-2 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
          onClick={onClearAll}
        >
          Unselect all
        </button>
        <button onClick={onSave}>Download</button>
      </div>
    </div>
  );
};

export default SelectedProductsFlyout;
