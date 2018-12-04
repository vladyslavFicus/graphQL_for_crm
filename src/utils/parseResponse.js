const { isEmpty } = require('lodash');
const parseJson = require('./parseJson');
const { mapErrorsCodes } = require('../constants/errors');

function parseResponse(data, status) {
  const response = typeof data === 'string' ? parseJson(data) : data;

  if (status >= 400) {
    return {
      error: {
        error: !isEmpty(response) ? response.error || response.jwtError || response : mapErrorsCodes[status],
        fields_errors: !isEmpty(response) ? response.fields_errors : null,
      },
    };
  }

  return {
    data: response,
  };
}

module.exports = parseResponse;
