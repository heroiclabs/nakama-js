export default function NotificationsResponse(message) {
  const {
    notifications: {
      notifications = [],
    },
  } = message;

  notifications.forEach(function(notification) {
    notification.content = JSON.parse(notification.content);
  });

  return message.notifications;
}
