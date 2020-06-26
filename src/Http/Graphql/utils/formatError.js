const { AuthenticationError, UserInputError } = require('apollo-server-express');
const Logger = require('../../../lib/Logger');

module.exports = (error) => {
  const isAuthenticationError = error.originalError instanceof AuthenticationError;
  const isUserInputError = error.originalError instanceof UserInputError;

  // Logging all errors except AuthenticationError and UserInputError
  if (!isAuthenticationError && !isUserInputError) {
    Logger.error(error);
  }

  return error;
};
