const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

const {
  statistics: { getRegisteredUserStatistic, getPaymentsStatistic },
} = require('../../common/resolvers');
const ResponseType = require('../../common/types/ResponseType');
const { ChartStatisticType } = require('./ChartType');
const PaymentStatisticType = require('./PaymentStatisticType');

const StatisticsType = new GraphQLObjectType({
  name: 'Statistics',
  fields: () => ({
    registrations: {
      type: ResponseType(ChartStatisticType, 'registrationsStatistic'),
      args: {
        registrationDateFrom: { type: new GraphQLNonNull(GraphQLString) },
        registrationDateTo: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getRegisteredUserStatistic,
    },
    payments: {
      type: ResponseType(PaymentStatisticType, 'paymentsStatistic'),
      args: {
        dateFrom: { type: new GraphQLNonNull(GraphQLString) },
        dateTo: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getPaymentsStatistic,
    },
  }),
});

module.exports = StatisticsType;
