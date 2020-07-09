module.exports = {
  _id({ uuid }) {
    return uuid;
  },
  async client({ clientUuid }, _, { dataSources }) {
    try {
      return await dataSources.ProfileViewAPI.getByUUID(clientUuid);
    } catch (e) {
      return null;
    }
  },
  playerUUID({ playerUUID }) {
    return playerUUID;
  },
  targetUUID({ targetUUID }) {
    return targetUUID;
  },
  note({ uuid }, _, { dataSources }) {
    return dataSources.NoteAPI.getNote(uuid);
  },
};
