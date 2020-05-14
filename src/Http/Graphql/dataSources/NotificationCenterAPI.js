const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class NotificationCenterAPI extends RESTDataSource {
  /**
   * Get count of unread notifications
   *
   * @return {Promise}
   */
  unreadCount() {
    return this.get('/notification/admin/notifications/unread/amount');
  }
}

module.exports = NotificationCenterAPI;
