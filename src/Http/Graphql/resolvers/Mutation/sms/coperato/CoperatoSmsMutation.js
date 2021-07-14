const getFieldByType = require('../../../../utils/getFieldByType');

module.exports = {
  async sendSms(_, { uuid, field, type, from, message }, { dataSources, brand }) {
    const { url, apiKey } = brand.sms.coperato;

    const to = await getFieldByType(uuid, field, type, dataSources);

    const { scode } = await dataSources.CoperatoSmsAPI.sendSms(
      url,
      apiKey,
      from,
      to,
      message,
    );

    if (!scode) {
      throw new Error('SMS sent failed');
    }
  },
};
