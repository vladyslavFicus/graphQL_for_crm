const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');

const fetchFreeSpin = function(_, { playerUUID, uuid }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/free_spin/free-spins/${playerUUID}/${uuid}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response.uuid ? { data: response } : { error: response }));
};

const declineFreeSpin = function(_, { playerUUID, uuid }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/free_spin/free-spins/${playerUUID}/${uuid}/decline`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response.uuid ? { data: response } : { error: response }));
};

module.exports = {
  fetchFreeSpin,
  declineFreeSpin,
};
