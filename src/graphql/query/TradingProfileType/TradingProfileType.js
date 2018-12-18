const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
} = require('graphql');
const {
  AquisitionStatusesEnum,
  KYCStatusesEnum,
  SalesStatusesEnum,
  RetentionStatusesEnum,
} = require('./TradingProfileEnums');
const OperatorType = require('../OperatorType');
const { getOperatorFromCache } = require('../../../utils/operatorUtils');

const representativeResolver = fieldName => ({ [fieldName]: repId }, _, { headers: { authorization } }) => {
  if (!repId) {
    return {};
  }

  return getOperatorFromCache(repId, authorization);
};

const Mt4UserType = new GraphQLObjectType({
  name: 'Mt4User',
  fields: () => ({
    login: { type: new GraphQLNonNull(GraphQLInt) },
    balance: { type: GraphQLString },
    equity: { type: GraphQLString },
    symbol: { type: GraphQLString },
    leverage: { type: GraphQLString },
    group: { type: GraphQLString },
    closedTradeProfit: { type: GraphQLFloat },
    closedTradeAmount: { type: GraphQLFloat },
    name: { type: GraphQLString },
    margin: { type: GraphQLString },
    createdBy: { type: GraphQLString },
    credit: { type: GraphQLString },
  }),
});

const TradingProfileType = new GraphQLObjectType({
  name: 'TradingProfile',
  fields: () => ({
    isTestUser: { type: new GraphQLNonNull(GraphQLBoolean) },
    aquisitionRep: {
      type: OperatorType,
      resolve: representativeResolver('aquisitionRep'),
    },
    aquisitionStatus: { type: new GraphQLNonNull(AquisitionStatusesEnum) },
    kycStatus: { type: KYCStatusesEnum },
    salesRep: {
      type: OperatorType,
      resolve: representativeResolver('salesRep'),
    },
    salesStatus: { type: new GraphQLNonNull(SalesStatusesEnum) },
    retentionRep: {
      type: OperatorType,
      resolve: representativeResolver('retentionRep'),
    },
    retentionStatus: { type: new GraphQLNonNull(RetentionStatusesEnum) },
    kycRep: {
      type: OperatorType,
      resolve: representativeResolver('kycRep'),
    },
    balance: { type: GraphQLString },
    credit: { type: GraphQLString },
    equity: { type: GraphQLString },
    baseCurrencyBalance: { type: GraphQLString },
    baseCurrencyEquity: { type: GraphQLString },
    mt4Users: { type: new GraphQLList(Mt4UserType) },
    firstDepositDate: { type: GraphQLString },
    lastDepositDate: { type: GraphQLString },
    firstWithdrawalDate: { type: GraphQLString },
    lastWithdrawalDate: { type: GraphQLString },
    depositCount: { type: GraphQLInt },
    withdrawalCount: { type: GraphQLInt },
    closedTradeProfit: { type: GraphQLFloat },
    closedTradeAmount: { type: GraphQLFloat },
    margin: { type: GraphQLFloat },
    marginLevel: { type: GraphQLFloat },
  }),
});

module.exports = TradingProfileType;
