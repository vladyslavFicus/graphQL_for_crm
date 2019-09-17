const fetch = require('./fetch');

const getFilterSetByUserId = ({ userId, type }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/forex_filter_sets/user/${userId}/type/${type}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const getFilterSetById = ({ uuid }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/forex_filter_sets/${uuid}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

const createFilterSet = (args, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/forex_filter_sets/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

const updateFilterSet = ({ uuid, ...args }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/forex_filter_sets/${uuid}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.json())
    .then(result => (result.error ? result : { success: true }));
};

const updateFilterFavourite = ({ uuid, favourite }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/forex_filter_sets/${uuid}/favourite/${favourite}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(result => (result.error ? result : { success: true }));
};

const deleteFilterSet = async ({ uuid }, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/forex_filter_sets/${uuid}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(result => (result.error ? result : { data: { uuid } }));
};

module.exports = {
  getFilterSetByUserId,
  getFilterSetById,
  createFilterSet,
  updateFilterSet,
  updateFilterFavourite,
  deleteFilterSet,
};
