import React from 'react';
import { Product } from '../../../../services/product.types';

interface ProductSearchGridRowProps {
  product: Product;
}

class ProductSearchGridRow extends React.Component<ProductSearchGridRowProps> {
  render() {
    const { product } = this.props;

    return (
      <tr key={product.id} className="odd:bg-white even:bg-gray-50">
        <th className="w-1/4 px-6 py-6">{product.title}</th>
        <td className="w-3/4 px-6 py-6">{product.description}</td>
      </tr>
    );
  }
}

export default ProductSearchGridRow;
