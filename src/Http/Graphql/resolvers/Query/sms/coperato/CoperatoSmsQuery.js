module.exports = {
  async numbers(_, __, { dataSources, brand }) {
    const { url, apiKey } = brand.sms.coperato;

    const { numbers } = await dataSources.CoperatoSmsAPI.getNumbers(url, apiKey);

    return numbers;
  },
};
