const fetch = require('./fetch');
const getBaseUrl = require('./getBaseUrl');
const buildQueryString = require('./buildQueryString');

// # TODO: Remove after 'note' dataloader will be removed
const getNotes = ({ size, page, ...args }, authorization) => {
  return fetch(`${getBaseUrl('note')}/search?${buildQueryString({ size, page })}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization,
      'content-type': 'application/json',
    },
    body: JSON.stringify(args),
  }).then(response => response.json());
};

module.exports = { getNotes };
