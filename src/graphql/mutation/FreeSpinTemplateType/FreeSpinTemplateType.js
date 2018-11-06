const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLInputObjectType,
} = require('graphql');

const MoneyType = require('../../input/MoneyType');
const ResponseType = require('../../common/types/ResponseType');
const FreeSpinType = require('../../query/CampaignType/RewardTypes/FreeSpinType');
const {
  campaigns: {
    rewards: { addFreeSpinTemplate },
  },
  freeSpinTemplate: { claimFreeSpinTemplate },
} = require('../../common/resolvers');

const FreeSpinTemplateType = new GraphQLObjectType({
  name: 'FreeSpinTemplateMutation',
  fields: () => ({
    add: {
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        gameId: { type: new GraphQLNonNull(GraphQLString) },
        internalGameId: { type: new GraphQLNonNull(GraphQLString) },
        providerId: { type: new GraphQLNonNull(GraphQLString) },
        aggregatorId: { type: new GraphQLNonNull(GraphQLString) },
        comment: { type: GraphQLString },
        pageCode: { type: GraphQLString },
        moneyType: { type: new GraphQLNonNull(GraphQLString) },
        betMultiplier: { type: GraphQLInt },
        coinSize: { type: GraphQLFloat },
        freeSpinLifeTime: { type: new GraphQLNonNull(GraphQLInt) },
        freeSpinsAmount: { type: new GraphQLNonNull(GraphQLInt) },
        linesPerSpin: { type: GraphQLInt },
        rhfpBet: { type: GraphQLInt },
        betLevel: { type: GraphQLInt },
        bonusTemplateUUID: { type: GraphQLString },
        clientId: { type: GraphQLString },
        moduleId: { type: GraphQLString },
        displayLine1: { type: GraphQLString },
        displayLine2: { type: GraphQLString },
        nearestCost: { type: GraphQLFloat },
        supportedGames: {
          type: new GraphQLList(
            new GraphQLInputObjectType({
              name: 'InputGame',
              fields() {
                return {
                  gameId: { type: new GraphQLNonNull(GraphQLString) },
                  internalGameId: { type: new GraphQLNonNull(GraphQLString) },
                };
              },
            })
          ),
        },
        betPerLineAmounts: { type: new GraphQLList(MoneyType) },
        denomination: { type: GraphQLFloat },
        coins: { type: GraphQLInt },
        claimable: { type: GraphQLBoolean },
      },
      type: ResponseType(FreeSpinType, 'AddFreeSpinTemplate'),
      resolve: addFreeSpinTemplate,
    },
    claim: {
      args: {
        freeSpinUUID: { type: new GraphQLNonNull(GraphQLString) },
        templateUUID: { type: new GraphQLNonNull(GraphQLString) },
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        currency: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: ResponseType(
        new GraphQLObjectType({
          name: 'claimResponse',
          fields: () => ({
            freeSpinUUID: { type: new GraphQLNonNull(GraphQLString) },
            playerUUID: { type: new GraphQLNonNull(GraphQLString) },
          }),
        }),
        'ClaimFreeSpinTemplate'
      ),
      resolve: claimFreeSpinTemplate,
    },
  }),
});

module.exports = FreeSpinTemplateType;
