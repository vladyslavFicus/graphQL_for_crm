const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean } = require('graphql');
const ResponseType = require('../../common/types/ResponseType');
const SuccessType = require('../../query/SuccessType');
const {
  auth: { logout, credentials, resetPassword },
} = require('../../common/resolvers');

const AuthUnlockType = new GraphQLObjectType({
  name: 'AuthUnlock',
  fields: () => ({
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

const AuthType = new GraphQLObjectType({
  name: 'AuthMutation',
  fields: () => ({
    unlockLogin: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(AuthUnlockType, 'loginUnlock'),
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
        repeatPassword: { type: new GraphQLNonNull(GraphQLString) },
        token: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: SuccessType,
      resolve: resetPassword,
    },
  }),
});

module.exports = AuthType;
