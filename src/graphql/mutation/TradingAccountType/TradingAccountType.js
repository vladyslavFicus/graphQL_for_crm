const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require('graphql');
const SuccessType = require('../../query/SuccessType');

const {
  createTradingAccountResolver,
  tradingAccountChangePasswordResolver,
} = require('../../common/resolvers/tradingAccount');

const TradingAccountType = new GraphQLObjectType({
  name: 'TradingAccountMutation',
  fields: () => ({
    create: {
      args: {
        profileId: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        mode: { type: new GraphQLNonNull(GraphQLString) },
        currency: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: createTradingAccountResolver,
    },
    changePassword: {
      args: {
        login: { type: new GraphQLNonNull(GraphQLInt) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: tradingAccountChangePasswordResolver,
    },
  }),
});

module.exports = TradingAccountType;
