const { GraphQLBoolean, GraphQLObjectType, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const ResponseType = require('../../common/types/ResponseType');
const PlayerProfileType = require('../../query/PlayerProfileType');
const {
  profile: {
    updateSubscription,
    suspendProlong,
    resume,
    unblock,
    updateBTAG,
    updateAffiliate,
    suspend,
    block,
    verifyPhone,
    verifyProfile,
    updateEmail,
    sendActivationLink,
    updateProfile,
    changePassword,
    passwordResetRequest,
    markIsTest,
  },
} = require('../../common/resolvers');

const SuspendDurationType = new GraphQLInputObjectType({
  name: 'SuspendDuration',
  fields() {
    return {
      amount: { type: new GraphQLNonNull(GraphQLString) },
      unit: { type: new GraphQLNonNull(GraphQLString) },
    };
  },
});

const PlayerMutation = new GraphQLObjectType({
  name: 'PlayerMutation',
  fields: () => ({
    updateSubscription: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        marketingMail: { type: new GraphQLNonNull(GraphQLBoolean) },
        marketingSMS: { type: new GraphQLNonNull(GraphQLBoolean) },
        tailorMadeEmail: { type: new GraphQLNonNull(GraphQLBoolean) },
        tailorMadeSMS: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      type: ResponseType(PlayerProfileType, 'PlayerProfileSubscription'),
      resolve: updateSubscription,
    },
    suspendProlong: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        comment: { type: GraphQLString },
        duration: { type: SuspendDurationType },
        permanent: { type: GraphQLBoolean },
        reason: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(PlayerProfileType, 'PlayerSuspendProlong'),
      resolve: suspendProlong,
    },
    suspend: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        comment: { type: GraphQLString },
        duration: { type: SuspendDurationType },
        permanent: { type: GraphQLBoolean },
        reason: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(PlayerProfileType, 'PlayerSuspend'),
      resolve: suspend,
    },
    resume: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        comment: { type: GraphQLString },
        reason: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(PlayerProfileType, 'PlayerResume'),
      resolve: resume,
    },
    unblock: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        comment: { type: GraphQLString },
        reason: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(PlayerProfileType, 'PlayerUnblock'),
      resolve: unblock,
    },
    updateBTAG: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        btag: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(PlayerProfileType, 'PlayerBTAG'),
      resolve: updateBTAG,
    },
    updateAffiliate: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        affiliateId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(PlayerProfileType, 'PlayerAffiliate'),
      resolve: updateAffiliate,
    },
    block: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        comment: { type: GraphQLString },
        reason: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(PlayerProfileType, 'PlayerBlock'),
      resolve: block,
    },
    passwordResetRequest: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        brandId: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: new GraphQLObjectType({
        name: 'passwordResetRequest',
        fields: () => ({
          success: {
            type: new GraphQLNonNull(GraphQLBoolean),
          },
        }),
      }),
      resolve: passwordResetRequest,
    },
    sendActivationLink: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: new GraphQLObjectType({
        name: 'sendActivationLink',
        fields: () => ({
          success: {
            type: new GraphQLNonNull(GraphQLBoolean),
          },
        }),
      }),
      resolve: sendActivationLink,
    },
    changePassword: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: new GraphQLObjectType({
        name: 'changePassword',
        fields: () => ({
          success: {
            type: new GraphQLNonNull(GraphQLBoolean),
          },
        }),
      }),
      resolve: changePassword,
    },
    update: {
      args: {
        terms: {
          type: GraphQLBoolean,
        },
        brandId: {
          type: GraphQLString,
        },
        currency: {
          type: GraphQLString,
        },
        firstName: {
          type: GraphQLString,
        },
        lastName: {
          type: GraphQLString,
        },
        birthDate: {
          type: GraphQLString,
        },
        login: {
          type: GraphQLString,
        },
        phoneCode: {
          type: GraphQLString,
        },
        phone: {
          type: GraphQLString,
        },
        address: {
          type: GraphQLString,
        },
        city: {
          type: GraphQLString,
        },
        country: {
          type: GraphQLString,
        },
        postCode: {
          type: GraphQLString,
        },
        gender: {
          type: GraphQLString,
        },
        identifier: {
          type: GraphQLString,
        },
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      type: ResponseType(PlayerProfileType, 'UpdatePlayer'),
      resolve: updateProfile,
    },
    email: {
      args: {
        email: {
          type: GraphQLString,
        },
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      type: ResponseType(PlayerProfileType, 'UpdatePlayerEmail'),
      resolve: updateEmail,
    },
    verifyPhone: {
      args: {
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      type: ResponseType(PlayerProfileType, 'VerifyPlayerPhone'),
      resolve: verifyPhone,
    },
    verifyProfile: {
      args: {
        playerUUID: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      type: ResponseType(PlayerProfileType, 'VerifyPlayerProfile'),
      resolve: verifyProfile,
    },
    markIsTest: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        isTest: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      type: ResponseType(PlayerProfileType, 'MarkAsTest'),
      resolve: markIsTest,
    },
  }),
});

module.exports = PlayerMutation;
