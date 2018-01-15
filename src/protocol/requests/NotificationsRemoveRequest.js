export default function NotificationsRemoveRequest({
  notifications = [],
} = {}) {
  function build_() {
    return {
      notificationsRemove: {
        notificationIds: notifications,
      },
    };
  }

  return {
    get notifications() {
      return notifications;
    },
    set notifications(val) {
      notifications = val;
    },

    build_,
  };
}
