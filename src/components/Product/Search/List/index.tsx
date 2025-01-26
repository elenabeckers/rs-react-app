import React from 'react';
import { Product } from '../../../../services/product.types';

import ProductSearchListSkeleton from './Skeleton';
import ProductSearchListRow from './Card';
import ProductSearchListNotification from './Notification';

interface ProductSearchListProps {
  products: Product[];
  isLoading: boolean;
  errorMessage: string | null;
}

class ProductSearchList extends React.Component<ProductSearchListProps> {
  render() {
    const { products, isLoading, errorMessage } = this.props;

    return (
      <ul className="w-full h-full flex flex-col text-sm text-left text-gray-500">
        {isLoading ? (
          <ProductSearchListSkeleton />
        ) : errorMessage ? (
          <ProductSearchListNotification
            title={errorMessage}
            description={
              'Oops! It seems there was an unexpected error. Please try again.'
            }
          />
        ) : products.length === 0 ? (
          <ProductSearchListNotification
            description={
              'Oops! Nothing matched your search. Give it another shot.'
            }
          />
        ) : (
          products.map((product) => (
            <ProductSearchListRow key={product.id} product={product} />
          ))
        )}
      </ul>
    );
  }
}

export default ProductSearchList;
