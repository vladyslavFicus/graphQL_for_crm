const config = require('config');
const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');

const signUpOptions = function(_, { brandId }) {
  return fetch(`${config.get('apiUrl')}/profile/public/signup?brandId=${brandId}`, { method: 'OPTIONS' })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => ({ ...response, brandId }));
};

module.exports = {
  signUpOptions,
};
