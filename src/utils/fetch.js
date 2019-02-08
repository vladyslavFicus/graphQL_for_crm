const contextService = require('request-context');
const { AuthenticationError } = require('apollo-server-express');
const parseJson = require('../utils/parseJson');
const Logger = require('./logger');
const parseResponse = require('./parseResponse');

module.exports = function(url, config) {
  const expressRequest = contextService.get('request:req');
  const options = {
    ...config,
    headers: {
      ...(config && config.headers ? config.headers : {}),
      'X-Forwarded-For': expressRequest.header('x-forwarded-for') || expressRequest.connection.remoteAddress,
      'User-Agent': expressRequest.header('user-agent'),
    },
  };

  return fetch(url, options).then(response => {
    if (
      response.status &&
      (response.status === 401 || (response.status === 400 && response.headers.get('HRZN-JwtError')))
    ) {
      throw new AuthenticationError('You must be authenticated');
    }

    return response.text().then(res => {
      // Throw authentication error if something with JWT token
      if (response.status === 400) {
        const { jwtError } = parseJson(res);

        if (jwtError) {
          throw new AuthenticationError('You must be authenticated');
        }
      }

      if (global.isLoggingEnabled) {
        Logger.info({
          message: res,
          url,
          status: response.status,
        });
      }

      return new Promise(resolve => {
        resolve({
          ...response,
          json: () =>
            new Promise(resolve => {
              resolve(parseResponse(res, response.status));
            }),
          text: () =>
            new Promise(resolve => {
              resolve(res);
            }),
        });
      });
    });
  });
};
