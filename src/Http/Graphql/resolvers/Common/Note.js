module.exports = {
  _id({ noteId }) {
    return noteId;
  },
  operator({ changedBy }, _, { dataSources }) {
    return dataSources.OperatorAPI.getByUUID(changedBy);
  },
};
