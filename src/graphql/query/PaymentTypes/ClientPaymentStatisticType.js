const { GraphQLObjectType, GraphQLNonNull, GraphQLInt } = require('graphql');
const MoneyType = require('../../common/types/MoneyType');

const ClientPaymentStatisticType = new GraphQLObjectType({
  name: 'ClientPaymentStatistic',
  fields: () => ({
    depositAmount: { type: new GraphQLNonNull(MoneyType) },
    depositCount: { type: new GraphQLNonNull(GraphQLInt) },
    withdrawAmount: { type: new GraphQLNonNull(MoneyType) },
    withdrawCount: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

module.exports = ClientPaymentStatisticType;
