const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLEnumType } = require('graphql');
const CmsGameAggregatorType = require('../CmsGameAggregatorType');
const CmsGameProviderType = require('../CmsGameProviderType');
const { freeSpinsStatuses, platforms, statuses, technologies } = require('../../../../constants/cms/game');

const CmsImage = new GraphQLObjectType({
  name: 'CmsImage',
  fields: () => ({
    url: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const CmsGameFreeSpinsStatusEnum = new GraphQLEnumType({
  name: 'CmsGameFreeSpinsStatus',
  values: {
    [freeSpinsStatuses.not_available]: { value: freeSpinsStatuses.not_available },
    [freeSpinsStatuses.available]: { value: freeSpinsStatuses.available },
    [freeSpinsStatuses.active]: { value: freeSpinsStatuses.active },
  },
});

const CmsGameStatusEnum = new GraphQLEnumType({
  name: 'CmsGameStatus',
  values: {
    [statuses.inactive]: { value: statuses.inactive },
    [statuses.active]: { value: statuses.active },
  },
});

const CmsGamePlatformEnum = new GraphQLEnumType({
  name: 'CmsGamePlatform',
  values: {
    [platforms.DESKTOP]: { value: platforms.DESKTOP },
    [platforms.MOBILE]: { value: platforms.MOBILE },
    [platforms.DESKTOP_AND_MOBILE]: { value: platforms.DESKTOP_AND_MOBILE },
  },
});

const CmsGameTechnologyEnum = new GraphQLEnumType({
  name: 'CmsGameTechnology',
  values: {
    [technologies.html5]: { value: technologies.html5 },
    [technologies.flash]: { value: technologies.flash },
  },
});

const CmsGameType = new GraphQLObjectType({
  name: 'CmsGame',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    gameId: { type: new GraphQLNonNull(GraphQLString) },
    brandId: { type: new GraphQLNonNull(GraphQLString) },
    alias: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    platform: { type: new GraphQLNonNull(CmsGamePlatformEnum) },
    technology: { type: new GraphQLNonNull(CmsGameTechnologyEnum) },
    internalGameId: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: CmsImage },
    freeSpinsStatus: { type: new GraphQLNonNull(CmsGameFreeSpinsStatusEnum) },
    coinValueLevel: { type: GraphQLString },
    coinSizes: { type: GraphQLString },
    coins: { type: GraphQLString },
    lines: { type: GraphQLString },
    betLevels: { type: GraphQLString },
    startFunGameUrl: { type: GraphQLString },
    startGameUrl: { type: new GraphQLNonNull(GraphQLString) },
    stopGameUrl: { type: new GraphQLNonNull(GraphQLString) },
    clientId: { type: GraphQLString },
    moduleId: { type: GraphQLString },
    aggregator: { type: new GraphQLNonNull(CmsGameAggregatorType) },
    provider: { type: new GraphQLNonNull(CmsGameProviderType) },
  }),
});

CmsGameType.CmsImage = CmsImage;
CmsGameType.CmsGameFreeSpinsStatus = CmsGameFreeSpinsStatusEnum;
CmsGameType.CmsGameStatusEnum = CmsGameStatusEnum;
CmsGameType.CmsGamePlatformEnum = CmsGamePlatformEnum;
CmsGameType.CmsGameTechnologyEnum = CmsGameTechnologyEnum;

module.exports = CmsGameType;
