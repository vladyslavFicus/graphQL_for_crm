const { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLObjectType, GraphQLList } = require('graphql');

const { MoneyType } = require('../../common/types');

const PaymentReportType = new GraphQLObjectType({
  name: 'PaymentReport',
  fields() {
    return {
      _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ date }) => date },
      date: { type: new GraphQLNonNull(GraphQLString) },
      deposits: { type: new GraphQLNonNull(new GraphQLList(MoneyType)) },
      withdrawals: { type: new GraphQLNonNull(new GraphQLList(MoneyType)) },
      profit: { type: new GraphQLNonNull(new GraphQLList(MoneyType)) },
    };
  },
});

module.exports = PaymentReportType;
