const contextService = require('request-context');
const HttpError = require('../graphql/HttpError');
const Logger = require('./logger');
const parseResponse = require('./parseResponse');
const { ENABLE_LOGGING } = process.env;

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
      throw new HttpError('You must be authenticated', 401);
    }

    return response.text().then(res => {
      if (!!ENABLE_LOGGING) {
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
