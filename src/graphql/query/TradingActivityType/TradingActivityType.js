const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLFloat } = require('graphql');
const BigInt = require('graphql-bigint');

const { CommandsEnum } = require('./TradingActivityEnums');

const TradingActivityType = new GraphQLObjectType({
  name: 'TradingActivity',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    tradeId: { type: new GraphQLNonNull(GraphQLInt) },
    login: { type: new GraphQLNonNull(GraphQLInt) },
    symbol: { type: GraphQLString },
    digits: { type: GraphQLInt },
    cmd: { type: CommandsEnum },
    volume: { type: GraphQLInt },
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
    storage: { type: GraphQLFloat },
    profit: { type: GraphQLFloat },
    taxes: { type: GraphQLFloat },
    magic: { type: GraphQLInt },
    comment: { type: GraphQLString },
    timestamp: { type: BigInt },
  }),
});

module.exports = TradingActivityType;
