const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList, GraphQLFloat } = require('graphql');

const PaymentEntryType = new GraphQLObjectType({
  name: 'PaymentEntry',
  fields: () => ({
    amount: { type: GraphQLFloat },
    count: { type: GraphQLInt },
    entryDate: { type: GraphQLString },
  }),
});

const PaymentStatisticItemType = new GraphQLObjectType({
  name: 'PaymentStatisticItem',
  fields: () => ({
    deposits: { type: PaymentEntryType },
    withdraws: { type: PaymentEntryType },
  }),
});

const PaymentsStatisticType = new GraphQLObjectType({
  name: 'PaymentsStatistic',
  fields: () => ({
    items: { type: new GraphQLList(PaymentStatisticItemType) },
    totalDepositsAmount: { type: new GraphQLNonNull(GraphQLFloat) },
    totalDepositsCount: { type: new GraphQLNonNull(GraphQLInt) },
    totalWithdrawsAmount: { type: new GraphQLNonNull(GraphQLFloat) },
    totalWithdrawsCount: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

module.exports = PaymentsStatisticType;
