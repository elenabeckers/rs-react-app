interface SkeletonStringProps {
  className?: string;
}

const SkeletonString = ({ className = '' }: SkeletonStringProps) => (
  <div
    className={`animate-pulse h-2.5 bg-gray-200 rounded-full w-full mb-4 ${className}`}
  />
);

export default SkeletonString;
