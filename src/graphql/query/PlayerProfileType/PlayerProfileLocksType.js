const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql');
const { auth, payment } = require('../../common/resolvers');

const PaymentLockTypeEnum = new GraphQLEnumType({
  name: 'PaymentLockType',
  values: {
    DEPOSIT: { value: 'DEPOSIT' },
    WITHDRAW: { value: 'WITHDRAW' },
  },
});

const PaymentLockType = new GraphQLObjectType({
  name: 'PaymentLock',
  fields: () => ({
    author: { type: new GraphQLNonNull(GraphQLString) },
    authorUUID: { type: GraphQLString },
    id: { type: new GraphQLNonNull(GraphQLID) },
    playerUUID: { type: new GraphQLNonNull(GraphQLString) },
    reason: { type: GraphQLString },
    canUnlock: { type: new GraphQLNonNull(GraphQLBoolean) },
    startLock: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(PaymentLockTypeEnum) },
  }),
});

const CredentialsLockType = new GraphQLObjectType({
  name: 'CredentialsLock',
  fields: () => ({
    locked: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: object => object.lock || false,
    },
    expirationDate: {
      type: GraphQLString,
      resolve: object => object.lockExpirationDate,
    },
    reason: {
      type: GraphQLString,
      resolve: object => object.lockReason,
    },
  }),
});

const PlayerProfileLocksType = new GraphQLObjectType({
  name: 'PlayerLocks',
  fields: () => ({
    payment: {
      type: new GraphQLList(PaymentLockType),
      resolve: ({ playerUUID }, args, context) => payment.locks(null, { ...args, playerUUID }, context),
    },
    login: {
      type: CredentialsLockType,
      resolve: ({ playerUUID }, args, context) => auth.credentials.getLoginLock(null, { ...args, playerUUID }, context),
    },
  }),
});

module.exports = {
  PlayerProfileLocksType,
  PaymentLockType,
};
