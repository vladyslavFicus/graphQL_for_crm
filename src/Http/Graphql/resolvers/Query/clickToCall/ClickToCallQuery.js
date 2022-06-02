module.exports = {
  configs(_, __, { dataSources }) {
    return dataSources.Click2CallAPI.getConfigs();
  },
};
