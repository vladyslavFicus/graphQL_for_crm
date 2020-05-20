const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');
const getBaseUrl = require('../../../utils/getBaseUrl');

const signUpOptions = (_, { brandId }) => {
  return fetch(`${getBaseUrl('profile')}/public/signup?brandId=${brandId}`, { method: 'OPTIONS' })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => ({ ...response, brandId }));
};

module.exports = {
  signUpOptions,
};
