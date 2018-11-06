const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'SignInIp',
  fields: () => ({
    country: { type: GraphQLString },
    sessionStart: { type: new GraphQLNonNull(GraphQLString) },
    browserAgent: { type: new GraphQLNonNull(GraphQLString) },
    ip: { type: new GraphQLNonNull(GraphQLString) },
    sessionId: { type: new GraphQLNonNull(GraphQLString) },
    uuid: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
