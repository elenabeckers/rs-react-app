import { ReactNode } from 'react';

interface SkeletonListProps {
  rowCount?: number;
  children: ReactNode;
  className?: string;
}

const DEFAULT_SKELETON_ROW_COUNT: number = 3;

const SkeletonList = ({
  rowCount = DEFAULT_SKELETON_ROW_COUNT,
  children,
  className = '',
}: SkeletonListProps) => (
  <>
    {Array.from({ length: rowCount }).map((_, index) => (
      <li key={index} className={className}>
        {children}
      </li>
    ))}
  </>
);

export default SkeletonList;
