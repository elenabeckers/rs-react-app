import React, { ReactNode } from 'react';

interface SkeletonListProps {
  rowCount?: number;
  children: ReactNode;
  className?: string;
}

const DEFAULT_SKELETON_ROW_COUNT: number = 3;

class SkeletonList extends React.Component<SkeletonListProps> {
  render() {
    const {
      rowCount = DEFAULT_SKELETON_ROW_COUNT,
      children,
      className = '',
    } = this.props;

    return (
      <>
        {Array.from({ length: rowCount }).map((_, index) => (
          <li key={index} className={className}>
            {children}
          </li>
        ))}
      </>
    );
  }
}

export default SkeletonList;
