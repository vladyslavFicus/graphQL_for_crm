const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');
const { get } = require('lodash');
const MoneyType = require('../../../common/types/MoneyType');

const bonusType = new GraphQLObjectType({
  name: 'bonusType',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ uuid }) => uuid },
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    brandId: { type: new GraphQLNonNull(GraphQLString) },
    moneyTypePriority: { type: GraphQLString },
    claimable: { type: GraphQLBoolean },
    lockAmountStrategy: { type: GraphQLString },
    bonusLifeTime: { type: GraphQLFloat },
    prizePercentage: {
      type: GraphQLFloat,
      resolve: ({ prize }) => get(prize, 'percentage', null),
    },
    prizeAbsolute: {
      type: new GraphQLList(MoneyType),
      resolve: ({ prize }) => get(prize, 'value', null),
    },
    cappingPercentage: {
      type: GraphQLFloat,
      resolve: ({ capping }) => get(capping, 'percentage', null),
    },
    cappingAbsolute: {
      type: new GraphQLList(MoneyType),
      resolve: ({ capping }) => get(capping, 'value', null),
    },
    grantRatioPercentage: {
      type: GraphQLFloat,
      resolve: ({ grantRatio }) => get(grantRatio, 'percentage', null),
    },
    maxGrantAmount: { type: new GraphQLList(MoneyType) },
    grantRatioAbsolute: {
      type: new GraphQLList(MoneyType),
      resolve: ({ grantRatio }) => get(grantRatio, 'value', null),
    },
    maxBet: { type: new GraphQLList(MoneyType) },
    wageringRequirementType: {
      type: GraphQLString,
      resolve: ({ wageringRequirement }) => wageringRequirement.ratioType,
    },
    wageringRequirementPercentage: {
      type: GraphQLFloat,
      resolve: ({ wageringRequirement }) => wageringRequirement.percentage,
    },
    wageringRequirementAbsolute: {
      type: new GraphQLList(MoneyType),
      resolve: ({ wageringRequirement }) => get(wageringRequirement, 'value', null),
    },
  }),
});

module.exports = bonusType;
