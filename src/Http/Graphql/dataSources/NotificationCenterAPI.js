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
   * Get notification types
   *
   * @return {*}
   */
  getTypes() {
    return this.get('/admin/notifications/types');
  }

  /**
   * Get notification subtypes
   *
   * @return {*}
   */
  getSubtypes() {
    return this.get('/admin/notifications/subtypes');
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
   * Update notification center
   *
   * @param args
   *
   * @return {*}
   */
  update(args) {
    return this.put('/admin/notifications/bulk/read', args);
  }
}

module.exports = NotificationCenterAPI;
