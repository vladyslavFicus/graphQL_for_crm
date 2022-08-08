module.exports = {
  /**
   * Create call to Squaretalk
   *
   * @param _
   * @param number
   * @param dataSources
   * @param userUUID
   *
   * @return {Promise<any>}
   */
  async createCall(_, { uuid, phoneType, customerType }, { dataSources }) {

    const { success } = await dataSources.Click2CallAPI.createCallSquaretalk({ uuid, customerType, phoneType });

    if (!success) {
      throw new Error('Call failed');
    }
  },
};
