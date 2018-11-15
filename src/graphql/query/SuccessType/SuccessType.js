const { GraphQLObjectType, GraphQLNonNull, GraphQLBoolean } = require('graphql');

const SuccessType = new GraphQLObjectType({
  name: 'SuccessType',
  fields: () => ({
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

module.exports = SuccessType;
