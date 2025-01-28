import React from 'react';
import { Product } from '../../../../services/product.types';

import ProductSearchResultSkeleton from './Skeleton';
import ProductSearchResultCard from './Card';
import NotificationMessage from '../../../common/NotificationMessage';

interface ProductSearchResultProps {
  products: Product[];
  isLoading: boolean;
  errorMessage: string | null;
}

class ProductSearchResult extends React.Component<ProductSearchResultProps> {
  render() {
    const { products, isLoading, errorMessage } = this.props;

    return (
      <ul className="w-full h-full flex flex-col text-sm text-left text-gray-500">
        {isLoading ? (
          <ProductSearchResultSkeleton />
        ) : errorMessage ? (
          <NotificationMessage
            title={errorMessage}
            description={
              'Oops! It seems there was an unexpected error. Please try again.'
            }
          />
        ) : products.length === 0 ? (
          <NotificationMessage
            description={
              'Oops! Nothing matched your search. Give it another shot.'
            }
          />
        ) : (
          products.map((product) => (
            <ProductSearchResultCard key={product.id} product={product} />
          ))
        )}
      </ul>
    );
  }
}

export default ProductSearchResult;
