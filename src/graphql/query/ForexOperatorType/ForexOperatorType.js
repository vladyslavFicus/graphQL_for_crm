const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'ForexOperatorType',
  fields: () => ({
    permission: {
      type: new GraphQLObjectType({
        name: 'ForexOperatorPermissionType',
        fields: () => ({
          allowedIpAddresses: { type: new GraphQLList(GraphQLString) },
          forbiddenCountries: { type: new GraphQLList(GraphQLString) },
          showNotes: { type: GraphQLBoolean },
          showSalesStatus: { type: GraphQLBoolean },
          showFTDAmount: { type: GraphQLBoolean },
        }),
      }),
    },
  }),
});
