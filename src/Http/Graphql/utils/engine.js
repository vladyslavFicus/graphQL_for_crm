const { get } = require('lodash');

module.exports = {
  reportSchema: true,

  // Skip error reporting to Apollo Studio for concrete errors
  rewriteError(error) {
    const skip = [
      'UNAUTHENTICATED',
      'BAD_USER_INPUT',
    ].includes(get(error, 'extensions.code'));

    if (skip) {
      return null;
    }

    return error;
  },
};
