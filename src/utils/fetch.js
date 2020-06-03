const config = require('config');
const contextService = require('request-context');
const { ApolloError, AuthenticationError } = require('apollo-server-express');
const { isEmpty } = require('lodash');
const jwtDecode = require('jwt-decode');
const parseJson = require('../utils/parseJson');
const Logger = require('../lib/Logger');
const parseResponse = require('./parseResponse');

const logResponseError = (response, url, { headers, method }, messageTitle) => {
  const serviceName = url.replace(config.get('apiUrl'), '').split('/')[1];
  const failedResponse = parseJson(response);
  const error = failedResponse.message || failedResponse.error || failedResponse.jwtError || 'Something went wrong';
  const errorDescription = typeof error === 'string' ? error : JSON.stringify(error);
  const { sub, role, department, uuid, brandId } = jwtDecode(headers.authorization);

  Logger.error({
    // * and _ this is markdown for better look in Slack
    message:
      `${messageTitle} - *${serviceName}*. Error: ${errorDescription} \n` +
      `*Brand*: ${brandId} \n` +
      `*URL*: ${url}, _method_: ${method} \n` +
      `*Operator*: _id_ - ${uuid}, _role_ - ${role}, _department_ - ${department}, _email_: ${sub}`,
    status: response.status,
    response: failedResponse,
    originService: serviceName,
    headers,
  });

  return {
    json: () =>
      new Promise(resolve => {
        resolve({
          error: {
            error: errorDescription,
            fields_errors: !isEmpty(response) ? response.fields_errors : null,
          },
        });
      }),
    text: () =>
      new Promise(resolve => {
        resolve(response);
      }),
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
    let error;

    if (
      response.status &&
      (response.status === 401 || (response.status === 400 && response.headers.get('HRZN-JwtError')))
    ) {
      error = new AuthenticationError('You must be authenticated');
    }

    return response.text().then(res => {
      switch (response.status) {
        case 400: {
          const { jwtError } = parseJson(res);

          if (jwtError) {
            error = new AuthenticationError('You must be authenticated');
          }

          break;
        }
        case 403: {
          if (res.includes('ACCESS_FORBIDDEN')) {
            return logResponseError(res, url, options, 'JWT error');
          }

          break;
        }
        case 500: {
          return logResponseError(res, url, options, 'Service Down');
        }
        case 502: {
          return logResponseError(res, url, options, 'Bad gateway');
        }
        case 503: {
          return logResponseError(res, url, options, 'Service unavailable');
        }
      }

      Logger.info({
        message: res,
        url,
        status: response.status,
        error,
      });

      if (error) {
        error = error || new ApolloError(`${response.status}: ${response.statusText}`);

        Object.assign(error, {
          response: {
            url: response.url,
            status: response.status,
            statusText: response.statusText,
            body: parseJson(res),
          },
        });

        throw error;
      }

      return new Promise(resolve => {
        resolve({
          ...response,
          json: () =>
            new Promise(resolve => {
              resolve(parseResponse(res, response.status, url));
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
