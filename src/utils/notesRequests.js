const fetch = require('./fetch');
const buildQueryString = require('./buildQueryString');

const getNotes = function({ size, page, ...args }, authorization) {
  return fetch(`${global.appConfig.apiUrl}/forex_note/search?${buildQueryString({ size, page })}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const addNote = function(args, authorization) {
  return fetch(`${global.appConfig.apiUrl}/forex_note/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const removeNote = function({ noteId }, authorization) {
  return fetch(`${global.appConfig.apiUrl}/forex_note/${noteId}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => (response.status === 200 ? { data: { noteId } } : { error: 'error.note.remove' }));
};

const updateNote = function({ noteId, ...args }, authorization) {
  return fetch(`${global.appConfig.apiUrl}/forex_note/${noteId}`, {
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
