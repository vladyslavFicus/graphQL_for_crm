const fetch = require('./fetch');
const parseJson = require('../utils/parseJson');

module.exports = function(currency) {
  return fetch(`https://api.fixer.io/latest?base=${currency}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.text())
    .then(response => parseJson(response));
};
