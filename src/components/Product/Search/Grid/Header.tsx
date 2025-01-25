import React from 'react';

class ProductSearchGridHeader extends React.Component {
  render() {
    return (
      <thead className="text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="w-1/4 px-6 py-6">
            Product name
          </th>
          <th scope="col" className="w-3/4 px-6 py-6">
            Product description
          </th>
        </tr>
      </thead>
    );
  }
}

export default ProductSearchGridHeader;
