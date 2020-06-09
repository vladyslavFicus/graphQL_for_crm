const { get } = require('lodash');
const { AuthenticationError } = require('apollo-server-express');

module.exports = error => {
  const status = get(error, 'extensions.response.status');
  const body = get(error, 'extensions.response.body', '');

  if (status === 400 && Array.isArray(body) && body.includes('jwtError')) {
    throw new AuthenticationError('You must be authenticated');
  }

  return error;
};
