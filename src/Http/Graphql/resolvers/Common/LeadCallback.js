module.exports = {
  _id({ callbackId }) {
    return callbackId;
  },
  operator({ operatorId }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(operatorId);
  },
  lead({ userId }, _, { dataSources }) {
    return dataSources.LeadAPI.getLead(userId);
  },
  note({ callbackId }, _, { dataSources }) {
    return dataSources.NoteAPI.getNote(callbackId);
  },
};
