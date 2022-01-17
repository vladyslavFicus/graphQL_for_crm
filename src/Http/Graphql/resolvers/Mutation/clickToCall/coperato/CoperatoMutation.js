const { get } = require('lodash');
const getFieldByType = require('../../../../utils/getFieldByType');

module.exports = {
  /**
   * Create call to Coperato
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

    const { url } = brand.clickToCall.coperato;

    const operator = await dataSources.OperatorAPI.getByUUID(userUUID);

    const extension = get(operator, 'clickToCall.coperatoPhone');

    const response = await dataSources.CoperatoAPI.createCall(url, extension, `${prefix}${number}`);

    const { success } = response;

    if (!success) {
      throw new Error('Call failed');
    }

    return Promise.resolve(true);
  },
};
