const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
} = require('graphql');
const ResponseType = require('../../common/types/ResponseType');
const {
  payment: { createClientPayment, changeStatus, acceptPayment },
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
        login: { type: GraphQLString },
        source: { type: GraphQLString },
        target: { type: GraphQLString },
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
  }),
});

module.exports = PaymentType;
