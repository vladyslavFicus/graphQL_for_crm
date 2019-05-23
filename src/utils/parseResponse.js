const { isEmpty } = require('lodash');
const parseJson = require('./parseJson');
const Logger = require('./logger');
const { mapErrorsCodes } = require('../constants/errors');

function parseResponse(data, status, url) {
  const response = data && typeof data === 'string' ? parseJson(data) : data;

  if (response.parseError) {
    Logger.error({
      // * and _ this is markdown for better look in Slack
      message: `*Error*: Cannot parse to JSON.\n` + `*URL*: ${url}\n` + `*Data*: ${data}\n`,
    });
  }

  if (status >= 400 || response.parseError) {
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
