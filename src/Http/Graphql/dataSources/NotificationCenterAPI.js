const RESTDataSource = require('@hrzn/apollo-datasource/RESTDataSource');

class NotificationCenterAPI extends RESTDataSource {
  /**
   * Get notifications list
   *
   * @param hierarchical
   * @param args
   *
   * @return {*}
   */
  getNotifications({ hierarchical, ...args }) {
    return this.post(`/admin/notifications/search?hierarchical=${hierarchical}`, args);
  }

  /**
   * Get last notifications list
   *
   * @return {*}
   */
  getLastNotifications() {
    return this.get('/admin/notifications/last');
  }

  /**
   * Get notification types
   *
   * @return {*}
   */
  getTypes() {
    return this.get('/admin/notifications/types');
  }

  /**
   * Get count of unread notifications
   *
   * @return {Promise}
   */
  getUnreadCount() {
    return this.get('/admin/notifications/unread/amount');
  }

  /**
   * Get notifications configuration
   *
   * @return {Promise}
   */
  getConfiguration() {
    return this.get('/admin/notifications/configuration');
  }

  /**
   * Update notification center
   *
   * @param args
   *
   * @return {*}
   */
  update(args) {
    return this.put('/admin/notifications/bulk/read', args);
  }

  /**
   * Update notifications configuration
   *
   * @param args
   *
   * @return {*}
   */
  updateConfiguration(args) {
    return this.put('/admin/notifications/configuration', args);
  }
}

module.exports = NotificationCenterAPI;
