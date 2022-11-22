module.exports = {
  async numbers(_, __, { dataSources }) {
    const { numbers } = await dataSources.FullSmsAPI.getNumbers();

    return numbers;
  },
};
