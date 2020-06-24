const { GraphQLObjectType } = require('graphql');
const HierarchyQueryType = require('./HierarchyQueryType');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hierarchy: {
      type: HierarchyQueryType,
      resolve: () => ({}),
    },
  }),
});

module.exports = QueryType;
