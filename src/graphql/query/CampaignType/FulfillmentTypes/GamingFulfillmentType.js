const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType,
} = require('graphql');
const { MoneyType } = require('../../../common/types');

const AggregationTypeEnum = new GraphQLEnumType({
  name: 'AggregationType',
  values: {
    COUNT: { value: 'COUNT' },
    SUM: { value: 'SUM' },
    INROWCOUNT: { value: 'INROWCOUNT' },
  },
});

const MoneyTypeEnum = new GraphQLEnumType({
  name: 'MoneyType',
  values: {
    ALL: { value: 'ALL' },
    REAL: { value: 'REAL' },
    BONUS: { value: 'BONUS' },
  },
});

const SpinTypeEnum = new GraphQLEnumType({
  name: 'SpinType',
  values: {
    BET: { value: 'BET' },
    WIN: { value: 'WIN' },
  },
});

const RoundTypeEnum = new GraphQLEnumType({
  name: 'RoundType',
  values: {
    SPIN: { value: 'SPIN' },
    BONUS_ROUND_CHANCE: { value: 'BONUS_ROUND_CHANCE' },
  },
});

const GameFilterEnum = new GraphQLEnumType({
  name: 'GameFilterType',
  values: {
    ALL: { value: 'ALL' },
    PROVIDER: { value: 'PROVIDER' },
    CUSTOM: { value: 'CUSTOM' },
  },
});

const GamingFulfillmentType = new GraphQLObjectType({
  name: 'GamingFulfillment',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ uuid }) => uuid },
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    campaignUUID: { type: new GraphQLNonNull(GraphQLString) },
    amountCount: { type: GraphQLString },
    amountSum: { type: new GraphQLList(MoneyType) },
    minSum: { type: new GraphQLList(MoneyType) },
    aggregationType: { type: new GraphQLNonNull(AggregationTypeEnum) },
    moneyType: { type: new GraphQLNonNull(MoneyTypeEnum) },
    spinType: { type: new GraphQLNonNull(SpinTypeEnum) },
    roundType: { type: new GraphQLNonNull(RoundTypeEnum) },
    gameFilter: { type: new GraphQLNonNull(GameFilterEnum) },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    gameList: { type: new GraphQLList(GraphQLString) },
  }),
});

GamingFulfillmentType.RoundTypeEnum = RoundTypeEnum;

module.exports = GamingFulfillmentType;
