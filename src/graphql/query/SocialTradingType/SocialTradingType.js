const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql');

const ResponseType = require('../../common/types/ResponseType');

const {
  socialTrading: { getSubscribers, getProviders, getSubscriptionsOnProviders },
} = require('../../common/resolvers');

const SocialTradingSubscriberType = new GraphQLObjectType({
  name: 'SocialTradingSubscriberType',
  fields: () => ({
    priceMode: { type: GraphQLString },
    stopLoss: { type: GraphQLInt },
    takeProfit: { type: GraphQLInt },
    subscriberId: { type: GraphQLInt },
    shareAction: {
      type: new GraphQLObjectType({
        name: 'SocialTradingSubUserShareActionType',
        fields: () => ({
          typeSharing: { type: GraphQLString },
          multiplicator: { type: GraphQLFloat },
          reverse: { type: GraphQLBoolean },
        }),
      }),
    },
    status: { type: GraphQLString },
    minimumLot: { type: GraphQLInt },
    maximumLot: { type: GraphQLInt },
    maxDeviation: { type: GraphQLInt },
    symbols: { type: GraphQLString },
    isArchive: { type: GraphQLBoolean },
    subscriberName: { type: GraphQLString },
    totalPerformanceFee: { type: GraphQLInt },
    sourceId: { type: GraphQLInt },
    sourceName: { type: GraphQLString },
    created: { type: GraphQLString },
    updated: { type: GraphQLString },
  }),
});

const SocialTradingProviderType = new GraphQLObjectType({
  name: 'SocialTradingProviderType',
  fields: () => ({
    id: { type: GraphQLInt },
    joinMinBalance: { type: GraphQLInt },
    name: { type: GraphQLString },
    currency: { type: GraphQLString },
    performanceFee: { type: GraphQLInt },
    feeReceiver: { type: GraphQLInt },
    companyFee: { type: GraphQLInt },
    isPublic: { type: GraphQLBoolean },
    isActive: { type: GraphQLBoolean },
    status: { type: GraphQLString },
    description: { type: GraphQLString },
    summary: { type: GraphQLString },
  }),
});

const SocialTradingSubscriptionOnProviderType = new GraphQLObjectType({
  name: 'SocialTradingSubscriptionOnProviderType',
  fields: () => ({
    sourceId: { type: GraphQLInt },
    sourceName: { type: GraphQLString },
    subscriberId: { type: GraphQLInt },
    subscriberName: { type: GraphQLString },
    shareAction: {
      type: new GraphQLObjectType({
        name: 'SocialTradingSubscriptionOnProviderShareActionType',
        fields: () => ({
          typeSharing: { type: GraphQLString },
          reverse: { type: GraphQLBoolean },
        }),
      }),
    },
  }),
});

const SocialTradingType = new GraphQLObjectType({
  name: 'SocialTradingType',
  fields: () => ({
    subscribers: {
      type: ResponseType(new GraphQLList(SocialTradingSubscriberType), 'SocialTradingSubscribersType'),
      resolve: ({ token }, { profileUuid }, { headers: { authorization } }) =>
        getSubscribers(token, profileUuid, authorization),
    },
    providers: {
      type: ResponseType(new GraphQLList(SocialTradingProviderType), 'SocialTradingProvidersType'),
      resolve: ({ token }, { profileUuid }, { headers: { authorization } }) =>
        getProviders(token, profileUuid, authorization),
    },
    subscriptionsOnProviders: {
      type: ResponseType(
        new GraphQLList(SocialTradingSubscriptionOnProviderType),
        'SocialTradingSubscriptionsOnProvidersType'
      ),
      args: {
        providerId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: ({ token }, { providerId }, { headers: { authorization } }) =>
        getSubscriptionsOnProviders(token, providerId, authorization),
    },
  }),
});

module.exports = SocialTradingType;
