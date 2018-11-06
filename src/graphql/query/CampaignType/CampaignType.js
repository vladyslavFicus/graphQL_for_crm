const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList,
  GraphQLScalarType,
  GraphQLInt,
} = require('graphql');
const { get } = require('lodash');
const { freeSpinType, bonusType } = require('./RewardTypes');

const {
  campaigns: {
    rewards: { getBonusTemplates, getFreeSpinTemplates },
    fulfillments: { getDepositFulfillmentsByUUIDs, getWageringFulfillmentByUUIDs, getGamingsFulfillmentByUUIDs },
  },
  tags: { getTags },
} = require('../../common/resolvers');
const {
  fulfillmentsTypes,
  rewardTypes,
  countryStrategies,
  isSimpleFulfillmentType,
} = require('../../../constants/campaigns');
const CampaignTagsType = require('./CampaignTagsType');

const getRewardType = function(uuid) {
  if (uuid.startsWith('FREE-SPIN-TPL')) {
    return rewardTypes.FREE_SPIN;
  } else if (uuid.startsWith('TAG')) {
    return rewardTypes.TAG;
  } else if (uuid.startsWith('BONUS')) {
    return rewardTypes.BONUS;
  }
};

const getFulfillmentType = function(uuid) {
  if (uuid.startsWith('WAGERING-FULFILLMENT')) {
    return fulfillmentsTypes.WAGERING;
  }

  if (uuid.startsWith('GAMING-FULFILLMENT')) {
    return fulfillmentsTypes.GAMING;
  }

  return fulfillmentsTypes.DEPOSIT;
};

const CampaignType = new GraphQLObjectType({
  name: 'Campaign',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ uuid }) => uuid,
    },
    uuid: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    targetType: { type: new GraphQLNonNull(GraphQLString) },
    optIn: { type: new GraphQLNonNull(GraphQLBoolean) },
    state: { type: new GraphQLNonNull(GraphQLString) },
    countries: { type: new GraphQLList(GraphQLString) },
    countryStrategy: { type: GraphQLString },
    excludeCountries: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: ({ countryStrategy }) => countryStrategy === countryStrategies.EXCLUDE,
    },
    authorUUID: { type: new GraphQLNonNull(GraphQLString) },
    creationDate: { type: new GraphQLNonNull(GraphQLString) },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    statusAuthorUUID: { type: GraphQLString },
    statusChangedDate: { type: GraphQLString },
    optInPeriod: { type: GraphQLInt },
    optInPeriodTimeUnit: { type: GraphQLString },
    fulfillmentPeriod: { type: GraphQLInt },
    fulfillmentPeriodTimeUnit: { type: GraphQLString },
    promoCode: { type: GraphQLString },
    rewards: {
      type: new GraphQLList(
        new GraphQLScalarType({
          name: 'RewardType',
          serialize(value) {
            return value;
          },
        })
      ),
      resolve: async ({ rewards }, _, context) => {
        let availableRewards = rewards
          .map(({ uuid, type }) => ({
            uuid,
            deviceType: type,
            type: getRewardType(uuid),
          }))
          .filter(reward => reward.type);

        const tagIds = rewards.filter(i => (i.type = rewardTypes.TAG)).map(i => i.uuid);

        if (tagIds && tagIds.length) {
          const tags = await getTags(
            null,
            {
              size: tagIds.length,
              page: 0,
              tagIds,
            },
            context
          );
          const tagsContent = get(tags, 'data.content', []).map(t => ({ ...t, tagName: [t.tagName] }));

          availableRewards = availableRewards.map(i => ({
            ...i,
            ...((i.type === rewardTypes.TAG && tagsContent.find(t => i.uuid === t.tagId)) || {}),
          }));
        }

        return availableRewards;
      },
    },
    fulfillments: {
      type: new GraphQLScalarType({
        name: 'fulfillments',
        serialize(value) {
          return value;
        },
      }),
      resolve: async ({ fulfillments }, _, context) => {
        const deposits = await getDepositFulfillmentsByUUIDs(
          null,
          {
            uuids: fulfillments.filter(uuid => getFulfillmentType(uuid) === fulfillmentsTypes.DEPOSIT),
          },
          context
        );

        const wagerings = await getWageringFulfillmentByUUIDs(
          null,
          {
            uuids: fulfillments.filter(uuid => getFulfillmentType(uuid) === fulfillmentsTypes.WAGERING),
          },
          context
        );

        const gamings = await getGamingsFulfillmentByUUIDs(
          null,
          {
            uuids: fulfillments.filter(uuid => getFulfillmentType(uuid) === fulfillmentsTypes.GAMING),
          },
          context
        );

        const allFulfillments = [
          ...wagerings.map(item => ({
            ...item,
            type: fulfillmentsTypes.WAGERING,
          })),
          ...gamings.map(item => ({
            ...item,
            type: fulfillmentsTypes.GAMING,
          })),
          ...deposits.map(({ fulfillmentAmounts, ...item }) => ({
            ...item,
            type: fulfillmentsTypes.DEPOSIT,
            minAmount: fulfillmentAmounts.map(i => ({
              currency: i.currency,
              amount: i.min,
            })),
            maxAmount: fulfillmentAmounts.map(i => ({
              currency: i.currency,
              amount: i.max,
            })),
          })),
        ];

        fulfillments.filter(f => isSimpleFulfillmentType(f)).map(simpleFulfillment => {
          allFulfillments.push({ type: simpleFulfillment, uuid: simpleFulfillment });
        });

        return fulfillments.map(uuid => allFulfillments.find(i => i.uuid === uuid)).filter(i => i);
      },
    },
    bonuses: {
      type: new GraphQLList(bonusType),
      resolve({ rewards }, _, context) {
        const uuidList = rewards.filter(reward => reward.startsWith('BONUS-TPL'));
        return getBonusTemplates(null, uuidList, context);
      },
    },
    freeSpins: {
      type: new GraphQLList(freeSpinType),
      resolve({ rewards }, _, context) {
        const uuidList = rewards.filter(reward => reward.startsWith('FREE-SPIN-TPL'));
        return getFreeSpinTemplates(null, uuidList, context);
      },
    },
    playerCount: { type: GraphQLInt },
    tags: {
      type: new GraphQLList(CampaignTagsType),
      name: 'tags',
      resolve: async ({ tags }, _, context) => {
        if (tags && tags.length) {
          const response = await getTags(
            null,
            {
              size: tags.length,
              page: 0,
              tagIds: tags,
            },
            context
          );
          const tagsContent = get(response, 'data.content', []);

          return tagsContent.map(t => ({
            tagName: t.tagName,
            tagId: t.tagId,
          }));
        }

        return [];
      },
    },
  }),
});

module.exports = CampaignType;
