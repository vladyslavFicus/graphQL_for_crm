const { isEmpty } = require('lodash');
const parseJson = require('./parseJson');
const { mapErrorsCodes } = require('../constants/errors');

function parseResponse(data, status) {
  const response = parseJson(data);

  if (status >= 400) {
    return {
      error: !isEmpty(response) ? response.error || response.jwtError || response : mapErrorsCodes[status],
    };
  }

  return {
    data: response,
  };
}

module.exports = parseResponse;
