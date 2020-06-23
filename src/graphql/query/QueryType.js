const { GraphQLObjectType } = require('graphql');
const StatisticsType = require('./StatisticsType');
const HierarchyQueryType = require('./HierarchyQueryType');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    statistics: {
      type: StatisticsType,
      resolve: () => ({}),
    },
    hierarchy: {
      type: HierarchyQueryType,
      resolve: () => ({}),
    },
  }),
});

module.exports = QueryType;
