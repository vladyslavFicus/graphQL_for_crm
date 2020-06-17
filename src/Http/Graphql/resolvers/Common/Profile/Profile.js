module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  profileView({ uuid }, _, { dataSources }) {
    return dataSources.ProfileViewAPI.getByUUID(uuid);
  },
  kycNote({ kyc: { uuid } }, _, { dataSources }) {
    return dataSources.NoteAPI.getNote(uuid);
  },
};
