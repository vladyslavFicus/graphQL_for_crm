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
  ClientTypeEnum,
} = require('./TradingProfileEnums');
const OperatorType = require('../OperatorType');
const { getOperator } = require('../../common/resolvers/operators');

const AffiliateDocumentType = new GraphQLObjectType({
  name: 'AffiliateDocumentType',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ affiliateUuid }) => affiliateUuid,
    },
    affiliateUuid: { type: new GraphQLNonNull(GraphQLString) },
    source: { type: GraphQLString },
    referral: { type: GraphQLString },
    affiliate: {
      type: OperatorType,
      resolve: getOperator('affiliateUuid'),
    },
  }),
});

const PassportType = new GraphQLObjectType({
  name: 'passport',
  fields: () => ({
    passportNumber: { type: GraphQLString },
    passportIssueDate: { type: GraphQLString },
    expirationDate: { type: GraphQLString },
    countryOfIssue: { type: GraphQLString },
  }),
});

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
    isTestUser: { type: GraphQLBoolean },
    aquisitionRep: {
      type: OperatorType,
      resolve: getOperator('aquisitionRep'),
    },
    aquisitionStatus: { type: AquisitionStatusesEnum },
    kycStatus: { type: KYCStatusesEnum },
    salesRep: {
      type: OperatorType,
      resolve: getOperator('salesRep'),
    },
    salesStatus: { type: SalesStatusesEnum },
    retentionRep: {
      type: OperatorType,
      resolve: getOperator('retentionRep'),
    },
    clientType: { type: ClientTypeEnum },
    retentionStatus: { type: RetentionStatusesEnum },
    kycRep: {
      type: OperatorType,
      resolve: getOperator('kycRep'),
    },
    balance: { type: GraphQLString },
    credit: { type: GraphQLString },
    equity: { type: GraphQLString },
    convertedFromLeadUuid: { type: GraphQLString },
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
    phone1: { type: GraphQLString },
    phone2: { type: GraphQLString },
    languageCode: { type: GraphQLString },
    affiliateProfileDocument: {
      type: AffiliateDocumentType,
    },
    passport: { type: PassportType },
  }),
});

module.exports = TradingProfileType;
