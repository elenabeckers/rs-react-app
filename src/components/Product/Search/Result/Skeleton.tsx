import React from 'react';
import SkeletonImage from '../../../common/Skeleton/Image';
import SkeletonString from '../../../common/Skeleton/String';

interface ProductSearchResultSkeletonProps {
  rowCount?: number;
}

const DEFAULT_ROW_COUNT: number = 3;

class ProductSearchResultSkeleton extends React.Component<ProductSearchResultSkeletonProps> {
  render() {
    const { rowCount } = this.props;

    return Array.from({ length: rowCount ?? DEFAULT_ROW_COUNT }).map(
      (_, index) => (
        <li
          key={index}
          role="status"
          className="flex justify-start items-center odd:bg-white even:bg-gray-50 px-7 py-4"
        >
          <SkeletonImage />
          <div className="w-full p-5">
            <SkeletonString className="bg-gray-300" />
            <SkeletonString className="max-w-[480px] mb-2.5" />
            <SkeletonString className="max-w-[360px]" />
          </div>
        </li>
      )
    );
  }
}

export default ProductSearchResultSkeleton;
