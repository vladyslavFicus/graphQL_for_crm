const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLFloat } = require('graphql');
const ResponseType = require('../../common/types/ResponseType');
const FingerprintInputType = require('../../input/FingerprintInputType');
const { PaymentLockType } = require('../../query/PlayerProfileType/PlayerProfileLocksType');
const {
  payment: { lock, unlock, createClientPayment, changeStatus, createPaymentResolver },
} = require('../../common/resolvers');
const { CreatedPaymentType } = require('./CreatedPaymentType');

const PaymentCreateType = new GraphQLObjectType({
  name: 'PaymentCreateType',
  fields() {
    return {
      paymentId: { type: GraphQLString },
      generationDate: { type: new GraphQLNonNull(GraphQLString) },
      redirectLink: { type: GraphQLString },
      redirecting: { type: GraphQLString },
    };
  },
});

const PaymentType = new GraphQLObjectType({
  name: 'PaymentMutation',
  fields: () => ({
    lock: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        reason: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(PaymentLockType, 'paymentLock'),
      resolve: lock,
    },
    unlock: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        reason: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(PaymentLockType, 'paymentUnlock'),
      resolve: unlock,
    },
    createDeposit: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
        currency: { type: new GraphQLNonNull(GraphQLString) },
        paymentMethod: { type: new GraphQLNonNull(GraphQLString) },
        device: { type: FingerprintInputType },
      },
      type: ResponseType(PaymentCreateType, 'DepositCreate'),
      resolve: createPaymentResolver('deposit'),
    },
    createWithdraw: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
        currency: { type: new GraphQLNonNull(GraphQLString) },
        paymentMethod: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        iban: { type: GraphQLString },
        bic: { type: GraphQLString },
        device: { type: FingerprintInputType },
      },
      type: ResponseType(PaymentCreateType, 'WithdrawCreate'),
      resolve: createPaymentResolver('withdraw'),
    },
    createClientPayment: {
      args: {
        profileId: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLInt) },
        currency: { type: new GraphQLNonNull(GraphQLString) },
        paymentType: { type: new GraphQLNonNull(GraphQLString) },
        paymentAccount: { type: GraphQLString },
        paymentAccountUuid: { type: GraphQLString },
        login: { type: GraphQLString },
        source: { type: GraphQLString },
        target: { type: GraphQLString },
        externalReference: { type: GraphQLString },
        country: { type: GraphQLString },
        language: { type: GraphQLString },
      },
      type: ResponseType(CreatedPaymentType),
      resolve: createClientPayment,
    },
    changeStatus: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        paymentId: { type: new GraphQLNonNull(GraphQLString) },
        action: { type: new GraphQLNonNull(GraphQLString) },
        reason: { type: GraphQLString },
      },
      type: ResponseType(
        new GraphQLObjectType({
          name: 'changeStatus',
          fields: () => ({
            uuid: { type: new GraphQLNonNull(GraphQLString) },
            status: { type: new GraphQLNonNull(GraphQLString) },
          }),
        }),
        'paymentChangeStatus'
      ),
      resolve: changeStatus,
    },
  }),
});

module.exports = PaymentType;
