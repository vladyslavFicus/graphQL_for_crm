const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
} = require('graphql');
const { getOperator } = require('../../common/resolvers/operators');
const OperatorType = require('../OperatorType');
const {
  AquisitionStatusesEnum,
  KYCStatusesEnum,
  SalesStatusesEnum,
  RetentionStatusesEnum,
  ClientTypeEnum,
} = require('./TradingProfileEnums');

const AffiliateDocumentType = new GraphQLObjectType({
  name: 'AffiliateDocumentType',
  fields: () => ({
    affiliateUuid: { type: new GraphQLNonNull(GraphQLString) },
    source: { type: GraphQLString },
    referral: { type: GraphQLString },
    sms: { type: GraphQLString },
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
    balance: { type: GraphQLFloat },
    equity: { type: GraphQLFloat },
    symbol: { type: GraphQLString },
    leverage: { type: GraphQLString },
    group: { type: GraphQLString },
    closedTradeProfit: { type: GraphQLFloat },
    closedTradeAmount: { type: GraphQLFloat },
    name: { type: GraphQLString },
    margin: { type: GraphQLFloat },
    createdBy: { type: GraphQLString },
    credit: { type: GraphQLFloat },
    isReadOnly: { type: GraphQLBoolean },
    readOnlyUpdateTime: { type: GraphQLString },
    readOnlyUpdatedBy: {
      type: OperatorType,
      resolve: getOperator('readOnlyUpdatedBy'),
    },
    accountType: { type: GraphQLString },
    archived: { type: GraphQLBoolean },
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
    baseCurrencyCredit: { type: GraphQLString },
    baseCurrencyEquity: { type: GraphQLString },
    baseCurrencyMargin: { type: GraphQLString },
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
    email2: { type: GraphQLString },
    affiliateProfileDocument: {
      type: AffiliateDocumentType,
    },
    passport: { type: PassportType },
    migrationId: { type: GraphQLString },
    fnsStatus: { type: GraphQLString },
    countrySpecificIdentifier: { type: GraphQLString },
    countrySpecificIdentifierType: { type: GraphQLString },
    fatca: {
      type: new GraphQLObjectType({
        name: 'FatcaType',
        fields: () => ({
          provided: { type: GraphQLBoolean },
        }),
      }),
    },
    crs: { type: GraphQLBoolean },
    gdpr: {
      type: new GraphQLObjectType({
        name: 'GDPR',
        fields: () => ({
          sms: { type: GraphQLBoolean },
          email: { type: GraphQLBoolean },
          phone: { type: GraphQLBoolean },
          socialMedia: { type: GraphQLBoolean },
        }),
      }),
    },
    spam: {
      type: new GraphQLObjectType({
        name: 'SPAM',
        fields: () => ({
          marketNews: { type: GraphQLBoolean },
          information: { type: GraphQLBoolean },
          educational: { type: GraphQLBoolean },
          promosAndOffers: { type: GraphQLBoolean },
          statisticsAndSummary: { type: GraphQLBoolean },
        }),
      }),
    },
    webCookies: {
      type: new GraphQLObjectType({
        name: 'webCookies',
        fields: () => ({
          enabled: { type: GraphQLBoolean },
        }),
      }),
    },
    bankDetails: {
      type: new GraphQLObjectType({
        name: 'bankDetails',
        fields: () => ({
          accountHolderName: { type: GraphQLString },
          accountNumber: { type: GraphQLString },
          branchName: { type: GraphQLString },
          city: { type: GraphQLString },
          name: { type: GraphQLString },
          province: { type: GraphQLString },
          swiftCode: { type: GraphQLString },
          withdrawalArea: { type: GraphQLString },
        }),
      }),
    },
    enableInternalTransfer: { type: GraphQLBoolean },
  }),
});

module.exports = TradingProfileType;
