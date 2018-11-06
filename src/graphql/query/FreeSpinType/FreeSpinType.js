const {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
} = require('graphql');

const { MoneyType } = require('../../common/types');
const { aggregators } = require('../../../constants/freeSpin');

const bonusType = require('../../query/CampaignType/RewardTypes/BonusType');
const { fetchBonusTemplate } = require('../../common/resolvers/campaigns/rewards');

const FreeSpinType = new GraphQLObjectType({
  name: 'FreeSpinType',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID), resolve: ({ uuid }) => uuid },
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    authorUUID: { type: new GraphQLNonNull(GraphQLString) },
    aggregatorId: { type: new GraphQLNonNull(GraphQLString) },
    bonusTemplateUUID: { type: GraphQLString },
    brandId: { type: new GraphQLNonNull(GraphQLString) },
    campaignUUID: { type: new GraphQLNonNull(GraphQLString) },
    correlationId: { type: new GraphQLNonNull(GraphQLString) },
    creationDate: { type: new GraphQLNonNull(GraphQLString) },
    currencyCode: { type: new GraphQLNonNull(GraphQLString) },
    endDate: { type: new GraphQLNonNull(GraphQLString) },
    freeSpinStatus: { type: new GraphQLNonNull(GraphQLString) },
    freeSpinTemplateUUID: { type: new GraphQLNonNull(GraphQLString) },
    gameId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    playerUUID: { type: new GraphQLNonNull(GraphQLString) },
    providerId: { type: new GraphQLNonNull(GraphQLString) },
    reason: { type: GraphQLString },
    startDate: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    statusChangedAuthorUUID: { type: GraphQLString },
    statusChangedDate: { type: new GraphQLNonNull(GraphQLString) },
    gameName: { type: GraphQLString },
    error: { type: GraphQLString },
    betMultiplier: { type: GraphQLInt },
    coinSize: { type: GraphQLFloat },
    playedCount: { type: GraphQLInt },
    freeSpinsAmount: { type: GraphQLFloat },
    rhfpBet: { type: GraphQLFloat },
    claimable: { type: GraphQLBoolean },
    prize: {
      type: MoneyType,
      resolve: ({ prize, currencyCode }) => (prize ? { amount: prize, currency: currencyCode } : null),
    },
    capping: {
      type: MoneyType,
      resolve: ({ capping, currencyCode }) => (capping ? { amount: capping, currency: currencyCode } : null),
    },
    winning: {
      type: MoneyType,
      resolve: ({ winning, currencyCode }) => ({ amount: winning, currency: currencyCode }),
    },
    linesPerSpin: {
      type: GraphQLFloat,
      resolve: ({ linesPerSpin, aggregatorId }) => {
        if (aggregatorId === aggregators.netent) {
          return 1;
        }

        return linesPerSpin ? parseFloat(linesPerSpin) : 0;
      },
    },
    betPrice: {
      type: GraphQLFloat,
      resolve: item => {
        if (item.providerId === aggregators.microgaming) {
          const coinSize = (item.coinSize ? parseFloat(item.coinSize) : 0) || 0;
          const numberOfCoins = (item.numberOfCoins ? parseInt(item.numberOfCoins, 10) : 0) || 0;

          return coinSize * numberOfCoins;
        } else if (item.aggregatorId === aggregators.netent) {
          const betLevel = (item.betLevel ? parseFloat(item.betLevel) : 0) || 0;
          const coinValueLevel = (item.coinValueLevel ? parseInt(item.coinValueLevel, 10) : 0) || 0;

          return betLevel * coinValueLevel;
        }

        return item.betPerLine;
      },
    },
    bonus: {
      type: bonusType,
      resolve: async ({ bonusTemplateUUID: uuid }, _, context) => {
        const bonusTemplate = await fetchBonusTemplate(_, { uuid }, context);

        return !bonusTemplate.error ? bonusTemplate.data : null;
      },
    },
  }),
});

module.exports = FreeSpinType;
