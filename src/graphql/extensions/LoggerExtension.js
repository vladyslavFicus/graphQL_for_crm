const { print } = require('graphql');
const { get } = require('lodash');
const jwtDecode = require('jwt-decode');
const Logger = require('../../utils/logger');

class LogFunctionExtension {
  constructor() {
    this.requestContext = {};
  }

  requestDidStart({ context, operationName, queryString, parsedQuery, variables, ...o }) {
    const query = queryString || print(parsedQuery);
    const meta = {
      query,
      variables,
      brand: context.brand,
    };

    Logger.info({
      headers: context.headers,
      meta,
      requestId: context.requestId,
      operationName,
    });

    this.requestContext[context.requestId] = {
      meta,
      operationName,
    };

    return (...errors) => {
      if (errors.length) {
        Logger.error(
          {
            authorization: context.headers.authorization ? jwtDecode(context.headers.authorization) : null,
            message: errors.map(({ message }) => message).join(', '),
            headers: context.headers,
            requestId: context.requestId,
            meta,
            operationName,
          },
          `${operationName}-ERROR`
        );
      }
    };
  }

  willSendResponse({ graphqlResponse, context }) {
    const { operationName, meta } = this.requestContext[context.requestId];

    if (!graphqlResponse.errors) {
      Logger.info({
        message: JSON.stringify(graphqlResponse.data),
        headers: context.headers,
        requestId: context.requestId,
        meta,
      });
    } else if (graphqlResponse.errors.some(error => get(error, 'extensions.code') === 'UNAUTHENTICATED')) {
      const warnings = graphqlResponse.errors.map(({ message }) => message).join(', ');

      Logger.warn(
        {
          message: warnings,
          headers: context.headers,
          requestId: context.requestId,
          meta,
          operationName,
        },
        `${operationName}-WARNING`
      );
    } else {
      const errors = graphqlResponse.errors.map(({ message }) => message).join(', ');

      Logger.error(
        {
          authorization: context.headers.authorization ? jwtDecode(context.headers.authorization) : null,
          message: errors,
          headers: context.headers,
          requestId: context.requestId,
          meta,
          operationName,
        },
        `${operationName}-ERROR`
      );
    }

    delete this.requestContext[context.requestId];
  }
}

module.exports = LogFunctionExtension;
