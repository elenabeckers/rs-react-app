import React from 'react';
import { Product } from '../../../../services/product.types';

import ProductSearchGridSkeleton from './Skeleton';
import ProductSearchGridHeader from './Header';
import ProductSearchGridRow from './Row';
import ProductSearchGridNotification from './Notification';

interface ProductSearchGridProps {
  products: Product[];
  isLoading: boolean;
  errorMessage: string | null;
}

class ProductSearchGrid extends React.Component<ProductSearchGridProps> {
  render() {
    const { products, isLoading, errorMessage } = this.props;

    return (
      <table className="w-full h-full text-sm text-left text-gray-500">
        <ProductSearchGridHeader />
        <tbody>
          {isLoading ? (
            <ProductSearchGridSkeleton />
          ) : errorMessage ? (
            <ProductSearchGridNotification
              title={errorMessage}
              description={
                'Oops! It seems there was an unexpected error. Please try again.'
              }
            />
          ) : products.length === 0 ? (
            <ProductSearchGridNotification
              description={
                'Oops! Nothing matched your search. Give it another shot.'
              }
            />
          ) : (
            products.map((product) => (
              <ProductSearchGridRow key={product.id} product={product} />
            ))
          )}
        </tbody>
      </table>
    );
  }
}

export default ProductSearchGrid;
