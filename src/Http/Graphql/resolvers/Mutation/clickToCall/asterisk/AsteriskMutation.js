const { get } = require('lodash');
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
    const { isTest = false } = brand.clickToCall;
    if (isTest) {
      return true;
    }

    const number = await getFieldByType(uuid, field, type, dataSources);

    const { url, token } = brand.clickToCall.asterisk;

    const operator = await dataSources.OperatorAPI.getByUUID(userUUID);

    const sip = get(operator, 'clickToCall.asteriskPhone');

    const { success } = await dataSources.AsteriskAPI.createCall(url, token, sip, number, prefix);

    if (!success) {
      throw new Error('Call failed');
    }

    return true;
  },
};
