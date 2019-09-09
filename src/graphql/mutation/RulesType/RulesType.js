const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType,
} = require('graphql');
const {
  rules: { createRule, createRuleRetention, deleteRule, deleteRuleRetention },
} = require('../../common/resolvers');
const { ResponseType } = require('../../common/types');
const RuleType = require('../../query/RuleType');
const { RuleTypeEnum, RuleActionTypeEnum } = require('../../query/RuleType/RuleEnums');

const RuleActionsInputType = new GraphQLInputObjectType({
  name: 'RuleActionsInputType',
  fields: () => ({
    parentBranch: { type: GraphQLString },
    parentUser: { type: GraphQLString },
    ruleType: { type: RuleActionTypeEnum },
  }),
});

const RuleUuidType = new GraphQLObjectType({
  name: 'RuleUuidType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RulesMutation = new GraphQLObjectType({
  name: 'RulesMutation',
  fields: () => ({
    createRule: {
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        countries: { type: new GraphQLList(GraphQLString) },
        languages: { type: new GraphQLList(GraphQLString) },
        affiliateUUIDs: { type: new GraphQLList(GraphQLString) },
        sources: { type: new GraphQLList(GraphQLString) },
        priority: { type: new GraphQLNonNull(GraphQLInt) },
        type: { type: new GraphQLNonNull(RuleTypeEnum) },
        actions: { type: new GraphQLNonNull(new GraphQLList(RuleActionsInputType)) },
      },
      type: ResponseType(RuleType, 'CreateRule'),
      resolve: createRule,
    },
    createRuleRetention: {
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        countries: { type: new GraphQLList(GraphQLString) },
        languages: { type: new GraphQLList(GraphQLString) },
        priority: { type: new GraphQLNonNull(GraphQLInt) },
        actions: { type: new GraphQLNonNull(new GraphQLList(RuleActionsInputType)) },
        depositAmountFrom: { type: new GraphQLNonNull(GraphQLString) },
        depositAmountTo: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(RuleType, 'CreateRuleRetention'),
      resolve: createRuleRetention,
    },
    deleteRule: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(RuleUuidType, 'DeletedRuleUuid'),
      resolve: deleteRule,
    },
    deleteRuleRetention: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(RuleUuidType, 'DeletedRuleUuidRetention'),
      resolve: deleteRuleRetention,
    },
  }),
});

module.exports = RulesMutation;
