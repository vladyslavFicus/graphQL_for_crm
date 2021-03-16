const getFieldByType = require('../../../../utils/getFieldByType');

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
  async createCall(_, { uuid, field, type, prefix }, { dataSources, userUUID, brand }) {
    const number = await getFieldByType(uuid, field, type, dataSources);

    const { url, token } = brand.clickToCall.asterisk;

    const { asteriskPhone } = await dataSources.OperatorAPI.getByUUID(userUUID);

    const { success } = await dataSources.AsteriskAPI.createCall(url, token, asteriskPhone, number, prefix);

    if (!success) {
      throw new Error('Call failed');
    }
  },
};
