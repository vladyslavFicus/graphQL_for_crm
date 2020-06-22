const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const ResponseType = require('../common/types/ResponseType');
const {
  rules: { getRules, getRulesRetention },
  metabase: { getMetabaseToken },
} = require('../common/resolvers');
const StatisticsType = require('./StatisticsType');
const HierarchyQueryType = require('./HierarchyQueryType');
const RuleType = require('./RuleType');
const { RuleTypeEnum } = require('./RuleType/RuleEnums');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    statistics: {
      type: StatisticsType,
      resolve: () => ({}),
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
