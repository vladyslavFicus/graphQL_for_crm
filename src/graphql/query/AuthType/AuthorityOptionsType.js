const { GraphQLObjectType } = require('graphql');
const { GraphQLJSONObject } = require('graphql-type-json');

const AuthorityOptionsList = new GraphQLObjectType({
  name: 'AuthorityOptionsMethod',
  fields: () => ({
    departmentRole: {
      type: GraphQLJSONObject,
    },
  }),
});

const AuthorityOptionsType = new GraphQLObjectType({
  name: 'AuthorityOptions',
  fields: () => ({
    post: {
      type: AuthorityOptionsList,
    },
    delete: {
      type: AuthorityOptionsList,
    },
  }),
});

module.exports = AuthorityOptionsType;
