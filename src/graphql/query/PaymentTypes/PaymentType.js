const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');
const moment = require('moment');

const { MoneyType } = require('../../common/types');
const PaymentStatusType = require('./PaymentStatusType');

const PaymentMethodLimitType = new GraphQLObjectType({
  name: 'PaymentMethodLimit',
  fields() {
    return {
      available: { type: new GraphQLNonNull(GraphQLBoolean) },
      currencyCode: { type: new GraphQLNonNull(GraphQLString) },
      disabled: { type: new GraphQLNonNull(GraphQLBoolean) },
      min: { type: new GraphQLNonNull(GraphQLFloat) },
      max: { type: new GraphQLNonNull(GraphQLFloat) },
      paymentType: { type: new GraphQLNonNull(GraphQLString) },
      uuid: { type: new GraphQLNonNull(GraphQLID) },
    };
  },
});
const PaymentMethodType = new GraphQLObjectType({
  name: 'PaymentMethod',
  fields() {
    return {
      _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ uuid }) => uuid },
      depositLimit: { type: new GraphQLNonNull(PaymentMethodLimitType) },
      disabledByCloseLoop: { type: new GraphQLNonNull(GraphQLBoolean) },
      methodName: { type: new GraphQLNonNull(GraphQLString) },
      order: { type: new GraphQLNonNull(GraphQLInt) },
      status: { type: new GraphQLNonNull(GraphQLString) },
      uuid: { type: new GraphQLNonNull(GraphQLID) },
      withdrawLimit: { type: new GraphQLNonNull(PaymentMethodLimitType) },
    };
  },
});
const PaymentType = new GraphQLObjectType({
  name: 'Payment',
  fields() {
    return {
      _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ paymentId }) => paymentId },
      paymentId: { type: new GraphQLNonNull(GraphQLString) },
      playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      creatorUUID: { type: new GraphQLNonNull(GraphQLString) },
      transactionTag: { type: GraphQLString },
      paymentSystemRefs: { type: new GraphQLList(GraphQLString) },
      paymentType: { type: new GraphQLNonNull(GraphQLString) },
      amount: { type: MoneyType },
      amountBarrierReached: { type: GraphQLBoolean },
      creationTime: { type: new GraphQLNonNull(GraphQLString) },
      country: { type: GraphQLString },
      clientIp: { type: GraphQLString },
      paymentMethod: { type: GraphQLString },
      paymentAccount: { type: GraphQLString },
      mobile: { type: GraphQLBoolean },
      userAgent: { type: new GraphQLNonNull(GraphQLString) },
      playerProfile: {
        type: new GraphQLObjectType({
          name: 'playerProfile',
          fields: () => ({
            age: { type: GraphQLFloat },
            playerUUID: { type: GraphQLString },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            login: { type: GraphQLString },
            kycCompleted: { type: GraphQLBoolean },
            languageCode: { type: GraphQLString },
            countryCode: { type: GraphQLString },
          }),
        }),
        resolve({ player }) {
          return player
            ? {
                ...player,
                age: player.birthDate ? moment().diff(player.birthDate, 'years') : null,
                playerUUID: player.playerUUID,
              }
            : null;
        },
      },
      paymentFlowStatuses: { type: new GraphQLList(PaymentStatusType) },
      status: { type: new GraphQLNonNull(GraphQLString) },
      currency: { type: new GraphQLNonNull(GraphQLString) },
      fraud: { type: GraphQLBoolean },
      needApprove: { type: GraphQLBoolean },
      creatorType: { type: GraphQLString },
      tradingAcc: { type: GraphQLString },
      symbol: { type: GraphQLString },
      accountType: { type: GraphQLString },
      externalReference: { type: GraphQLString },
    };
  },
});

module.exports = {
  PaymentMethodLimitType,
  PaymentMethodType,
  PaymentType,
};
