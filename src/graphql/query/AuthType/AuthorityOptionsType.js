const { GraphQLObjectType } = require('graphql');
const { GraphQLJSONObject } = require('graphql-type-json');

const AuthorityOptionsType = new GraphQLObjectType({
  name: 'AuthorityOptions',
  fields: () => ({
    authoritiesOptions: {
      type: GraphQLJSONObject,
    },
  }),
});

module.exports = AuthorityOptionsType;
