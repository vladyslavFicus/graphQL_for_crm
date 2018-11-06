const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

const ChartDataType = new GraphQLObjectType({
  name: 'ChartData',
  fields: () => ({
    entries: { type: new GraphQLNonNull(GraphQLInt) },
    entryDate: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const ChartStatisticType = new GraphQLObjectType({
  name: 'ChartStatistic',
  fields: () => ({
    total: { type: new GraphQLNonNull(GraphQLInt) },
    items: { type: new GraphQLList(ChartDataType) },
  }),
});

module.exports = {
  ChartDataType,
  ChartStatisticType,
};
