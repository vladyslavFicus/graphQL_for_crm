const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const PartnerType = require('../PartnerType');
const { RuleTypeEnum, RuleActionTypeEnum } = require('./RuleEnums');
const OperatorType = require('../OperatorType');
const { getOperator } = require('../../common/resolvers/operators');

const OperatorSpreadType = new GraphQLObjectType({
  name: 'OperatorSpreadType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    percentage: { type: GraphQLInt },
    parentUser: { type: GraphQLString },
    operator: {
      type: OperatorType,
      resolve: getOperator('parentUser'),
    },
  }),
});

const RuleActionType = new GraphQLObjectType({
  name: 'RuleActionType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    parentBranch: { type: GraphQLString },
    parentUser: { type: GraphQLString },
    ruleType: { type: RuleActionTypeEnum },
    operatorSpreads: { type: new GraphQLList(OperatorSpreadType) },
  }),
});

const RuleType = new GraphQLObjectType({
  name: 'RuleType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    actions: { type: new GraphQLList(RuleActionType) },
    brandId: { type: GraphQLString },
    countries: { type: new GraphQLList(GraphQLString) },
    createdAt: { type: GraphQLString },
    createdBy: { type: GraphQLString },
    deletedAt: { type: GraphQLString },
    languages: { type: new GraphQLList(GraphQLString) },
    partners: {
      type: new GraphQLList(PartnerType),
      resolve({ affiliateUUIDs }, _, { dataloaders }) {
        return affiliateUUIDs.map(uuid => dataloaders.partners.load(uuid));
      },
    },
    sources: { type: new GraphQLList(GraphQLString) },
    name: { type: GraphQLString },
    depositCount: { type: GraphQLInt },
    priority: { type: new GraphQLNonNull(GraphQLInt) },
    type: { type: RuleTypeEnum },
    updatedBy: { type: GraphQLString },
  }),
});

module.exports = RuleType;
