module.exports = {
  /**
   * Update notification center
   *
   * @param _
   * @param incUuids
   * @param selectAll
   * @param totalElements
   * @param searchParams
   * @param dataSources
   *
   * @return {Promise}
   */
  async update(_, { incUuids, selectAll, totalElements, searchParams }, { dataSources }) {
    let notificationUuids = incUuids;

    if (selectAll) {
      const data = await dataSources.NotificationCenterAPI.getNotifications({
        ...searchParams,
        page: { size: totalElements },
        hierarchical: false,
      });

      notificationUuids = data.content.map(({ uuid }) => uuid);
    }

    await dataSources.NotificationCenterAPI.update({ read: true, notificationUuids });
  },

  /**
   * Update notification configuration
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<void>}
   */
  async updateConfiguration(_, args, { dataSources }) {
    await dataSources.NotificationCenterAPI.updateConfiguration(args);
  },
};
