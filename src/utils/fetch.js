const contextService = require('request-context');
const { AuthenticationError } = require('apollo-server-express');
const parseJson = require('../utils/parseJson');
const Logger = require('./logger');
const parseResponse = require('./parseResponse');

const logResponseError = (response, url, { headers }, messageTitle) => {
  const serviceName = url.replace(global.appConfig.apiUrl, '').split('/')[1];
  const failedResponse = parseJson(response);
  const error = failedResponse.message || failedResponse.error || failedResponse.jwtError || 'Something went wrong';
  const errorDescription = typeof error === 'string' ? error : JSON.stringify(error);

  Logger.error({
    message: `${messageTitle} - *${serviceName}*. Error: ${errorDescription}`,
    status: response.status,
    response: failedResponse,
    originService: serviceName,
    headers,
  });

  return {
    originService: serviceName,
    failedResponse,
    errorDescription,
  };
};

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
      switch (response.status) {
        case 400: {
          const { jwtError } = parseJson(res);

          if (jwtError) {
            throw new AuthenticationError('You must be authenticated');
          }

          break;
        }
        case 403: {
          const { jwtError } = parseJson(res);

          if (jwtError) {
            const { error } = logResponseError(res, url, options, 'JWT error');

            return { error };
          }

          break;
        }
        case 500: {
          const { error } = logResponseError(res, url, options, 'Service Down');

          return { error };
        }
        case 502: {
          const { error } = logResponseError(res, url, options, 'Bad gateway');

          return { error };
        }
        case 503: {
          const { error } = logResponseError(res, url, options, 'Service unavailable');

          return { error };
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
