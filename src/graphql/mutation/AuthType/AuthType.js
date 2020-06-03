const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const SuccessType = require('../../query/SuccessType');
const {
  auth: { logout, credentials, resetPassword },
} = require('../../common/resolvers');

const AuthType = new GraphQLObjectType({
  name: 'AuthMutation',
  fields: () => ({
    unlockLogin: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: credentials.removeLoginLock,
    },
    logout: {
      type: SuccessType,
      resolve: logout,
    },
    tokenRenew: {
      type: new GraphQLObjectType({
        name: 'TokenRenew',
        fields: () => ({
          token: { type: GraphQLString },
        }),
      }),
      resolve: credentials.tokenRenew,
    },
    resetPassword: {
      args: {
        password: { type: new GraphQLNonNull(GraphQLString) },
        token: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: resetPassword,
    },
  }),
});

module.exports = AuthType;
