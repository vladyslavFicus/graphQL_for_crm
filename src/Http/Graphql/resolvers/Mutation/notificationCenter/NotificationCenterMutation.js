module.exports = {
  /**
   * Update notification center
   *
   * @param _
   * @param incUuids
   * @param excUuids
   * @param totalElements
   * @param dataSources
   *
   * @return {Promise}
   */
  async update(_, { incUuids, excUuids, totalElements }, { dataSources }) {
    let notificationUuids = incUuids;

    if (excUuids) {
      const data = await dataSources.NotificationCenterAPI.getNotifications({
        page: { size: totalElements },
        hierarchical: false,
      });

      notificationUuids = data.content.map(({ uuid }) => uuid).filter(uuid => !excUuids.includes(uuid));
    }

    await dataSources.NotificationCenterAPI.update({ read: true, notificationUuids });
  },
};
