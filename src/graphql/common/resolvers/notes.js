const {
  getNotes: getNotesRequest,
  addNote: addNoteRequest,
  updateNote: updateNoteRequest,
  removeNote: removeNoteRequest,
} = require('../../../utils/notesRequests');

const getNotes = function(_, { targetUUID, ...args }, { headers: { authorization } }) {
  return getNotesRequest({ ...args, targetUUIDs: [targetUUID] }, authorization);
};

const addNote = function(_, args, { headers: { authorization } }) {
  return addNoteRequest(args, authorization);
};

const removeNote = function(_, args, { headers: { authorization } }) {
  return removeNoteRequest(args, authorization);
};

const updateNote = function(_, args, { headers: { authorization } }) {
  return updateNoteRequest(args, authorization);
};

/**
 * Retrieve note depends on source fieldName
 *
 * @param fieldName
 * @return {Function}
 */

const getNote = fieldName => ({ [fieldName]: targetUUID }, _, { dataloaders }) => {
  return dataloaders.notes.load(targetUUID);
};

module.exports = {
  removeNote,
  updateNote,
  getNotes,
  addNote,
  getNote,
};
