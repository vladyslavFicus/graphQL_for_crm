const { get } = require('lodash');
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
    const { isTest = false } = brand.clickToCall;
    if (isTest) {
      return Promise.resolve(true);
    }
    const number = await getFieldByType(uuid, field, type, dataSources);

    const { url } = brand.clickToCall.commpeak;

    const operator = await dataSources.OperatorAPI.getByUUID(userUUID);

    const sip = get(operator, 'clickToCall.commpeakPhone');

    const response = await dataSources.CommpeakAPI.createCall(url, sip, number, prefix);

    const { success } = JSON.parse(response);

    if (!success) {
      throw new Error('Call failed');
    }

    return Promise.resolve(true);
  },
};
