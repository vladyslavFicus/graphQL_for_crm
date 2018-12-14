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

const PaymentPlayerType = new GraphQLObjectType({
  name: 'PaymentPlayerType',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: ({ firstName, lastName }) => [firstName, lastName].filter(v => v).join(' '),
    },
  }),
});

const PaymentMetadata = new GraphQLObjectType({
  name: 'PaymentMetadata',
  fields: () => ({
    clientIp: { type: GraphQLString },
    isMobile: { type: GraphQLBoolean },
    userAgent: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLString },
  }),
});

const PaymentType = new GraphQLObjectType({
  name: 'PaymentTrading',
  fields() {
    return {
      login: { type: new GraphQLNonNull(GraphQLString) },
      paymentId: { type: new GraphQLNonNull(GraphQLString) },
      paymentType: { type: new GraphQLNonNull(GraphQLString) },
      status: { type: new GraphQLNonNull(GraphQLString) },
      // change to mandatory
      currency: { type: GraphQLString },
      createdBy: { type: new GraphQLNonNull(GraphQLString) },
      creationTime: { type: new GraphQLNonNull(GraphQLString) },
      paymentMethod: { type: GraphQLString },
      paymentAggregator: { type: GraphQLString },
      amount: { type: GraphQLString },
      country: { type: GraphQLString },
      language: { type: GraphQLString },
      brandId: { type: GraphQLString },
      externalReference: { type: GraphQLString },
      playerProfile: { type: PaymentPlayerType },
      paymentMetadata: { type: PaymentMetadata },
    };
  },
});

module.exports = {
  PaymentMethodLimitType,
  PaymentMethodType,
  PaymentType,
};
