const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');

const MoneyInput = require('../../input/MoneyType');
const { ResponseType } = require('../../common/types');

const { GamingFulfillmentType: GamingFulfillmentQueryType } = require('../../query/CampaignType/FulfillmentTypes');
const { RoundTypeEnum } = GamingFulfillmentQueryType;

const {
  campaigns: {
    fulfillments: { addGamingFulfillment, updateGamingFulfillment },
  },
} = require('../../common/resolvers');

const GamingFulfillmentMutationType = new GraphQLObjectType({
  name: 'GamingFulfillmentMutation',
  fields() {
    return {
      add: {
        args: {
          aggregationType: { type: new GraphQLNonNull(GraphQLString) },
          moneyType: { type: new GraphQLNonNull(GraphQLString) },
          spinType: { type: new GraphQLNonNull(GraphQLString) },
          roundType: { type: new GraphQLNonNull(RoundTypeEnum) },
          amountSum: { type: new GraphQLList(MoneyInput) },
          amountCount: { type: GraphQLInt },
          minSum: { type: new GraphQLList(MoneyInput) },
          gameFilter: { type: new GraphQLNonNull(GraphQLString) },
          gameList: { type: new GraphQLList(GraphQLString) },
        },
        type: ResponseType(GamingFulfillmentQueryType, 'AddGamingFulfillment'),
        resolve: addGamingFulfillment,
      },
      update: {
        args: {
          uuid: { type: new GraphQLNonNull(GraphQLString) },
          aggregationType: { type: new GraphQLNonNull(GraphQLString) },
          moneyType: { type: new GraphQLNonNull(GraphQLString) },
          spinType: { type: new GraphQLNonNull(GraphQLString) },
          roundType: { type: new GraphQLNonNull(RoundTypeEnum) },
          amountSum: { type: new GraphQLList(MoneyInput) },
          amountCount: { type: GraphQLInt },
          minSum: { type: new GraphQLList(MoneyInput) },
          gameFilter: { type: new GraphQLNonNull(GraphQLString) },
          gameList: { type: new GraphQLList(GraphQLString) },
        },
        type: ResponseType(GamingFulfillmentQueryType, 'UpdateGamingFulfillment'),
        resolve: updateGamingFulfillment,
      },
    };
  },
});

module.exports = GamingFulfillmentMutationType;
