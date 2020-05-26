const fetch = require('./fetch');
const parseJson = require('./parseJson');
const getBaseUrl = require('./getBaseUrl');

const bulkUpdateRetentionStasuses = (args, authorization) => {
  return fetch(`${getBaseUrl('profile')}/admin/profiles/bulk/acquisition/retention-status`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const bulkUpdateSalesStasuses = (args, authorization) => {
  return fetch(`${getBaseUrl('profile')}/admin/profiles/bulk/acquisition/sales-status`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

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

const updateQueryTradingProfile = (args, authorization) => {
  return fetch(`${getBaseUrl('trading-profile')}/v2/`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
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

const checkMigrationQuery = (_, args) =>
  fetch(`${getBaseUrl('trading-profile-updater')}/public/migration/check`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());

const changeProfileStatusQuery = ({ playerUUID, ...args }, authorization) => {
  return fetch(`${getBaseUrl('profile')}/admin/profiles/${playerUUID}/status`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
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
  bulkUpdateRetentionStasuses,
  bulkUpdateSalesStasuses,
  updateQueryTradingProfile,
  updateQueryProfile,
  getProfiles,
  checkMigrationQuery,
  getQueryNewProfiles,
  getQueryProfileView,
  changeProfileStatusQuery,
  getClientsPersonalInfoQuery,
};
