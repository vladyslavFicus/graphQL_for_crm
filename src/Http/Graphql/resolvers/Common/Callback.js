module.exports = {
  _id({ callbackId }) {
    return callbackId;
  },
  operator({ callbackId }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(callbackId);
  },
  client({ userId }, _, { dataSources }) {
    return dataSources.ProfileViewAPI.getPersonalInfoByUUID(userId);
  },
  note({ callbackId }, _, { dataSources }) {
    return dataSources.NoteAPI.getNote(callbackId);
  },
};
