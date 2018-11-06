const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean } = require('graphql');

const ResponseType = require('../../common/types/ResponseType');
const {
  auth: { credentials },
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
  }),
});

module.exports = AuthType;
