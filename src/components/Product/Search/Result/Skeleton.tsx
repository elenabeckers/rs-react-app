import React from 'react';
import SkeletonImage from '../../../common/Skeleton/Image';
import SkeletonString from '../../../common/Skeleton/String';
import SkeletonList from '../../../common/Skeleton/List';

interface ProductSearchResultSkeletonProps {
  rowCount?: number;
}

class ProductSearchResultSkeleton extends React.Component<ProductSearchResultSkeletonProps> {
  render() {
    return (
      <SkeletonList className="flex justify-start items-center odd:bg-white even:bg-gray-50 px-7 py-4">
        <SkeletonImage />
        <div className="w-full p-5">
          <SkeletonString className="bg-gray-300" />
          <SkeletonString className="max-w-[480px] mb-2.5" />
          <SkeletonString className="max-w-[360px]" />
        </div>
      </SkeletonList>
    );
  }
}

export default ProductSearchResultSkeleton;
