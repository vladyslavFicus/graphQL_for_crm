const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');

const MoneyType = require('../../input/MoneyType');

const ResponseType = require('../../common/types/ResponseType');
const BonusType = require('../../query/CampaignType/RewardTypes/BonusType');

const {
  campaigns: {
    rewards: { addBonus },
  },
} = require('../../common/resolvers');

const CampaignMutation = new GraphQLObjectType({
  name: 'BonusMutation',
  fields: () => ({
    add: {
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        lockAmountStrategy: { type: GraphQLString },
        claimable: { type: GraphQLBoolean },
        bonusLifeTime: { type: new GraphQLNonNull(GraphQLFloat) },
        moneyTypePriority: { type: new GraphQLNonNull(GraphQLString) },

        prizePercentage: { type: GraphQLFloat },
        prizeAbsolute: { type: new GraphQLList(MoneyType) },

        cappingPercentage: { type: GraphQLFloat },
        cappingAbsolute: { type: new GraphQLList(MoneyType) },

        grantRatioPercentage: { type: GraphQLFloat },
        grantRatioAbsolute: { type: new GraphQLList(MoneyType) },

        wageringRequirementType: { type: GraphQLString },
        wageringRequirementAbsolute: { type: new GraphQLList(MoneyType) },
        wageringRequirementPercentage: { type: GraphQLFloat },

        maxBet: { type: new GraphQLList(MoneyType) },
        maxGrantAmount: { type: new GraphQLList(MoneyType) },
      },
      type: ResponseType(BonusType, 'addBonus'),
      resolve: addBonus,
    },
  }),
});

module.exports = CampaignMutation;
