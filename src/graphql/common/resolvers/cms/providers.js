const fetch = require('../../../../utils/fetch');
const parseJson = require('../../../../utils/parseJson');

function getProviders() {
  return fetch(`${global.appConfig.cmsUrl}/provider?_limit=9999`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response));
}

module.exports = {
  getProviders,
};
