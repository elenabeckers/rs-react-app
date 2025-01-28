import React, { ReactNode } from 'react';

interface SkeletonListProps {
  rowCount?: number;
  children: ReactNode;
  className?: string;
}

const DEFAULT_ROW_COUNT: number = 3;

class SkeletonList extends React.Component<SkeletonListProps> {
  render() {
    const { rowCount, children, className = '' } = this.props;

    return Array.from({ length: rowCount ?? DEFAULT_ROW_COUNT }).map(
      (_, index) => (
        <li key={index} className={className}>
          {children}
        </li>
      )
    );
  }
}

export default SkeletonList;
