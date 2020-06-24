const { isEmpty } = require('lodash');
const parseJson = require('./parseJson');
const Logger = require('../lib/Logger');
const { mapErrorsCodes } = require('../constants/errors');

function parseResponse(data, status, url) {
  const response = data && typeof data === 'string' ? parseJson(data) : data;

  if (response.parseError) {
    Logger.error({
      // * and _ this is markdown for better look in Slack
      message: `*Error*: Cannot parse to JSON.\n *URL*: ${url}\n *Data*: ${data}\n`,
    });
  }

  if (status >= 400 || response.parseError) {
    let error = null;
    let fieldsErrors = null;
    let errorParameters = null;

    if (!isEmpty(response)) {
      error = response.error || response.jwtError || response.message || response;
      fieldsErrors = response.fields_errors;
      errorParameters = response.errorParameters;

      if (typeof error !== 'string') {
        error = JSON.stringify(error);
      }
    } else {
      error = mapErrorsCodes[status];
    }

    return {
      error: {
        error,
        fields_errors: fieldsErrors,
        errorParameters,
      },
    };
  }

  return {
    data: response,
  };
}

module.exports = parseResponse;
