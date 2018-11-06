const fetch = require('../../../utils/fetch');
const parseJson = require('../../../utils/parseJson');

const claimFreeSpinTemplate = function(_, { templateUUID, ...args }, { headers: { authorization } }) {
  return fetch(`${global.appConfig.apiUrl}/free_spin_template/templates/${templateUUID}/claim`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  })
    .then(response => response.text())
    .then(response => parseJson(response))
    .then(response => (response.freeSpinUUID ? { data: response } : { error: response }));
};

module.exports = {
  claimFreeSpinTemplate,
};
