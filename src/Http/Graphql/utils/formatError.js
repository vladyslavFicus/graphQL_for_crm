const { AuthenticationError, UserInputError } = require('@hrzn/apollo-datasource');
const Logger = require('../../../lib/Logger');

/**
 * Logging all errors except AuthenticationError and UserInputError
 *
 * @param error
 * @return {*}
 */
module.exports = (error) => {
  const skip = [
    error.originalError instanceof AuthenticationError,
    error.originalError instanceof UserInputError,
  ].some(v => v);

  if (!skip) {
    Logger.error(error);
  }

  return error;
};
