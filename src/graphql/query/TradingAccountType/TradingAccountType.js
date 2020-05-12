const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');
const { getOperator } = require('../../common/resolvers/operators');
const Mt4Type = require('../Mt4Type');
const OperatorType = require('../OperatorType');

const LastLeverageChangeRequest = new GraphQLObjectType({
  name: 'LastLeverageChangeRequest',
  fields: () => ({
    changeLeverageFrom: { type: GraphQLString },
    changeLeverageTo: { type: GraphQLString },
    status: { type: GraphQLString },
    createDate: { type: GraphQLString },
  }),
});

const TradingAccountProfileType = new GraphQLObjectType({
  name: 'TradingAccountProfileType',
  fields: () => ({
    uuid: { type: GraphQLString },
    fullName: { type: GraphQLString },
  }),
});

const TradingAccountAffiliateType = new GraphQLObjectType({
  name: 'TradingAccountAffiliateType',
  fields: () => ({
    affiliateType: { type: GraphQLString },
    source: { type: GraphQLString },
  }),
});

const TradingAccountType = new GraphQLObjectType({
  name: 'TradingAccountQuery',
  fields: () => ({
    mt4: {
      type: Mt4Type,
      resolve: () => ({}),
    },
    accountUUID: { type: GraphQLString },
    accountType: { type: GraphQLString },
    archived: { type: GraphQLBoolean },
    balance: { type: GraphQLFloat },
    brandId: { type: GraphQLString },
    closedTradeProfit: { type: GraphQLFloat },
    createdAt: { type: GraphQLString },
    createdBy: { type: GraphQLString },
    credit: { type: GraphQLFloat },
    currency: { type: GraphQLString },
    group: { type: GraphQLString },
    leverage: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLInt) },
    margin: { type: GraphQLFloat },
    name: { type: GraphQLString },
    platformType: { type: GraphQLString },
    profileUUID: { type: GraphQLString },
    readOnly: { type: GraphQLBoolean },
    readOnlyUpdateTime: { type: GraphQLString },
    readOnlyUpdatedBy: { type: GraphQLString },
    equity: { type: GraphQLFloat },
    closedTradeAmount: { type: GraphQLFloat },
    serverId: { type: GraphQLInt },
    operator: {
      type: OperatorType,
      resolve: getOperator('readOnlyUpdatedBy'),
    },
    lastLeverageChangeRequest: { type: LastLeverageChangeRequest },
    profile: { type: TradingAccountProfileType },
    affiliate: { type: TradingAccountAffiliateType },
  }),
});

module.exports = TradingAccountType;
