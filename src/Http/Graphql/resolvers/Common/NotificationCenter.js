module.exports = {
  agent({ operatorUuid }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(operatorUuid);
  },
  client({ profileUuid }, _, { dataSources }) {
    return dataSources.ProfileViewAPI.getPersonalInfoByUUID(profileUuid);
  },
};
