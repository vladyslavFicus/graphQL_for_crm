const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');

const SignUpOptionsType = require('./SignUpOptionsType');
const TradingAccountType = require('../TradingAccountType');

const { signUpOptions } = require('../../common/resolvers/options');
const { getServices } = require('../../common/resolvers/portainer');

const OptionsType = new GraphQLObjectType({
  name: 'Options',
  fields: () => ({
    signUp: {
      args: {
        brandId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SignUpOptionsType,
      resolve: signUpOptions,
    },
    services: {
      type: new GraphQLList(GraphQLString),
      resolve: getServices,
    },
    tradingAccount: {
      type: TradingAccountType,
      resolve: () => ({}),
    },
  }),
});

module.exports = OptionsType;
