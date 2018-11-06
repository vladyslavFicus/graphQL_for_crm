const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} = require('graphql');

const ResponseType = require('../../common/types/ResponseType');
const CampaignType = require('../../query/CampaignType');
const {
  campaigns: {
    activate,
    cancel,
    clone,
    updateCampaign,
    createCampaign,
    removeAllPlayers,
    fullResetCampaign,
    resetPlayer,
  },
} = require('../../common/resolvers');

const CampaignEditPlayersType = new GraphQLObjectType({
  name: 'CampaignEditPlayers',
  fields: () => ({
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    playerCount: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

const RewardType = require('../../input/RewardType');

const CampaignMutation = new GraphQLObjectType({
  name: 'CampaignMutation',
  fields: () => ({
    update: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        optIn: { type: new GraphQLNonNull(GraphQLBoolean) },
        fulfillments: { type: new GraphQLList(GraphQLString) },
        rewards: { type: new GraphQLList(RewardType) },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        targetType: { type: new GraphQLNonNull(GraphQLString) },
        countries: { type: new GraphQLList(GraphQLString) },
        excludeCountries: { type: GraphQLBoolean },
        optInPeriod: { type: GraphQLInt },
        optInPeriodTimeUnit: { type: GraphQLString },
        fulfillmentPeriod: { type: GraphQLInt },
        fulfillmentPeriodTimeUnit: { type: GraphQLString },
        promoCode: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      type: ResponseType(CampaignType, 'updateCampaign'),
      resolve: updateCampaign,
    },
    create: {
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        targetType: { type: new GraphQLNonNull(GraphQLString) },
        optIn: { type: new GraphQLNonNull(GraphQLBoolean) },
        fulfillments: { type: new GraphQLList(GraphQLString) },
        rewards: { type: new GraphQLList(RewardType) },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        countries: { type: new GraphQLList(GraphQLString) },
        optInPeriod: { type: GraphQLInt },
        optInPeriodTimeUnit: { type: GraphQLString },
        fulfillmentPeriod: { type: GraphQLInt },
        fulfillmentPeriodTimeUnit: { type: GraphQLString },
        promoCode: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      type: ResponseType(CampaignType, 'createCampaign'),
      resolve: createCampaign,
    },
    activate: {
      args: {
        campaignUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(CampaignType, 'CampaignActivate'),
      resolve: activate,
    },
    cancel: {
      args: {
        campaignUUID: { type: new GraphQLNonNull(GraphQLString) },
        reason: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(CampaignType, 'CampaignCancel'),
      resolve: cancel,
    },
    removeAllPlayers: {
      args: {
        campaignUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(CampaignEditPlayersType, 'CampaignRemoveAllPlayers'),
      resolve: removeAllPlayers,
    },
    fullResetCampaign: {
      args: {
        campaignUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(CampaignType, 'CampaignFullReset'),
      resolve: fullResetCampaign,
    },
    resetPlayer: {
      args: {
        campaignUUID: { type: new GraphQLNonNull(GraphQLString) },
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(CampaignEditPlayersType, 'CampaignResetPlayer'),
      resolve: resetPlayer,
    },
    clone: {
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(CampaignType, 'CampaignClone'),
      resolve: clone,
    },
  }),
});

module.exports = CampaignMutation;
