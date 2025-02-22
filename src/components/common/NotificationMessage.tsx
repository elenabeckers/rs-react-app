interface NotificationMessageProps {
  title?: string;
  description?: string;
}

const NotificationMessage = ({
  title,
  description,
}: NotificationMessageProps) => (
  <div className="h-full flex flex-col justify-center items-center text-gray-600 text-sm">
    <p>{title}</p>
    <p>{description}</p>
  </div>
);

export default NotificationMessage;
