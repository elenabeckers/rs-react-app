import React from 'react';
import { Product } from '../../../../services/product.types';

interface ProductSearchResultCardProps {
  product: Product;
}

class ProductSearchResultCard extends React.Component<ProductSearchResultCardProps> {
  render() {
    const { product } = this.props;

    return (
      <li className="px-6 flex odd:bg-white even:bg-gray-50">
        <img
          height="150"
          width="150"
          src={product.thumbnail}
          alt={product.title}
        />
        <div className="flex flex-col justify-center px-8">
          <p className="text-xl text-gray-900 mb-2">{product.title}</p>
          <p className="">{product.description}</p>
        </div>
      </li>
    );
  }
}

export default ProductSearchResultCard;
