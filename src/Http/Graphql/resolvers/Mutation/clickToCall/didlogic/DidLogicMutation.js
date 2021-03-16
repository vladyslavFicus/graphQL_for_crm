const getFieldByType = require('../../../../utils/getFieldByType');

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
  async createCall(_, { uuid, field, type }, { dataSources, userUUID, brand }) {
    const number = await getFieldByType(uuid, field, type, dataSources);

    const { url } = brand.clickToCall.didlogic;

    const { didlogicPhone } = await dataSources.OperatorAPI.getByUUID(userUUID);

    await dataSources.DidLogicAPI.createCall(url, number, didlogicPhone, uuid, 'CRM');
  },
};
