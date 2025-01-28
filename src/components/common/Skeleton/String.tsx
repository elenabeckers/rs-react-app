import React from 'react';

interface SkeletonStringProps {
  className?: string;
}

class SkeletonString extends React.Component<SkeletonStringProps> {
  render() {
    const { className = '' } = this.props;

    return (
      <div
        className={`animate-pulse h-2.5 bg-gray-200 rounded-full w-full mb-4 ${className}`}
      />
    );
  }
}

export default SkeletonString;
