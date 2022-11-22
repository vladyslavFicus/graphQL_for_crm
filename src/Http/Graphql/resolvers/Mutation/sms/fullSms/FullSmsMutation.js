const getFieldByType = require('../../../../utils/getFieldByType');

module.exports = {
  /**
   * Send sms
   *
   * @param _
   * @param args.uuid
   * @param args.field
   * @param args.type
   * @param args.from
   * @param args.message
   * @param dataSources
   *
   * @return {Promise}
   */
  async sendSms(_, { uuid, field, type, from, message }, { dataSources }) {
    const to = await getFieldByType(uuid, field, type, dataSources);

    await dataSources.FullSmsAPI.sendSms(
      from,
      to,
      message,
    );
  },
};
