import React from 'react';

interface ProductSearchGridNotificationProps {
  title?: string;
  description?: string;
}

class ProductSearchGridNotification extends React.Component<ProductSearchGridNotificationProps> {
  render() {
    const { title, description } = this.props;

    return (
      <div className="m-auto">
        <p>{title}</p>
        <p>{description}</p>
      </div>
    );
  }
}

export default ProductSearchGridNotification;
