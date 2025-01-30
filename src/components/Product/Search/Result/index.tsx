import { Product } from '../../../../services/product.types';

import ProductSearchResultSkeleton from './Skeleton';
import ProductSearchResultCard from './Card';
import NotificationMessage from '../../../common/NotificationMessage';

import {
  FETCH_ERROR_MESSAGE,
  NO_RESULTS_FOUND_MESSAGE,
} from '../../../../constants/errorMessages';

interface ProductSearchResultProps {
  products: Product[];
  isLoading: boolean;
  errorMessage: string | null;
}

const ProductSearchResult = ({
  products,
  isLoading,
  errorMessage,
}: ProductSearchResultProps) => (
  <ul className="w-full h-full flex flex-col text-sm text-left text-gray-500">
    {isLoading ? (
      <ProductSearchResultSkeleton />
    ) : errorMessage ? (
      <NotificationMessage
        title={errorMessage}
        description={FETCH_ERROR_MESSAGE}
      />
    ) : products.length === 0 ? (
      <NotificationMessage description={NO_RESULTS_FOUND_MESSAGE} />
    ) : (
      products.map((product) => (
        <ProductSearchResultCard key={product.id} product={product} />
      ))
    )}
  </ul>
);

export default ProductSearchResult;
