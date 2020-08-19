module.exports = {
  /**
   * Update note
   *
   * @param _
   * @param args
   * @param dataSources
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
  async uploadLeads(_, { file }, { dataSources, brand: { id: brand } }) {
    await dataSources.LeadUpdaterAPI.uploadLeads(file, brand);
  },
};
