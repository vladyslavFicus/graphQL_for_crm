const fetch = require('./fetch');
const buildQueryString = require('./buildQueryString');

const getNotes = function(args, authorization) {
  return fetch(`${global.appConfig.apiUrl}/tag/note/search?${buildQueryString(args)}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const addNote = function(args, authorization) {
  return fetch(`${global.appConfig.apiUrl}/tag/note`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const removeNote = function({ noteId, ...args }, authorization) {
  return fetch(`${global.appConfig.apiUrl}/tag/note/${noteId}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => (response.status === 200 ? { data: { noteId } } : { error: 'error.note.remove' }));
};

const updateNote = function({ noteId, ...args }, authorization) {
  return fetch(`${global.appConfig.apiUrl}/tag/note/${noteId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

module.exports = {
  addNote,
  removeNote,
  updateNote,
  getNotes,
};
