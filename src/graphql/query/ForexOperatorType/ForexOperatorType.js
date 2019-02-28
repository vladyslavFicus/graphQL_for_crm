const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'ForexOperatorType',
  fields: () => ({
    permission: {
      type: new GraphQLObjectType({
        name: 'ForexOperatorPermissionType',
        fields: () => ({
          allowedIpAddresses: { type: new GraphQLList(GraphQLString) },
          forbiddenCountries: { type: new GraphQLList(GraphQLString) },
        }),
      }),
    },
  }),
});
