import React from 'react';

interface NotificationMessageProps {
  title?: string;
  description?: string;
}

class NotificationMessage extends React.Component<NotificationMessageProps> {
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

export default NotificationMessage;
