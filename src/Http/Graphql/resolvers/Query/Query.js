const { AuthenticationError } = require('@hrzn/apollo-datasource');

module.exports = {
  notificationCenterUnread(_, __, { dataSources }) {
    return dataSources.NotificationCenterAPI.unreadCount();
  },
};
