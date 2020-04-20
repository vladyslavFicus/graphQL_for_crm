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

const { getOperator } = require('../../common/resolvers/operators');
const { getNote } = require('../../common/resolvers/notes');
const OperatorType = require('../OperatorType');
const { NoteType } = require('../NoteType');

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
    country: { type: GraphQLString },
  }),
});

const PaymentMetadata = new GraphQLObjectType({
  name: 'PaymentMetadata',
  fields: () => ({
    clientIp: { type: GraphQLString },
    isMobile: { type: GraphQLBoolean },
    userAgent: { type: GraphQLString },
    country: { type: GraphQLString },
  }),
});

const PaymentType = new GraphQLObjectType({
  name: 'PaymentTrading',
  fields() {
    return {
      _id: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ paymentId }) => paymentId,
      },
      login: { type: new GraphQLNonNull(GraphQLString) },
      platformType: { type: new GraphQLNonNull(GraphQLString) },
      accountType: { type: new GraphQLNonNull(GraphQLString) },
      paymentId: { type: new GraphQLNonNull(GraphQLString) },
      paymentType: { type: new GraphQLNonNull(GraphQLString) },
      status: { type: new GraphQLNonNull(GraphQLString) },
      withdrawStatus: { type: GraphQLString },
      // change to mandatory
      currency: { type: GraphQLString },
      createdBy: { type: GraphQLString },
      creationTime: { type: new GraphQLNonNull(GraphQLString) },
      paymentMethod: { type: GraphQLString },
      paymentAggregator: { type: GraphQLString },
      amount: { type: GraphQLString },
      country: { type: GraphQLString },
      language: { type: GraphQLString },
      brandId: { type: GraphQLString },
      externalReference: { type: GraphQLString },
      playerProfile: { type: PaymentPlayerType },
      originalAgent: {
        type: OperatorType,
        resolve: getOperator('agentId'),
      },
      paymentMetadata: { type: PaymentMetadata },
      note: {
        type: NoteType,
        resolve: getNote('paymentId'),
      },
      paymentMigrationId: { type: GraphQLString },
      userMigrationId: { type: GraphQLString },
      normalizedAmount: { type: GraphQLString },
      declineReason: { type: GraphQLString },
      modifiedBy: { type: GraphQLString },
      statusChangedAt: { type: GraphQLString },
      warnings: { type: new GraphQLList(GraphQLString) },
    };
  },
});

module.exports = {
  PaymentMethodLimitType,
  PaymentMethodType,
  PaymentType,
};
