interface NotificationMessageProps {
  title?: string;
  description?: string;
}

const NotificationMessage = ({
  title,
  description,
}: NotificationMessageProps) => (
  <div className="m-auto">
    <p>{title}</p>
    <p>{description}</p>
  </div>
);

export default NotificationMessage;
