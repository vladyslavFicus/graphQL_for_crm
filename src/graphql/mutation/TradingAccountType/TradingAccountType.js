const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
} = require('graphql');
const SuccessType = require('../../query/SuccessType');

const {
  createTradingAccountResolver,
  updateTradingAccountResolver,
  tradingAccountChangePasswordResolver,
  changeLeverageResolver,
  approveChangeLeverageResolver,
  rejectChangeLeverageResolver,
} = require('../../common/resolvers/tradingAccount');

const TradingAccountType = new GraphQLObjectType({
  name: 'TradingAccountMutation',
  fields: () => ({
    create: {
      args: {
        profileId: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        currency: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        accountType: { type: new GraphQLNonNull(GraphQLString) },
        platformType: { type: new GraphQLNonNull(GraphQLString) },
        amount: { type: GraphQLFloat },
      },
      type: SuccessType,
      resolve: createTradingAccountResolver,
    },
    update: {
      args: {
        profileId: { type: new GraphQLNonNull(GraphQLString) },
        accountUUID: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        mode: { type: GraphQLString },
        currency: { type: GraphQLString },
        readOnly: { type: GraphQLBoolean },
      },
      type: SuccessType,
      resolve: updateTradingAccountResolver,
    },
    changePassword: {
      args: {
        profileUUID: { type: new GraphQLNonNull(GraphQLString) },
        accountUUID: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: tradingAccountChangePasswordResolver,
    },
    changeLeverageRequest: {
      args: {
        accountUUID: { type: new GraphQLNonNull(GraphQLString) },
        leverage: { type: new GraphQLNonNull(GraphQLInt) },
      },
      type: SuccessType,
      resolve: changeLeverageResolver,
    },
    approveChangeLeverageRequest: {
      args: {
        accountUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: approveChangeLeverageResolver,
    },
    rejectChangeLeverageRequest: {
      args: {
        accountUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: rejectChangeLeverageResolver,
    },
  }),
});

module.exports = TradingAccountType;
