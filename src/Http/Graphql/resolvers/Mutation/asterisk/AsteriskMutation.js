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
  async createCall(_, { number, prefix }, { dataSources, userUUID, brand }) {
    const { url, token } = brand.clickToCall.asterisk;

    const { sip } = await dataSources.OperatorAPI.getOperatorByUUID(userUUID);

    return dataSources.AsteriskAPI.createCall(url, token, sip, number, prefix);
  },
};
