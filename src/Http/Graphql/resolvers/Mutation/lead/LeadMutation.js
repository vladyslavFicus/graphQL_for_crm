module.exports = {
  /**
   * Update note
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   * @param brandId
   *
   * @return {Promise<Lead|*>}
   */
  async update(_, { uuid, ...args }, { dataSources, brand: { id: brandId } }) {
    await dataSources.LeadUpdaterAPI.updateLead(uuid, { brandId, ...args });
  },

  /**
   *
   * Upload leads (csv)
   *
   * @param _
   * @param file
   * @param dataSources
   * @param brand
   *
   * @return {Promise<*>}
   *
   * */
  async uploadLeads(_, { file }, { dataSources }) {
    await dataSources.LeadUpdaterAPI.uploadLeads(file);
  },

  /**
   * Promote lead to client
   *
   * @param _
   * @param uuid
   * @param args
   * @param dataSources
   *
   * @return {Promise<*>}
   */
  async promote(_, { args: { uuid, ...args } }, { dataSources }) {
    // Get real lead contacts from BE service
    const lead = await dataSources.LeadAPI.getLead(uuid);

    const _args = {
      ...args,
      contacts: {
        phone: lead.phone,
        additionalPhone: lead.mobile,
        email: lead.email,
      },
    };

    await dataSources.ProfileAPI.createProfile(_args);
  },
};
