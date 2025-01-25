import React from 'react';

interface ProductSearchGridSkeletonProps {
  rowCount?: number;
}

const DEFAULT_ROW_COUNT: number = 3;

class ProductSearchGridSkeleton extends React.Component<ProductSearchGridSkeletonProps> {
  render() {
    const { rowCount } = this.props;

    return Array.from({ length: rowCount ?? DEFAULT_ROW_COUNT }).map(
      (_, index) => (
        <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
          <th className="animate-pulse w-1/4 px-6 py-6">
            <div className="h-2.5 bg-gray-400 rounded-full"></div>
          </th>
          <td className="animate-pulse w-3/4 px-6 py-6">
            <div className="h-2.5 mb-3 bg-gray-300 rounded-full"></div>
            <div className=" h-2.5 bg-gray-300 rounded-full"></div>
          </td>
        </tr>
      )
    );
  }
}

export default ProductSearchGridSkeleton;
