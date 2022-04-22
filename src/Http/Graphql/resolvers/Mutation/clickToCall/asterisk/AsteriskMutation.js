module.exports = {
  /**
   * Create call to Asterisk
   *
   * @param _
   * @param number
   * @param prefix
   * @param dataSources
   * @param userUUID
   * @param brand
   *
   * @return {Promise<any>}
   */
  async createCall(_, { uuid, phoneType, customerType, prefix }, { dataSources }) {

    const { success } = await dataSources.Click2CallAPI.createCallAsterisk({ uuid, customerType, phoneType, prefix });

    if (!success) {
      throw new Error('Call failed');
    }
  },
};
