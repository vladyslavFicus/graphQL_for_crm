const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

const MoneyType = require('../../../common/types/MoneyType');

const LastDepositType = new GraphQLObjectType({
  name: 'LastDeposit',
  fields: () => ({
    amount: { type: MoneyType },
    brandId: { type: new GraphQLNonNull(GraphQLString) },
    paymentSystem: { type: new GraphQLNonNull(GraphQLString) },
    playerUUID: { type: new GraphQLNonNull(GraphQLString) },
    transactionDate: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = LastDepositType;
