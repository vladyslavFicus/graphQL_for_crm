const config = require('config');
const fetch = require('./fetch');
const buildQueryString = require('./buildQueryString');

/**
 * Get last questionnaire data for profile
 *
 * @param profileUUID
 * @param authorization
 *
 * @return {*}
 */
const getLastProfileData = (profileUUID, authorization) => {
  return fetch(`${config.get('apiUrl')}/questionnaire/profile/${profileUUID}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  }).then(response => response.json());
};

/**
 * Change questionnaire status
 *
 * @param questionnaireUUID
 * @param args
 * @param authorization
 *
 * @return {*}
 */
const changeStatus = ({ questionnaireUUID, ...args }, authorization) => {
  return fetch(`${config.get('apiUrl')}/questionnaire/${questionnaireUUID}`, {
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
  getLastProfileData,
  changeStatus,
};
