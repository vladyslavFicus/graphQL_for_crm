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
const SuccessType = require('../../query/SuccessType');

const {
  payment: {
    createClientPayment,
    changeStatus,
    acceptPayment,
    changePaymentMethod,
    changePaymentStatus,
    changeOriginalAgent,
  },
} = require('../../common/resolvers');
const { CreatedPaymentType } = require('./CreatedPaymentType');

const PaymentType = new GraphQLObjectType({
  name: 'PaymentMutation',
  fields: () => ({
    createClientPayment: {
      args: {
        accountUUID: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: new GraphQLNonNull(GraphQLFloat) },
        paymentType: { type: new GraphQLNonNull(GraphQLString) },
        paymentMethod: { type: GraphQLString },
        login: { type: GraphQLInt },
        source: { type: GraphQLInt },
        target: { type: GraphQLInt },
        externalReference: { type: GraphQLString },
        expirationDate: { type: GraphQLString },
        country: { type: GraphQLString },
        profileUUID: { type: GraphQLString },
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

    changeOriginalAgent: {
      args: {
        paymentId: { type: new GraphQLNonNull(GraphQLString) },
        agentId: { type: GraphQLString },
        agentName: { type: GraphQLString },
      },
      type: SuccessType,
      resolve: changeOriginalAgent,
    },
  }),
});

module.exports = PaymentType;
