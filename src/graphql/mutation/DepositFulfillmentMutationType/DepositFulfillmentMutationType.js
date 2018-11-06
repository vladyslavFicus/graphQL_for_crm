const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');

const MoneyInput = require('../../input/MoneyType');
const { ResponseType } = require('../../common/types');
const { DepositFulfillmentType: DepositFulfillmentQueryType } = require('../../query/CampaignType/FulfillmentTypes');

const {
  campaigns: {
    fulfillments: { addDepositFulfillment, updateDepositFulfillment },
  },
} = require('../../common/resolvers');

const DepositFulfillmentMutationType = new GraphQLObjectType({
  name: 'DepositFulfillmentMutation',
  fields() {
    return {
      add: {
        args: {
          minAmount: { type: new GraphQLNonNull(new GraphQLList(MoneyInput)) },
          maxAmount: { type: new GraphQLList(MoneyInput) },
          numDeposit: { type: GraphQLInt },
          excludedPaymentMethods: { type: new GraphQLList(GraphQLString) },
        },
        type: ResponseType(DepositFulfillmentQueryType, 'AddDepositFulfillment'),
        resolve: addDepositFulfillment,
      },
      update: {
        args: {
          uuid: { type: new GraphQLNonNull(GraphQLString) },
          minAmount: { type: new GraphQLNonNull(new GraphQLList(MoneyInput)) },
          maxAmount: { type: new GraphQLList(MoneyInput) },
          numDeposit: { type: GraphQLInt },
          excludedPaymentMethods: { type: new GraphQLList(GraphQLString) },
        },
        type: ResponseType(DepositFulfillmentQueryType, 'UpdateDepositFulfillment'),
        resolve: updateDepositFulfillment,
      },
    };
  },
});

module.exports = DepositFulfillmentMutationType;
