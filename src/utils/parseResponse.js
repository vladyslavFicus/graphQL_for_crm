const { isEmpty } = require('lodash');
const parseJson = require('./parseJson');
const { mapErrorsCodes } = require('../constants/errors');

function parseResponse(data, status) {
  const response = typeof data === 'string' ? parseJson(data) : data;

  if (status >= 400) {
    let error = null;
    let fields_errors = null;

    if (!isEmpty(response)) {
      error = response.error || response.jwtError || response.message || response;
      fields_errors = response.fields_errors;

      if (typeof error !== 'string') {
        error = JSON.stringify(error);
      }
    } else {
      error = mapErrorsCodes[status];
    }

    return {
      error: {
        error,
        fields_errors,
      },
    };
  }

  return {
    data: response,
  };
}

module.exports = parseResponse;
