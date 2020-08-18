const { get } = require('lodash');

module.exports = {
  /**
   * Create office
   *
   * @param _
   * @param args
   * @param dataSources
   * @param brand
   *
   * @return {Promise<*>}
   */
  async createOffice(_, args, { dataSources, brand }) {
    const { uuid } = await dataSources.HierarchyAPI.getBrand(brand.id);

    await dataSources.HierarchyUpdaterAPI.createBranch({
      ...args,
      branchType: 'OFFICE',
      parentBranch: uuid,
    });

    return true;
  },

  /**
   * Create desk
   *
   * @param _
   * @param officeId
   * @param args
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async createDesk(_, { officeId, ...args }, { dataSources }) {
    await dataSources.HierarchyUpdaterAPI.createBranch({
      ...args,
      branchType: 'DESK',
      parentBranch: officeId,
    });

    return true;
  },

  /**
   * Create team
   *
   * @param _
   * @param deskId
   * @param args
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async createTeam(_, { deskId, ...args }, { dataSources }) {
    await dataSources.HierarchyUpdaterAPI.createBranch({
      ...args,
      branchType: 'TEAM',
      parentBranch: deskId,
    });

    return true;
  },

  /**
   * Add branch manager
   *
   * @param _
   * @param branchUuid
   * @param operatorUuid
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async addBranchManager(_, { branchUuid, operatorUuid }, { dataSources }) {
    await dataSources.HierarchyUpdaterAPI.addBranchManager(branchUuid, {
      manager: operatorUuid,
    });

    return true;
  },

  /**
   * Remove branch manager
   *
   * @param _
   * @param branchUuid
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async removeBranchManager(_, { branchUuid }, { dataSources }) {
    await dataSources.HierarchyUpdaterAPI.removeBranchManager(branchUuid);

    return true;
  },

  /**
   * Update acquisition of single lead/client
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async updateAcquisition(_, { uuid, ...args }, { dataSources }) {
    await dataSources.HierarchyUpdaterAPI.updateAcquisition(uuid, args);
  },

  /**
   * Bulk update acquisition status
   *
   * @param _
   * @param args
   * @param args.uuids
   * @param args.acquisitionStatus
   * @param args.searchParams
   * @param args.selectedSize
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async bulkUpdateAcquisitionStatus(
    _,
    {
      uuids,
      acquisitionStatus,
      searchParams,
      bulkSize,
    },
    { dataSources },
  ) {
    let userUuids = uuids;

    if (bulkSize) {
      const sorts = get(searchParams, 'page.sorts');

      const response = await dataSources.ProfileViewAPI.search({
        ...(searchParams && searchParams),
        fields: ['uuid'],
        excludeByUuids: userUuids,
        page: {
          from: 0,
          size: bulkSize,
          ...(sorts && { sorts }),
        },
      });

      const content = get(response, 'content') || [];

      userUuids = content.map(({ uuid }) => uuid);
    }

    await dataSources.HierarchyUpdaterAPI.bulkUpdateAcquisitionStatus({
      userUuids,
      acquisitionStatus,
    });
  },

  /**
   * Bulk update clients acquisition
   *
   * @param _
   * @param args
   * @param args.uuids
   * @param args.parentOperators
   * @param args.salesStatus
   * @param args.retentionStatus
   * @param args.searchParams
   * @param args.bulkSize
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async bulkUpdateClientsAcquisition(
    _,
    {
      uuids,
      parentOperators,
      salesStatus,
      retentionStatus,
      searchParams,
      bulkSize,
    },
    { dataSources },
  ) {
    let userUuids = uuids;

    if (bulkSize) {
      const sorts = get(searchParams, 'page.sorts');

      const response = await dataSources.ProfileViewAPI.search({
        ...(searchParams && searchParams),
        fields: ['uuid'],
        excludeByUuids: userUuids,
        page: {
          from: 0,
          size: bulkSize,
          ...(sorts && { sorts }),
        },
      });

      const content = get(response, 'content') || [];

      userUuids = content.map(({ uuid }) => uuid);
    }

    await dataSources.HierarchyUpdaterAPI.bulkUpdateAcquisition({
      userUuids,
      ...(parentOperators && { parentOperators }),
      ...(retentionStatus && { retentionStatus }),
      ...(salesStatus && { salesStatus }),
    });
  },
  

  /**
   * Bulk update leads acquisition
   *
   * @param _
   * @param args
   * @param args.uuids
   * @param args.parentOperators
   * @param args.salesStatus
   * @param args.searchParams
   * @param args.bulkSize
   * @param dataSources
   * @param id
   *
   * @return {Promise<*>}
   */
  async bulkUpdateLeadsAcquisition(
    _,
    {
      uuids,
      parentOperators,
      salesStatus,
      searchParams,
      bulkSize,
    },
    { dataSources, brand: { id: brandId } },
  ) {
    let userUuids = uuids;

    if (bulkSize) {
      const sorts = get(searchParams, 'page.sorts');

      const response = await dataSources.LeadAPI.getLeads({
        ...(searchParams && searchParams),
        brandId,
        page: {
          from: 0,
          size: bulkSize + uuids.length,
          ...(sorts && { sorts }),
        },
      });

      const content = get(response, 'content') || [];

      userUuids = content
        .map(({ uuid }) => !uuids.includes(uuid) && uuid)
        .filter(Boolean);
    }

    await dataSources.HierarchyUpdaterAPI.bulkUpdateAcquisition({
      userUuids,
      ...(parentOperators && { parentOperators }),
      ...(salesStatus && { salesStatus }),
    });
  },
};
