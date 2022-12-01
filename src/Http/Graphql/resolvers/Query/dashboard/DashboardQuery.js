module.exports = {
  lastNotification(_, __, { dataSources }) {
    return dataSources.NotificationCenterAPI.getLastNotifications();
  },
};
