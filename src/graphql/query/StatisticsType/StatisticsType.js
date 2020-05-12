const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const {
  statistics: { getPaymentsStatistic, getRegisteredUsersChartData },
} = require('../../common/resolvers');
const ResponseType = require('../../common/types/ResponseType');
const PaymentStatisticType = require('./PaymentStatisticType');
const RegistrationStatisticType = require('./RegistrationStatisticType');
const { AdditionalStatisticRegistrationInputType } = require('./RegistrationStatisticType');
const { DetalizationEnum, AdditionalStatisticInputType } = require('./PaymentStatisticType');

const StatisticsType = new GraphQLObjectType({
  name: 'Statistics',
  fields: () => ({
    registrationStatistic: {
      type: ResponseType(RegistrationStatisticType, 'RegistrationStatisticType'),
      args: {
        dateTo: { type: GraphQLString },
        dateFrom: { type: GraphQLString },
        detalization: { type: DetalizationEnum },
        additionalStatistics: { type: new GraphQLList(AdditionalStatisticRegistrationInputType) },
      },
      resolve: getRegisteredUsersChartData,
    },
    payments: {
      type: ResponseType(PaymentStatisticType, 'paymentsStatistic'),
      args: {
        dateFrom: { type: GraphQLString },
        dateTo: { type: GraphQLString },
        profileId: { type: GraphQLString },
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
