const fetch = require('./fetch');
const buildQueryString = require('./buildQueryString');
const parseJson = require('./parseJson');

module.exports = {
  accessValidate: ({ token, url, method, service }) => {
    return fetch(
      `${global.appConfig.apiUrl}/auth/access/validate?${buildQueryString({
        token,
        url,
        method,
        service,
      })}`,
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(response => response.text())
      .then(response => parseJson(response));
  },
};
