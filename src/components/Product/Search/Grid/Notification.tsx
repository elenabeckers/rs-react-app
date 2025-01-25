import React from 'react';

interface ProductSearchGridNotificationProps {
  title?: string;
  description?: string;
}

class ProductSearchGridNotification extends React.Component<ProductSearchGridNotificationProps> {
  render() {
    const { title, description } = this.props;

    return (
      <tr className="text-center">
        <td colSpan={2}>
          <div>{title}</div>
          <div>{description}</div>
        </td>
      </tr>
    );
  }
}

export default ProductSearchGridNotification;
