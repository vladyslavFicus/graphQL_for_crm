const { getNotes: getNotesRequest } = require('../../../utils/notesRequests');

// # TODO: Remove after 'note' dataloader will be removed
const getNotes = function(_, { targetUUID, ...args }, { headers: { authorization } }) {
  return getNotesRequest({ ...args, targetUUIDs: [targetUUID] }, authorization);
};

// # TODO: Remove after 'note' dataloader will be removed
const getNote = fieldName => ({ [fieldName]: targetUUID }, _, { dataloaders }) => {
  return dataloaders.notes.load(targetUUID);
};

module.exports = {
  getNotes,
  getNote,
};
