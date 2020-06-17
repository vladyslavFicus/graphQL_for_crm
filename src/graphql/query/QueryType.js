const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const ResponseType = require('../common/types/ResponseType');
const {
  files: { getFiles, getFilesByProfileUUID, getFileCategoriesList },
  tradingActivities: { getTradingActivities },
  rules: { getRules, getRulesRetention },
  metabase: { getMetabaseToken },
  tradingAccount: { getTradingAccounts, getTradingAccountsList },
} = require('../common/resolvers');
const PageableType = require('../common/types/PageableType');
const { FileType, FileByUuidType } = require('./FileType/FileType');
const TradingAccountType = require('./TradingAccountType');
const TradingAccountsListType = require('./TradingAccountsListType');
const {
  TradingActivityType,
  TradingActivityEnums: { operationTypesEnum, StatusesEnum },
} = require('./TradingActivityType');
const StatisticsType = require('./StatisticsType');
const HierarchyQueryType = require('./HierarchyQueryType');
const RuleType = require('./RuleType');
const { RuleTypeEnum } = require('./RuleType/RuleEnums');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    tradingAccount: {
      type: new GraphQLList(TradingAccountType),
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        accountType: { type: GraphQLString },
      },
      resolve: getTradingAccounts,
    },
    tradingAccountsList: {
      type: ResponseType(PageableType(TradingAccountsListType)),
      args: {
        searchKeyword: { type: GraphQLString },
        accountType: { type: GraphQLString },
        archived: { type: GraphQLBoolean },
        page: { type: GraphQLInt },
        size: { type: GraphQLInt },
      },
      resolve: getTradingAccountsList,
    },
    clientTradingActivity: {
      type: ResponseType(PageableType(TradingActivityType)),
      args: {
        profileUUID: { type: GraphQLString },
        tradeId: { type: GraphQLInt },
        tradeType: { type: GraphQLString },
        openTimeStart: { type: GraphQLString },
        openTimeEnd: { type: GraphQLString },
        closeTimeStart: { type: GraphQLString },
        closeTimeEnd: { type: GraphQLString },
        operationType: { type: operationTypesEnum },
        symbol: { type: GraphQLString },
        volumeFrom: { type: GraphQLFloat },
        volumeTo: { type: GraphQLFloat },
        status: { type: StatusesEnum },
        sortColumn: { type: GraphQLString },
        sortDirection: { type: GraphQLString },
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        loginIds: { type: new GraphQLList(GraphQLInt) },
        agentIds: { type: new GraphQLList(GraphQLString) },
      },
      resolve: getTradingActivities,
    },
    statistics: {
      type: StatisticsType,
      resolve: () => ({}),
    },
    filesByUuid: {
      type: ResponseType(GraphQLList(FileByUuidType), 'FilesByUuid'),
      resolve: getFilesByProfileUUID,
      args: {
        size: { type: GraphQLInt },
        page: { type: GraphQLInt },
        clientUUID: { type: new GraphQLNonNull(GraphQLString) },
        searchBy: { type: GraphQLString },
        fileCategory: { type: GraphQLString },
        uploadDateFrom: { type: GraphQLString },
        uploadDateTo: { type: GraphQLString },
      },
    },
    fileList: {
      type: ResponseType(PageableType(FileType, {}, 'FileList')),
      resolve: getFiles,
      args: {
        size: { type: GraphQLInt },
        page: { type: GraphQLInt },
        searchBy: { type: GraphQLString },
        uploadedDateFrom: { type: GraphQLString },
        uploadedDateTo: { type: GraphQLString },
        targetUuid: { type: GraphQLString },
        verificationType: { type: GraphQLString },
        documentType: { type: GraphQLString },
      },
    },
    filesCategoriesList: {
      type: ResponseType(
        new GraphQLObjectType({
          name: 'filesCategoriesType',
          fields: () => ({
            DOCUMENT_VERIFICATION: { type: new GraphQLList(GraphQLString) },
            ADDRESS_VERIFICATION: { type: new GraphQLList(GraphQLString) },
            OTHER: { type: new GraphQLList(GraphQLString) },
          }),
        }),
        'filesCategoriesListType'
      ),
      resolve: getFileCategoriesList,
    },
    hierarchy: {
      type: HierarchyQueryType,
      resolve: () => ({}),
    },
    rules: {
      type: ResponseType(new GraphQLList(RuleType), 'RulesType'),
      args: {
        uuid: { type: new GraphQLList(GraphQLString) },
        country: { type: GraphQLString },
        language: { type: GraphQLString },
        createdByOrUuid: { type: GraphQLString },
        name: { type: GraphQLString },
        type: { type: RuleTypeEnum },
        parentId: { type: GraphQLString },
        branchUuid: { type: GraphQLString },
        affiliateId: { type: GraphQLString },
        operatorUuids: { type: new GraphQLList(GraphQLString) },
        uuids: { type: new GraphQLList(GraphQLString) },
      },
      resolve: getRules,
    },
    rulesRetention: {
      type: ResponseType(new GraphQLList(RuleType), 'RulesTypeRetention'),
      args: {
        uuid: { type: new GraphQLList(GraphQLString) },
        country: { type: GraphQLString },
        language: { type: GraphQLString },
        createdByOrUuid: { type: GraphQLString },
        name: { type: GraphQLString },
        parentId: { type: GraphQLString },
      },
      resolve: getRulesRetention,
    },
    getMetabaseToken: {
      type: new GraphQLObjectType({
        name: 'MetabaseTokenType',
        fields: () => ({ token: { type: new GraphQLNonNull(GraphQLString) } }),
      }),
      args: {
        agent_id: { type: GraphQLString },
      },
      resolve: getMetabaseToken,
    },
  }),
});

module.exports = QueryType;
