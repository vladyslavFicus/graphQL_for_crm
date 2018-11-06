const { v4 } = require('uuid');
const JSON = require('circular-json');
const Logger = require('../utils/logger');

const logRequest = ({ query, variables, operationName }, requestId, options, stringify) => {
  if (!options.pretty) {
    query = query.replace(/\s*\n\s*/g, ' ');
  }

  Logger.info({
    message: `${operationName}\nquery\n${query}\nvariables\n${stringify(variables)}`,
    meta: {
      query,
      variables,
    },
    requestId,
  });
};

const logResponse = (response, requestId, { query, variables, operationName }, stringify) => {
  if (!response.errors) {
    Logger.info({
      message: `${stringify(response)}`,
      meta: {
        query,
        variables,
      },
      requestId,
    });
  } else if (response.errors && response.errors.some(({ status }) => status === 401)) {
    const warnings = response.errors.map(({ message }) => message).join(', ');

    Logger.warn(
      {
        message: `${stringify(warnings)}`,
        meta: {
          query,
          variables,
        },
        requestId,
      },
      `${operationName}-WARNING`
    );
  } else {
    const errors = response.errors.map(({ message }) => message).join(', ');

    Logger.error(
      {
        message: `${stringify(errors)}`,
        meta: {
          query,
          variables,
        },
        requestId,
      },
      `${operationName}-ERROR`
    );
  }
};

module.exports = graphqlLogger = (
  options = {
    logging: true,
    pretty: true,
  }
) => {
  return (req, res, next) => {
    if (options.logging) {
      let stringify = options.pretty ? json => JSON.stringify(json, 0, 2) : json => JSON.stringify(json);
      const requestId = v4();

      if (Array.isArray(req.body)) {
        req.body.forEach(i => {
          logRequest(i, requestId, options, stringify);
        });
      } else {
        logRequest(req.body, requestId, options, stringify);
      }

      let originalWrite = res.write;

      res.write = data => {
        const response = JSON.parse(data);

        if (Array.isArray(response)) {
          response.forEach((resItem, index) => {
            logResponse(resItem, requestId, req.body[index], stringify);
          });
        } else {
          logResponse(response, requestId, req.body, stringify);
        }

        return originalWrite.call(res, data);
      };
    }

    next();
  };
};
