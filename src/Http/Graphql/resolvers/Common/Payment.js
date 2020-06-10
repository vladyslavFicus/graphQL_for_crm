module.exports = {
  _id({ paymentId }) {
    return paymentId;
  },
  originalAgent({ agentId }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(agentId);
  },
  note({ paymentId }, _, { dataSources }) {
    return dataSources.NoteAPI.getNote(paymentId);
  },
};
