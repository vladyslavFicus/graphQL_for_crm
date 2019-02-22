const { GraphQLObjectType, GraphQLNonNull, GraphQLBoolean } = require('graphql');
const ErrorType = require('../../common/types/ErrorType');

const SuccessType = new GraphQLObjectType({
  name: 'SuccessType',
  fields: () => ({
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
    error: { type: ErrorType },
  }),
});

module.exports = SuccessType;
