const {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLBoolean,
} = require('graphql');
const MoneyType = require('../../../common/types/MoneyType');
const ResponseType = require('../../../common/types/ResponseType');
const GameType = require('../../GameType');
const {
  games: { getGame },
} = require('../../../common/resolvers');

const freeSpinType = new GraphQLObjectType({
  name: 'freeSpinType',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ uuid }) => uuid,
    },
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    providerId: { type: new GraphQLNonNull(GraphQLString) },
    aggregatorId: { type: new GraphQLNonNull(GraphQLString) },
    internalGameId: { type: GraphQLString },
    bonusTemplateUUID: { type: GraphQLString },
    brandId: { type: GraphQLString },
    moneyType: { type: GraphQLString },
    gameId: { type: GraphQLString },
    pageCode: { type: GraphQLString },
    linesPerSpin: { type: GraphQLInt },
    coinSize: { type: GraphQLFloat },
    betMultiplier: { type: GraphQLInt },
    rhfpBet: { type: GraphQLInt },
    comment: { type: GraphQLString },
    status: { type: GraphQLString },
    betLevel: { type: GraphQLFloat },
    betPerLineAmounts: { type: new GraphQLList(MoneyType) },
    freeSpinLifeTime: { type: GraphQLFloat },
    freeSpinsAmount: { type: GraphQLFloat },
    clientId: { type: GraphQLString },
    moduleId: { type: GraphQLString },
    displayLine1: { type: GraphQLString },
    displayLine2: { type: GraphQLString },
    nearestCost: { type: GraphQLFloat },
    denomination: { type: GraphQLFloat },
    coins: { type: GraphQLInt },
    claimable: { type: GraphQLBoolean },
    supportedGames: {
      type: ResponseType(new GraphQLList(GameType), 'FreeSpinSupportedGames'),
      resolve: async ({ supportedGames }, args, _) => {
        if (!supportedGames || !supportedGames.length) {
          return [];
        }

        const result = await Promise.all(
          supportedGames.map(({ internalGameId }) =>
            getGame(
              null,
              {
                ...args,
                internalGameId,
              },
              _
            )
          )
        );

        return result.map(i => i.data);
      },
    },
    game: {
      type: ResponseType(GameType, 'FreeSpinGame'),
      resolve: ({ internalGameId }, args, _) =>
        getGame(
          null,
          {
            ...args,
            internalGameId,
          },
          _
        ),
    },
  }),
});

module.exports = freeSpinType;
