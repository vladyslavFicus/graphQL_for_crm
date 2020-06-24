const { GraphQLObjectType, GraphQLList } = require('graphql');

const ErrorType = require('./ErrorType');

const ResponseType = (ContentType, customName = '') => new GraphQLObjectType({
  name: customName || `Response__${ContentType.name}`,
  fields: () => ({
    error: { type: ErrorType },
    errors: { type: new GraphQLList(ErrorType) },
    ...(ContentType && {
      data: {
        type: ContentType,
        resolve(_) {
          return Array.isArray(_) ? _ : _.data;
        },
      },
    }),
  }),
});

module.exports = ResponseType;
