module.exports = {
  /**
   * Create call to ClearVoice
   *
   * @param _
   * @param number
   * @param prefix
   * @param dataSources
   * @param userUUID
   *
   * @return {Promise<any>}
   */
  async createCall(_, { uuid, phoneType, customerType, prefix }, { dataSources }) {
    const { success } = await dataSources.Click2CallAPI.createCallClearVoice({ uuid, customerType, phoneType, prefix });

    if (!success) {
      throw new Error('Call failed');
    }
  },
};
