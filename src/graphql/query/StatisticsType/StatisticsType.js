const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } = require('graphql');

const {
  statistics: { getRegisteredUserStatistic, getPaymentsStatistic, getRegisteredUserTotals },
} = require('../../common/resolvers');
const ResponseType = require('../../common/types/ResponseType');
const { ChartStatisticType, ChartTotalsType } = require('./ChartType');
const PaymentStatisticType = require('./PaymentStatisticType');
const { DetalizationEnum, AdditionalStatisticInputType } = require('./PaymentStatisticType');

const StatisticsType = new GraphQLObjectType({
  name: 'Statistics',
  fields: () => ({
    registrations: {
      type: ResponseType(ChartStatisticType, 'registrationsStatistic'),
      args: {
        registrationDateFrom: { type: new GraphQLNonNull(GraphQLString) },
        registrationDateTo: { type: new GraphQLNonNull(GraphQLString) },
        clientIds: { type: new GraphQLList(GraphQLString) },
      },
      resolve: getRegisteredUserStatistic,
    },
    registrationTotals: {
      type: ChartTotalsType,
      args: {
        timezone: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: getRegisteredUserTotals,
    },
    payments: {
      type: ResponseType(PaymentStatisticType, 'paymentsStatistic'),
      args: {
        dateFrom: { type: GraphQLString },
        dateTo: { type: GraphQLString },
        profileIds: { type: new GraphQLList(GraphQLString) },
        detalization: { type: DetalizationEnum },
        paymentStatus: { type: GraphQLString },
        paymentType: { type: GraphQLString },
        additionalStatistics: { type: new GraphQLList(AdditionalStatisticInputType) },
      },
      resolve: getPaymentsStatistic,
    },
  }),
});

module.exports = StatisticsType;
