const getFieldByType = require('../../../../utils/getFieldByType');

module.exports = {
  /**
   * Create call to Commpeak
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

    const { url } = brand.clickToCall.commpeak;

    const { commpeakPhone } = await dataSources.OperatorAPI.getByUUID(userUUID);

    const response = await dataSources.CommpeakAPI.createCall(url, commpeakPhone, number, prefix);

    const { success } = JSON.parse(response);

    if (!success) {
      throw new Error('Call failed');
    }
  },
};
