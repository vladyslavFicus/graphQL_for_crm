const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');
const buildQueryString = require('./buildQueryString');

const getNotes = ({ size, page, ...args }, authorization) => {
  return fetch(`${getBaseUrl('note')}/search?${buildQueryString({ size, page })}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const addNote = (args, authorization) => {
  return fetch(`${getBaseUrl('note')}/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const removeNote = ({ noteId }, authorization) => {
  return fetch(`${getBaseUrl('note')}/${noteId}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => (response.status === 200 ? { data: { noteId } } : { error: 'error.note.remove' }));
};

const updateNote = ({ noteId, ...args }, authorization) => {
  return fetch(`${getBaseUrl('note')}/${noteId}`, {
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
