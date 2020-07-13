const { get } = require('lodash');
const Logger = require('../../../lib/Logger');

/**
 * Logging all errors except of skip list
 *
 * @param error
 * @return {*}
 */
module.exports = (error) => {
  const skip = [
    'UNAUTHENTICATED',
    'BAD_USER_INPUT',
    'PERSISTED_QUERY_NOT_FOUND',
  ].includes(get(error, 'extensions.code'));

  if (!skip) {
    Logger.error(error);
  }

  return error;
};
