const fetch = require('../../../../utils/fetch');
const parseJson = require('../../../../utils/parseJson');

function getAggregators() {
  return fetch(`${global.appConfig.cmsUrl}/aggregator`, {
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
  getAggregators,
};
