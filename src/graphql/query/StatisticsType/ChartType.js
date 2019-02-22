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

const CountResponseType = new GraphQLObjectType({
  name: 'CountResponseType',
  fields: () => ({
    value: { type: new GraphQLNonNull(GraphQLInt) },
    error: { type: GraphQLString },
  }),
});

const ChartTotalsType = new GraphQLObjectType({
  name: 'ChartTotalsType',
  fields: () => ({
    today: { type: CountResponseType },
    month: { type: CountResponseType },
    total: { type: CountResponseType },
  }),
});

module.exports = {
  ChartDataType,
  ChartTotalsType,
  ChartStatisticType,
};
