const fetch = require('./fetch');
const parseJson = require('./parseJson');
const getBaseUrl = require('./getBaseUrl');

const getProfiles = (args, authorization) => {
  return fetch(`${getBaseUrl('profileview')}/admin/profiles/pageable-search`, {
    method: 'POST',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const getQueryNewProfiles = (playerUUID, authorization) => {
  return fetch(`${getBaseUrl('profile')}/admin/profiles/${playerUUID}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getQueryProfileView = (uuid, authorization) => {
  return fetch(`${getBaseUrl('profileview')}/admin/profiles/${uuid}`, {
    method: 'GET',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }).then(response => response.json().then(({ data }) => data));
};

const updateQueryProfile = (args, playerUUID, authorization) => {
  return fetch(`${getBaseUrl('profile')}/profiles/${playerUUID}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization,
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};

const getClientsPersonalInfoQuery = (args, authorization) => {
  return fetch(`${getBaseUrl('profileview')}/admin/profiles/personal-information`, {
    method: 'POST',
    headers: {
      authorization,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

module.exports = {
  updateQueryProfile,
  getProfiles,
  getQueryNewProfiles,
  getQueryProfileView,
  getClientsPersonalInfoQuery,
};
