const { get } = require('lodash');
const getFieldByType = require('../../../../utils/getFieldByType');
const Logger = require('../../../../../../lib/Logger');

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
  async createCall(_, { uuid, field, type }, { dataSources, userUUID, brand, requestId }) {
    const { isTest = false } = brand.clickToCall;
    if (isTest) {
      return Promise.resolve(true);
    }
    const number = await getFieldByType(uuid, field, type, dataSources);

    const { url } = brand.clickToCall.didlogic;

    const operator = await dataSources.OperatorAPI.getByUUID(userUUID);

    const sip = get(operator, 'clickToCall.didlogicPhone');

    Logger.info({ requestId, uuid, number, sip }, 'Before Didlogic click2call request');

    try {
      await dataSources.DidLogicAPI.createCall(url, number, sip, uuid, 'CRM');

      Logger.info({ requestId, uuid, number, sip }, 'Success after Didlogic click2call request');

      return Promise.resolve(true);
    } catch (e) {
      Logger.warn({
        requestId,
        uuid,
        number,
        sip,
        response: e.extensions.response,
      }, 'Error after Didlogic click2call request');

      throw e;
    }
  },
};
