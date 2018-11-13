const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} = require('graphql');

const { createTradingAccountResolver } = require('../../common/resolvers/tradingAccount');

const CreateTradingAccountType = new GraphQLObjectType({
  name: 'createTradingAccount',
  fields: () => ({
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

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
      type: CreateTradingAccountType,
      resolve: createTradingAccountResolver,
    },
  }),
});

module.exports = TradingAccountType;
