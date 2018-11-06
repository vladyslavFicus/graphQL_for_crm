const { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { MoneyType, RangeMoneyType } = require('../../../common/types');

const resolveAmountField = name => object =>
  object.fulfillmentAmounts
    ? object.fulfillmentAmounts.map(item => ({ amount: item[name], currency: item.currency }))
    : [];

const DepositFulfillmentType = new GraphQLObjectType({
  name: 'DepositFulfillment',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ uuid }) => uuid },
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    brandId: { type: new GraphQLNonNull(GraphQLString) },
    authorUUID: { type: new GraphQLNonNull(GraphQLString) },
    minAmount: {
      type: new GraphQLList(MoneyType),
      resolve: resolveAmountField('min'),
    },
    maxAmount: {
      type: new GraphQLList(MoneyType),
      resolve: resolveAmountField('max'),
    },
    fulfillmentAmounts: { type: new GraphQLList(RangeMoneyType) },
    numDeposit: { type: GraphQLInt },
    excludedPaymentMethods: { type: new GraphQLList(GraphQLString) },
    creationDate: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = DepositFulfillmentType;
