const { get } = require('lodash');

module.exports = {
  /**
   * Create new client
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  createProfile(_, { args }, { dataSources }) {
    return dataSources.ProfileAPI.createProfile(args);
  },

  /**
   * Change status profile (block/unblock)
   *
   * @param _
   * @param playerUUID
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  changeProfileStatus(_, { playerUUID, ...args }, { dataSources }) {
    return dataSources.ProfileAPI.changeStatus(playerUUID, args);
  },

  /**
   * Update profile information
   *
   * @param _
   * @param playerUUID
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  updatePersonalInformation(_, { playerUUID, ...args }, { dataSources }) {
    return dataSources.ProfileAPI.updatePersonalInformation(playerUUID, args);
  },

  /**
   * Update profile address
   *
   * @param _
   * @param playerUUID
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  async updateAddress(_, { playerUUID, ...args }, { dataSources }) {
    await dataSources.ProfileAPI.updateAddress(playerUUID, args);

    return dataSources.ProfileAPI.getByUUID(playerUUID);
  },

  /**
   * Update profile contacts
   *
   * @param _
   * @param playerUUID
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  async updateContacts(_, { playerUUID, ...args }, { dataSources }) {
    await dataSources.ProfileAPI.updateContacts(playerUUID, args);

    return dataSources.ProfileAPI.getByUUID(playerUUID);
  },

  /**
   * Update profile configuration
   *
   * @param _
   * @param playerUUID
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  async updateConfiguration(_, { playerUUID, ...args }, { dataSources }) {
    await dataSources.ProfileAPI.updateConfiguration(playerUUID, args);
  },

  /**
   * Update KYC status
   *
   * @param _
   * @param playerUUID
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  async updateKYCStatus(_, { playerUUID, ...args }, { dataSources }) {
    await dataSources.ProfileAPI.updateKYCStatus(playerUUID, args);
  },

  /**
   * Update client email
   *
   * @param _
   * @param playerUUID
   * @param email
   * @param dataSources
   *
   * @return {*}
   */
  async updateEmail(_, { playerUUID, email }, { dataSources }) {
    await dataSources.ProfileAPI.updateEmail(playerUUID, email);

    return dataSources.ProfileAPI.getByUUID(playerUUID);
  },

  /**
   * Verify client email
   *
   * @param _
   * @param playerUUID
   * @param dataSources
   *
   * @return {*}
   */
  verifyEmail(_, { playerUUID }, { dataSources }) {
    return dataSources.ProfileAPI.verifyEmail(playerUUID);
  },

  /**
   * Verify client phone
   *
   * @param _
   * @param playerUUID
   * @param phone
   * @param dataSources
   *
   * @return {*}
   */
  verifyPhone(_, { playerUUID, phone }, { dataSources }) {
    return dataSources.ProfileAPI.verifyPhone(playerUUID, phone);
  },

  /**
   * Verify client phone
   *
   * @param _
   * @param args
   * @param args.type
   * @param args.clients
   * @param args.isMoveAction
   * @param args.searchParams
   * @param args.totalElements
   * @param args.allRowsSelected
   * @param args.salesStatus
   * @param args.salesRepresentative
   * @param args.retentionStatus
   * @param args.retentionRepresentative
   * @param dataSources
   *
   * @return {*}
   */
  async bulkClientUpdate(
    _,
    {
      type,
      clients,
      isMoveAction,
      searchParams,
      totalElements,
      allRowsSelected,
      salesStatus,
      salesRepresentative,
      retentionStatus,
      retentionRepresentative,
    },
    { dataSources },
  ) {
    let clientsForBulkUpdate = clients.length ? clients : [];

    // # Clients in this case are exclusion elements that need to be removed from the list before bulk update
    if (allRowsSelected) {
      const excludeClientsUuids = clients.map(({ uuid }) => uuid);

      const MAX_LIMIT = 10000;
      const searchLimit = get(searchParams, 'searchLimit') || Infinity;
      const bulkUpdateClientsSize = Math.min(searchLimit, totalElements, MAX_LIMIT); // Must be x <= 10000

      const allClientsData = await dataSources.ProfileViewAPI.search({
        ...searchParams,
        fields: ['uuid', 'acquisition'],
        excludeByUuids: excludeClientsUuids,
        page: {
          from: 0,
          size: bulkUpdateClientsSize - excludeClientsUuids.length,
        },
      });

      clientsForBulkUpdate = get(allClientsData, 'content') || [];
    }

    if (salesStatus) {
      await dataSources.ProfileAPI.bulkUpdateSalesStatuses({
        salesStatus,
        uuids: clientsForBulkUpdate.map(client => client.uuid),
      });
    }

    if (retentionStatus) {
      await dataSources.ProfileAPI.bulkUpdateRetentionStatuses({
        retentionStatus,
        uuids: clientsForBulkUpdate.map(client => client.uuid),
      });
    }

    if (salesRepresentative || retentionRepresentative) {
      await dataSources.HierarchyUpdaterAPI.bulkMassAssignHierarchyUser({
        parentUsers: salesRepresentative || retentionRepresentative,
        userUuids: clientsForBulkUpdate.map(client => client.uuid),
      });
    }

    if (isMoveAction) {
      await dataSources.HierarchyUpdaterAPI.bulkUpdateHierarchyUser({
        assignments: clientsForBulkUpdate.map(client => ({
          uuid: client.uuid,
          assignToOperator:
            type === 'SALES'
              ? get(client, 'acquisition.salesRepresentative', client.salesRepresentative)
              : get(client, 'acquisition.retentionRepresentative', client.retentionRepresentative),
        })),
      });
    }

    return true;
  },
};
