const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
} = require('graphql');
const ResponseType = require('../../common/types/ResponseType');
const {
  payment: { createClientPayment, changeStatus, acceptPayment, changePaymentMethod, changePaymentStatus },
} = require('../../common/resolvers');
const { CreatedPaymentType } = require('./CreatedPaymentType');

const PlayerProfileInput = new GraphQLInputObjectType({
  name: 'PlayerProfileInput',
  fields: () => ({
    country: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    uuid: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const PaymentType = new GraphQLObjectType({
  name: 'PaymentMutation',
  fields: () => ({
    createClientPayment: {
      args: {
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
        currency: { type: new GraphQLNonNull(GraphQLString) },
        paymentType: { type: new GraphQLNonNull(GraphQLString) },
        paymentMethod: { type: GraphQLString },
        login: { type: GraphQLInt },
        source: { type: GraphQLInt },
        target: { type: GraphQLInt },
        externalReference: { type: GraphQLString },
        expirationDate: { type: GraphQLString },
        country: { type: GraphQLString },
        language: { type: GraphQLString },
        playerProfile: { type: PlayerProfileInput },
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
    acceptPayment: {
      args: {
        paymentId: { type: new GraphQLNonNull(GraphQLString) },
        paymentMethod: { type: GraphQLString },
        declineReason: { type: GraphQLString },
        typeAcc: { type: GraphQLString },
      },
      type: ResponseType(
        new GraphQLObjectType({
          name: 'acceptPayment',
          fields: () => ({
            success: { type: GraphQLBoolean },
          }),
        }),
        'acceptTransaction'
      ),
      resolve: acceptPayment,
    },
    changePaymentMethod: {
      args: {
        paymentId: { type: new GraphQLNonNull(GraphQLString) },
        paymentMethod: { type: GraphQLString },
      },
      type: ResponseType(
        new GraphQLObjectType({
          name: 'changePaymentMethod',
          fields: () => ({
            success: { type: GraphQLBoolean },
          }),
        }),
        'changeTransactionMethod'
      ),
      resolve: changePaymentMethod,
    },
    changePaymentStatus: {
      args: {
        paymentId: { type: new GraphQLNonNull(GraphQLString) },
        paymentStatus: { type: GraphQLString },
      },
      type: ResponseType(
        new GraphQLObjectType({
          name: 'changePaymentStatus',
          fields: () => ({
            success: { type: GraphQLBoolean },
          }),
        }),
        'changeTransactionStatus'
      ),
      resolve: changePaymentStatus,
    },
  }),
});

module.exports = PaymentType;
