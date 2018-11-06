const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const ResponseType = require('../../common/types/ResponseType');
const FingerprintInputType = require('../../input/FingerprintInputType');
const {
  payment: { cancelRegulationLimit },
} = require('../../common/resolvers');
const PaymentLimitType = require('../../query/PaymentLimitType');

const PaymentLimitMutation = new GraphQLObjectType({
  name: 'PaymentLimitMutation',
  fields: () => ({
    cancel: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(PaymentLimitType, 'cancelPaymentLimit'),
      resolve: cancelRegulationLimit,
    },
  }),
});

module.exports = PaymentLimitMutation;
