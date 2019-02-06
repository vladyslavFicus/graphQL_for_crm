const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLScalarType,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const ResponseType = require('../common/types/ResponseType');
const {
  profile,
  files: { getFiles },
  auth: {
    credentials: { getAuthorities },
  },
  conditionalTags: { getConditionalTags },
  notes: { getNotes },
  campaigns: {
    rewards: {
      getShortFreeSpinTemplates,
      fetchFreeSpinTemplate,
      fetchBonusTemplate,
      getFreeSpinTemplateOptions,
      getShortBonusTemplates,
    },
    fulfillments: { getWageringFulfillmentByUUID, getDepositFulfillmentByUUID },
    getCampaigns,
    getCampaign,
  },
  games: { getGames, getGameProviders },
  payment: {
    getPaymentMethods,
    getOperatorPaymentMethods,
    getClientPayments,
    getClientPaymentsByUuid,
    getClientPaymentsStatistic,
    getPaymentStatuses,
  },
  freeSpin: { fetchFreeSpin },
  rewardPlan: { fetchActiveRewardPlan, fetchPendingRewardPlan },
  tradingActivities: { getTradingActivities },
  profiles: { getProfiles },
  leads: { getTradingLeads, getLeadProfile },
  tags: { getPlayerTags, getTagsByText },
  rules: { getRules, getRulesRetention },
  callbacks: { getCallbacks, getCallback },
  operators: { getOperators },
} = require('../common/resolvers');
const cmsResolvers = require('../common/resolvers/cms');
const PageableType = require('../common/types/PageableType');
const FileType = require('./FileType');
const { AuthorityType } = require('./AuthType');
const GameType = require('./GameType');
const { CmsGameType, CmsGameAggregatorType, CmsGameProviderType } = require('./CmsTypes');
const PlayerProfileType = require('./PlayerProfileType');
const FreeSpinTemplateType = require('./CampaignType/RewardTypes/FreeSpinType');
const FreeSpinType = require('./FreeSpinType');
const OptionsType = require('./OptionsType');
const BonusType = require('./CampaignType/RewardTypes/BonusType');
const { DepositFulfillmentType, WageringFulfillmentType } = require('./CampaignType/FulfillmentTypes');
const {
  PaymentType: { PaymentMethodType, PaymentType },
  ClientPaymentStatisticType,
  PaymentStatusType,
} = require('./PaymentTypes');
const { ActiveRewardPlan, PendingRewardPlan } = require('./RewardPlanType');
const {
  TradingActivityType,
  TradingActivityEnums: { CommandsEnum, StatusesEnum },
} = require('./TradingActivityType');
const ProfilesType = require('./ProfilesType');
const CampaignType = require('./CampaignType');
const { NoteType } = require('./NoteType');
const StatisticsType = require('./StatisticsType');
const LeadType = require('./LeadType');
const TagType = require('./TagType');
const { SalesStatusesEnum: TradingSalesStatuses } = require('./TradingProfileType/TradingProfileEnums');
const HierarchyQueryType = require('./HierarchyQueryType');
const RuleType = require('./RuleType');
const { RuleTypeEnum } = require('./RuleType/RuleEnums');
const { ConditionalTagType, ConditionalTagStatusEnum } = require('./ConditionalTagType');
const { CallbackType, CallbackStatusEnum } = require('./CallbackType');
const OperatorType = require('./OperatorType');

