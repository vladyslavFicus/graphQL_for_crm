const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require('graphql');
const SuccessType = require('../../query/SuccessType');

const {
  tradingActivities: { changeOriginalAgent },
} = require('../../common/resolvers');

const TradingActivityType = new GraphQLObjectType({
  name: 'TradingActivityMutation',
  fields: () => ({
    changeOriginalAgent: {
      args: {
        tradeId: { type: new GraphQLNonNull(GraphQLInt) },
        agentId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: changeOriginalAgent,
    },
  }),
});

module.exports = TradingActivityType;
