module.exports = {
  _id({ callbackId }) {
    return callbackId;
  },
  operator({ operatorId }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(operatorId);
  },
  client({ userId }, _, { dataSources }) {
    return dataSources.ProfileViewAPI.getPersonalInfoByUUID(userId);
  },
  note({ callbackId }, _, { dataSources }) {
    return dataSources.NoteAPI.getNote(callbackId);
  },
};