const CmsGamesListType = new GraphQLObjectType({
  name: 'CmsGamesList',
  fields: () => ({
    offset: { type: GraphQLInt },
    content: { type: new GraphQLList(CmsGameType) },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    authorities: {
      type: new GraphQLList(AuthorityType),
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getAuthorities,
    },
    options: {
      type: OptionsType,
      resolve: () => ({}),
    },
    playerProfile: {
      type: ResponseType(PlayerProfileType),
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: profile.getProfile,
    },
    notes: {
      type: ResponseType(PageableType(NoteType, {}, 'NoteType')),
      resolve: getNotes,
      args: {
        targetUUID: { type: new GraphQLNonNull(GraphQLString) },
        pinned: { type: GraphQLBoolean },
        size: { type: GraphQLInt },
        page: { type: GraphQLInt },
        targetType: { type: GraphQLString },
        changedAtTo: { type: GraphQLString },
        changedAtFrom: { type: GraphQLString },
      },
    },
    campaigns: {
      type: PageableType(CampaignType),
      resolve: getCampaigns,
      args: {
        size: { type: GraphQLInt },
        page: { type: GraphQLInt },
        searchBy: { type: GraphQLString },
        status: { type: GraphQLString },
        fulfilmentType: { type: GraphQLString },
        targetType: { type: GraphQLString },
        optIn: { type: GraphQLBoolean },
        creationDateFrom: { type: GraphQLString },
        creationDateTo: { type: GraphQLString },
        activityDateFrom: { type: GraphQLString },
        activityDateTo: { type: GraphQLString },
      },
    },
    campaign: {
      type: ResponseType(CampaignType),
      args: {
        campaignUUID: { type: GraphQLString },
      },
      resolve: getCampaign,
    },
    freeSpinTemplates: {
      type: GraphQLList(FreeSpinTemplateType),
      resolve: getShortFreeSpinTemplates,
    },
    freeSpinTemplate: {
      type: ResponseType(FreeSpinTemplateType),
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        aggregatorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: fetchFreeSpinTemplate,
    },
    freeSpin: {
      type: ResponseType(FreeSpinType),
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: fetchFreeSpin,
    },
    shortBonusTemplates: {
      type: GraphQLList(BonusType),
      resolve: getShortBonusTemplates,
    },
    bonusTemplate: {
      type: ResponseType(BonusType),
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: fetchBonusTemplate,
    },
    freeSpinOptions: {
      type: new GraphQLScalarType({
        name: 'freeSpinOptions',
        serialize: value => value,
      }),
      resolve: getFreeSpinTemplateOptions,
    },
    games: {
      type: PageableType(GameType, {
        category: {
          type: GraphQLString,
          resolve({ category }) {
            return category;
          },
        },
      }),
      args: {
        brandId: { type: new GraphQLNonNull(GraphQLString) },
        size: { type: GraphQLInt },
        category: { type: GraphQLString },
        term: { type: GraphQLString },
        aggregator: { type: GraphQLString },
        withLines: { type: GraphQLBoolean },
        gameProvider: { type: GraphQLString },
        sort: { type: GraphQLString },
        playerUUID: { type: GraphQLString },
        page: { type: new GraphQLNonNull(GraphQLInt) },
        country: { type: GraphQLString },
        type: { type: GraphQLString },
      },
      resolve: getGames,
    },
    gameProviders: {
      type: new GraphQLList(GraphQLString),
      args: {
        brandId: { type: GraphQLString },
      },
      resolve: getGameProviders,
    },
    cmsGames: {
      type: CmsGamesListType,
      args: {
        brandId: { type: new GraphQLNonNull(GraphQLString) },
        platform: { type: CmsGameType.CmsGamePlatformEnum },
        technology: { type: CmsGameType.CmsGameTechnologyEnum },
        freeSpinsStatus: { type: CmsGameType.CmsGameFreeSpinsStatus },
        limit: { type: new GraphQLNonNull(GraphQLInt) },
        offset: { type: new GraphQLNonNull(GraphQLInt) },
        status: { type: CmsGameType.CmsGameStatusEnum },
      },
      resolve: cmsResolvers.games.getGames,
    },
    cmsAggregators: {
      type: new GraphQLList(CmsGameAggregatorType),
      resolve: cmsResolvers.aggregators.getAggregators,
    },
    cmsProviders: {
      type: new GraphQLList(CmsGameProviderType),
      resolve: cmsResolvers.providers.getProviders,
    },
    wagering: {
      type: ResponseType(WageringFulfillmentType),
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getWageringFulfillmentByUUID,
    },
    depositFulfillment: {
      type: ResponseType(DepositFulfillmentType),
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getDepositFulfillmentByUUID,
    },
    paymentMethods: {
      type: ResponseType(new GraphQLList(PaymentMethodType), 'PaymentMethods'),
      args: {
        countryCode: { type: GraphQLString },
        status: { type: GraphQLString },
      },
      resolve: getPaymentMethods,
    },
    operatorPaymentMethods: {
      type: ResponseType(new GraphQLList(PaymentMethodType), 'OperatorPaymentMethods'),
      resolve: getOperatorPaymentMethods,
    },
    activeRewardPlan: {
      type: ResponseType(ActiveRewardPlan),
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: fetchActiveRewardPlan,
    },
    pendingRewardPlan: {
      type: ResponseType(PendingRewardPlan),
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: fetchPendingRewardPlan,
    },
    clientPayments: {
      type: ResponseType(PageableType(PaymentType, {}, 'ClientPayments')),
      resolve: getClientPayments,
      args: {
        limit: { type: GraphQLInt },
        page: { type: GraphQLInt },
        searchParam: { type: GraphQLString },
        country: { type: GraphQLString },
        type: { type: GraphQLString },
        statuses: { type: new GraphQLList(GraphQLString) },
        paymentTypes: { type: new GraphQLList(GraphQLString) },
        paymentAggregator: { type: GraphQLString },
        paymentMethod: { type: new GraphQLList(GraphQLString) },
        creationTimeFrom: { type: GraphQLString },
        creationTimeTo: { type: GraphQLString },
        amountFrom: { type: GraphQLString },
        amountTo: { type: GraphQLString },
        currency: { type: GraphQLString },
        agentIds: { type: new GraphQLList(GraphQLString) },
      },
    },
    clientPaymentsByUuid: {
      type: ResponseType(PageableType(PaymentType, {}, 'ClientPaymentByUuid')),
      resolve: getClientPaymentsByUuid,
      args: {
        limit: { type: GraphQLInt },
        page: { type: GraphQLInt },
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        searchParam: { type: GraphQLString },
        type: { type: GraphQLString },
        statuses: { type: new GraphQLList(GraphQLString) },
        paymentTypes: { type: new GraphQLList(GraphQLString) },
        paymentAggregator: { type: GraphQLString },
        paymentMethod: { type: new GraphQLList(GraphQLString) },
        creationTimeFrom: { type: GraphQLString },
        creationTimeTo: { type: GraphQLString },
        amountFrom: { type: GraphQLString },
        amountTo: { type: GraphQLString },
        agentIds: { type: new GraphQLList(GraphQLString) },
      },
    },
    clientPaymentsStatistic: {
      type: ClientPaymentStatisticType,
      resolve: getClientPaymentsStatistic,
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        limit: { type: GraphQLInt },
        page: { type: GraphQLInt },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
      },
    },
    paymentStatuses: {
      args: {
        paymentId: { type: new GraphQLNonNull(GraphQLString) },
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getPaymentStatuses,
      type: new GraphQLList(PaymentStatusType),
    },
    clientTradingActivity: {
      type: ResponseType(PageableType(TradingActivityType)),
      args: {
        profileId: { type: new GraphQLNonNull(GraphQLString) },
        playerUUID: { type: GraphQLString },
        tradeId: { type: GraphQLInt },
        openTimeStart: { type: GraphQLString },
        openTimeEnd: { type: GraphQLString },
        closeTimeStart: { type: GraphQLString },
        closeTimeEnd: { type: GraphQLString },
        cmd: { type: CommandsEnum },
        symbol: { type: GraphQLString },
        volumeFrom: { type: GraphQLInt },
        volumeTo: { type: GraphQLInt },
        status: { type: StatusesEnum },
        sortColumn: { type: GraphQLString },
        sortDirection: { type: GraphQLString },
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        loginIds: { type: new GraphQLList(GraphQLInt) },
      },
      resolve: getTradingActivities,
    },
    profiles: {
      type: ResponseType(PageableType(ProfilesType)),
      args: {
        page: { type: GraphQLInt },
        size: { type: GraphQLInt },
        acquisitionStatus: { type: GraphQLString },
        tradingBalanceFrom: { type: GraphQLString },
        tradingBalanceTo: { type: GraphQLString },
        countries: { type: new GraphQLList(GraphQLString) },
        registrationDateFrom: { type: GraphQLString },
        registrationDateTo: { type: GraphQLString },
        searchValue: { type: GraphQLString },
        status: { type: GraphQLString },
        repIds: { type: new GraphQLList(GraphQLString) },
        assignStatus: { type: GraphQLString },
        kycStatus: { type: GraphQLString },
        firstDeposit: { type: GraphQLString },
        salesStatuses: { type: new GraphQLList(GraphQLString) },
        retentionStatuses: { type: new GraphQLList(GraphQLString) },
      },
      resolve: getProfiles,
    },
    statistics: {
      type: StatisticsType,
      resolve: () => ({}),
    },
    leads: {
      type: ResponseType(PageableType(LeadType)),
      args: {
        ids: { type: new GraphQLList(GraphQLString) },
        searchKeyword: { type: GraphQLString },
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        countries: { type: new GraphQLList(GraphQLString) },
        registrationDateStart: { type: GraphQLString },
        registrationDateEnd: { type: GraphQLString },
        status: { type: GraphQLString },
        salesStatuses: { type: new GraphQLList(TradingSalesStatuses) },
        salesAgents: { type: new GraphQLList(GraphQLString) },
      },
      resolve: getTradingLeads,
    },
    files: {
      type: PageableType(FileType),
      resolve: getFiles,
      args: {
        size: { type: GraphQLInt },
        page: { type: GraphQLInt },
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        searchBy: { type: GraphQLString },
        fileCategory: { type: GraphQLString },
        uploadDateFrom: { type: GraphQLString },
        uploadDateTo: { type: GraphQLString },
      },
    },
    leadProfile: {
      type: ResponseType(LeadType),
      args: {
        leadId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getLeadProfile,
    },
    hierarchy: {
      type: HierarchyQueryType,
      resolve: () => ({}),
    },
    playerTags: {
      type: PageableType(TagType),
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        pinned: { type: GraphQLBoolean },
      },
      resolve: getPlayerTags,
    },
    tagsByText: {
      type: ResponseType(PageableType(NoteType), 'TagsByText'),
      resolve: getTagsByText,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
      },
    },
    rules: {
      type: ResponseType(new GraphQLList(RuleType), 'RulesType'),
      args: {
        uuid: { type: new GraphQLList(GraphQLString) },
        country: { type: GraphQLString },
        language: { type: GraphQLString },
        createdByOrUuid: { type: GraphQLString },
        name: { type: GraphQLString },
        type: { type: RuleTypeEnum },
        parentId: { type: GraphQLString },
      },
      resolve: getRules,
    },
    rulesRetention: {
      type: ResponseType(new GraphQLList(RuleType), 'RulesTypeRetention'),
      args: {
        uuid: { type: new GraphQLList(GraphQLString) },
        country: { type: GraphQLString },
        language: { type: GraphQLString },
        createdByOrUuid: { type: GraphQLString },
        name: { type: GraphQLString },
        parentId: { type: GraphQLString },
      },
      resolve: getRulesRetention,
    },
    conditionalTags: {
      type: ResponseType(PageableType(ConditionalTagType), 'ConditionalTagList'),
      args: {
        size: { type: GraphQLInt },
        status: { type: ConditionalTagStatusEnum },
        page: { type: GraphQLInt },
      },
      resolve: getConditionalTags,
    },
    callbacks: {
      type: ResponseType(PageableType(CallbackType), 'PageableCallbackType'),
      args: {
        id: { type: GraphQLString },
        statuses: { type: new GraphQLList(CallbackStatusEnum) },
        userId: { type: GraphQLString },
        operatorId: { type: GraphQLString },
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        callbackTimeFrom: { type: GraphQLString },
        callbackTimeTo: { type: GraphQLString },
      },
      resolve: getCallbacks,
    },
    callback: {
      type: ResponseType(CallbackType, 'CallbackType'),
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getCallback,
    },
    operators: {
      type: ResponseType(PageableType(OperatorType)),
      args: {
        searchBy: { type: GraphQLString },
        country: { type: GraphQLString },
        phone: { type: GraphQLString },
        status: { type: GraphQLString },
        registrationDateFrom: { type: GraphQLString },
        registrationDateTo: { type: GraphQLString },
        page: { type: GraphQLInt },
        size: { type: GraphQLInt },
      },
      resolve: getOperators,
    },
  }),
});

module.exports = QueryType;
