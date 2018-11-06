const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} = require('graphql');
const { parse } = require('qs');

const GameProviderType = new GraphQLObjectType({
  name: 'GameProvider',
  fields() {
    return {
      key: { type: new GraphQLNonNull(GraphQLString) },
      value: { type: new GraphQLNonNull(GraphQLString) },
    };
  },
});

const GameType = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    funModeSupported: { type: GraphQLBoolean },
    aggregatorId: { type: GraphQLString },
    clientId: { type: GraphQLString },
    moduleId: { type: GraphQLString },
    gameType: { type: new GraphQLNonNull(GraphQLString) },
    gameInfoType: { type: new GraphQLNonNull(GraphQLString) },
    fullGameName: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: root => `${root.fullGameName} - ${root.gameInfoType}`,
    },
    isRHFP: {
      type: GraphQLBoolean,
      resolve({ gameId }) {
        return !!gameId.match('RHFP');
      },
    },
    gameId: { type: new GraphQLNonNull(GraphQLString) },
    pageCodes: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'pageCodes',
          fields: () => ({
            label: { type: GraphQLString },
            value: { type: GraphQLString },
          }),
        })
      ),
      resolve({ startGameUrl }) {
        const pageCodes = [];

        if (startGameUrl) {
          const { pageCode, mobilePageCode } = parse(startGameUrl, { ignoreQueryPrefix: true });

          if (pageCode) {
            pageCodes.push({
              label: 'DESKTOP',
              value: pageCode,
            });
          }

          if (mobilePageCode && pageCode !== mobilePageCode) {
            pageCodes.push({
              label: 'MOBILE',
              value: mobilePageCode,
            });
          }
        }

        return pageCodes;
      },
    },
    internalGameId: { type: new GraphQLNonNull(GraphQLID) },
    gameProviderId: { type: new GraphQLNonNull(GraphQLString) },
    betLevels: { type: new GraphQLList(GraphQLInt) },
    coinSizes: { type: new GraphQLList(GraphQLFloat) },
    coinsMin: { type: GraphQLInt },
    coinsMax: { type: GraphQLInt },
    lines: { type: new GraphQLList(GraphQLInt) },
    priority: { type: GraphQLInt },
    startGameUrl: { type: new GraphQLNonNull(GraphQLString) },
    stopGameUrl: { type: new GraphQLNonNull(GraphQLString) },
    startFunGameUrl: { type: GraphQLString },
  }),
});

GameType.GameProviderType = GameProviderType;

module.exports = GameType;
