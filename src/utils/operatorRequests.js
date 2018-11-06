const fetch = require('./fetch');
const parseJson = require('./parseJson');

const getOperatorByUUID = (operatorId, authorization) => {
  return fetch(`${global.appConfig.apiUrl}/operator/operators/${operatorId}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => response);
};

module.exports = {
  getOperatorByUUID,
};
