const getAllPartnersForBulk = require('../../../utils/getAllPartnersForBulk');

module.exports = {
  /**
   * Create partner
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  createPartner(_, args, { dataSources }) {
    return dataSources.AffiliateAPI.createPartner(args);
  },

  /**
   * Update partner
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async updatePartner(_, args, { dataSources }) {
    await dataSources.AffiliateAPI.updatePartner(args);
  },

  /**
   * Update partners status
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async bulkChangeAffiliatesStatus(_, args, { dataSources }) {
    const {
      uuids = [],
      bulkSize,
      ...rest
    } = args;

    const updateUuids = !bulkSize ? uuids : await getAllPartnersForBulk({
      ...args,
      dataSources,
    });

    await dataSources.AffiliateAPI.bulkChangeAffiliatesStatus({
      ...rest,
      uuids: updateUuids,
    });
  },

  /**
   * Add partners list forbidden countries
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async bulkPartnersAddForbiddenCountries(_, { args }, { dataSources }) {
    const {
      uuids = [],
      bulkSize,
      forbiddenCountries,
    } = args;

    const updateUuids = !bulkSize ? uuids : await getAllPartnersForBulk({
      ...args,
      dataSources,
    });

    await dataSources.AffiliateAPI.bulkPartnersAddForbiddenCountries({
      uuids: updateUuids,
      forbiddenCountries,
    });
  },

  /**
   * Delete partners list forbidden countries
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async bulkPartnersDeleteForbiddenCountries(_, { args }, { dataSources }) {
    const {
      uuids = [],
      bulkSize,
      forbiddenCountries,
    } = args;

    const updateUuids = !bulkSize ? uuids : await getAllPartnersForBulk({
      ...args,
      dataSources,
    });

    await dataSources.AffiliateAPI.bulkPartnersDeleteForbiddenCountries({
      uuids: updateUuids,
      forbiddenCountries,
    });
  },

  /**
   * Change partner account status (close/active)
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async changePartnerAccountStatus(_, args, { dataSources }) {
    await dataSources.AffiliateAPI.changePartnerAccountStatus(args);
  },

  /**
   * Create schedule
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {*}
   */
  async createSchedule(_, args, { dataSources }) {
    await dataSources.AffiliateAPI.createSchedule(args);
  },

  /**
   * Change schedule status
   *
   * @param _
   * @param args
   * @param dataSources
   *
   * @return {Promise}
   */
  async changeScheduleStatus(_, args, { dataSources }) {
    await dataSources.AffiliateAPI.changeScheduleStatus(args);
  },
};
