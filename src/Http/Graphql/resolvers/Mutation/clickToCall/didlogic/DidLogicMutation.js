module.exports = {
  /**
   * Create call to DidLogic
   *
   * @param _
   * @param number
   * @param dataSources
   * @param userUUID
   * @param brand
   * @param requestId
   *
   * @return {Promise<any>}
   */
  async createCall(_, { uuid, phoneType, customerType }, { dataSources }) {

    const { success } = await dataSources.Click2CallAPI.createCallDidlogic({ uuid, customerType, phoneType });

    if (!success) {
      throw new Error('Call failed');
    }
  },
};
