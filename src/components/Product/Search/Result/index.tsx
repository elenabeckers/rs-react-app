import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../../../services/product.types';
import { toggleItem } from '../../../../store/slices/selectedProductsSlice';
import ProductSearchResultCard from './Card';
import NotificationMessage from '../../../common/NotificationMessage';
import {
  FETCH_ERROR_MESSAGE,
  NO_RESULTS_FOUND_MESSAGE,
} from '../../../../constants/errorMessages';
import Loader from '../../../common/Loader';
import SelectedProductsFlyout from '../../SelectedProductsFlyout';
import { RootState } from '../../../../store';
import { selectSearchResults } from '../../../../store/selectors';

interface ProductSearchResultProps {
  error?: string;
}

const ProductSearchResult = ({ error }: ProductSearchResultProps) => {
  const dispatch = useDispatch();

  const selectedProducts = useSelector(
    (state: RootState) => state.selectedProducts.products
  );

  const { isFetching, foundProducts } = useSelector(selectSearchResults);

  const onToggleProduct = (product: Product) => {
    dispatch(toggleItem(product));
  };

  return (
    <div
      className="w-full h-full flex flex-col text-sm text-left text-gray-500"
      data-testid="search-result"
    >
      {isFetching ? (
        <Loader />
      ) : error ? (
        <NotificationMessage title={error} description={FETCH_ERROR_MESSAGE} />
      ) : !foundProducts || foundProducts.length === 0 ? (
        <NotificationMessage description={NO_RESULTS_FOUND_MESSAGE} />
      ) : (
        <ul className="w-full">
          {foundProducts.map((product: Product) => {
            const isSelected = selectedProducts.some(
              (item: Product) => item.id === product.id
            );

            return (
              <ProductSearchResultCard
                key={product.id}
                product={product}
                isSelected={isSelected}
                onToggle={() => onToggleProduct(product)}
              />
            );
          })}
        </ul>
      )}
      <SelectedProductsFlyout />
    </div>
  );
};

export default ProductSearchResult;
