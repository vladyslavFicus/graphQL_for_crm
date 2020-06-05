const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');

const getPartners = (args, authorization) => {
  return fetch(`${getBaseUrl('affiliate')}/affiliates/search`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

module.exports = {
  getPartners,
};
