module.exports = {
  /**
   * Create call to DidLogic
   *
   * @param _
   * @param number
   * @param dataSources
   * @param userUUID
   * @param brand
   *
   * @return {Promise<any>}
   */
  async createCall(_, { number }, { dataSources, userUUID, brand }) {
    const { url } = brand.clickToCall.didlogic;

    const { phoneNumber } = await dataSources.OperatorAPI.getByUUID(userUUID);

    try {
      await dataSources.DidLogicAPI.createCall(url, number, phoneNumber);

      return { success: true };
    } catch (e) {
      return { success: false };
    }
  },
};
