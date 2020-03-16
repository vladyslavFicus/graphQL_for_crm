const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLFloat } = require('graphql');
const BigInt = require('graphql-bigint');
const { getOperator } = require('../../common/resolvers/operators');
const OperatorType = require('../OperatorType');
const { operationTypesEnum } = require('./TradingActivityEnums');

const TradingActivityType = new GraphQLObjectType({
  name: 'TradingActivity',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    tradeId: { type: new GraphQLNonNull(GraphQLInt) },
    tradeType: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLInt) },
    platformType: { type: GraphQLString },
    symbol: { type: GraphQLString },
    digits: { type: GraphQLInt },
    operationType: { type: operationTypesEnum },
    volume: { type: GraphQLFloat },
    openTime: { type: BigInt },
    closeTime: { type: BigInt },
    openPrice: { type: GraphQLFloat },
    closePrice: { type: GraphQLFloat },
    openRate: { type: GraphQLFloat },
    closeRate: { type: GraphQLFloat },
    stopLoss: { type: GraphQLFloat },
    takeProfit: { type: GraphQLFloat },
    expiration: { type: BigInt },
    reason: { type: GraphQLString },
    commission: { type: GraphQLFloat },
    commissionAgent: { type: GraphQLFloat },
    swap: { type: GraphQLFloat },
    profit: { type: GraphQLFloat },
    taxes: { type: GraphQLFloat },
    magic: { type: GraphQLInt },
    comment: { type: GraphQLString },
    timestamp: { type: BigInt },
    tradeStatus: { type: GraphQLString },
    originalAgent: {
      type: OperatorType,
      resolve: getOperator('agentId'),
    },
  }),
});

module.exports = TradingActivityType;
