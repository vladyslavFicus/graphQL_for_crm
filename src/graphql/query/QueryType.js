const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { GraphQLJSONObject } = require('graphql-type-json');
const ResponseType = require('../common/types/ResponseType');
const {
  profile,
  files: { getFiles, getFilesByProfileUUID, getFileCategoriesList },
  auth: {
    credentials: { getAuthorities, getLoginLock, getPermissions, getAuthoritiesOptions },
  },
  conditionalTags: { getConditionalTags },
  notes: { getNotes },
  payment: {
    getPaymentMethods,
    getManualPaymentMethods,
    getOperatorPaymentMethods,
    getClientPayments,
    getClientPaymentsByUuid,
    getPaymentStatuses,
  },
  tradingActivities: { getTradingActivities },
  profiles: { getProfiles },
  leads: { getTradingLeads, getLeadProfile },
  tags: { getPlayerTags, getTagsByText },
  rules: { getRules, getRulesRetention },
  callbacks: { getCallbacks, getCallback },
  operators: { getOperators, getOperatorByUUID },
  partners: { getPartners, getPartnerByUUID },
  audit: { getFeeds, getFeedTypes },
  metabase: { getMetabaseToken },
  filterSet: { getFilterSets, getFilterSetById },
  tradingAccount: { getTradingAccounts },
} = require('../common/resolvers');
const PageableType = require('../common/types/PageableType');
const ClientSearchInputType = require('../input/ClientSearchInputType');
const { FileType, FileByUuidType } = require('./FileType/FileType');
const { AuthorityType, AuthorityOptionsType } = require('./AuthType');
const PlayerProfileType = require('./PlayerProfileType');
const NewPlayerProfileType = require('./NewPlayerProfileType');
const OptionsType = require('./OptionsType');
const ProfileViewType = require('./ProfileViewType');
const TradingAccountType = require('./TradingAccountType');
const {
  PaymentType: { PaymentMethodType, PaymentType },
  PaymentStatusType,
} = require('./PaymentTypes');
const {
  TradingActivityType,
  TradingActivityEnums: { CommandsEnum, StatusesEnum },
} = require('./TradingActivityType');
const { NoteType } = require('./NoteType');
const StatisticsType = require('./StatisticsType');
const LeadType = require('./LeadType');
const { FeedType, FeedTypes } = require('./AuditType/FeedType');
const TagType = require('./TagType');
const { SalesStatusesEnum: TradingSalesStatuses } = require('./TradingProfileType/TradingProfileEnums');
const HierarchyQueryType = require('./HierarchyQueryType');
const QuestionnaireQueryType = require('./QuestionnaireQueryType');
const RuleType = require('./RuleType');
const { RuleTypeEnum } = require('./RuleType/RuleEnums');
const { ConditionalTagType, ConditionalTagStatusEnum } = require('./ConditionalTagType');
const { CallbackType, CallbackStatusEnum } = require('./CallbackType');
const OperatorType = require('./OperatorType');
const PartnerType = require('./PartnerType');
const FilterSetType = require('./FilterSetType');
const { FilterSetTypeEnum } = require('./FilterSetType');
const { checkMigrationQuery } = require('../../utils/profile');

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
    authoritiesOptions: {
      type: ResponseType(AuthorityOptionsType),
      resolve: getAuthoritiesOptions,
    },
    loginLock: {
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      type: new GraphQLObjectType({
        name: 'getLoginLock',
        fields: () => ({
          lock: { type: GraphQLBoolean },
          lockExpirationDate: { type: GraphQLString },
          lockReason: { type: GraphQLString },
        }),
      }),
      resolve: getLoginLock,
    },
    permission: {
      type: ResponseType(new GraphQLList(GraphQLString), 'Permission'),
      resolve: getPermissions,
    },
    options: {
      type: OptionsType,
      resolve: () => ({}),
    },
    playerProfile: {
      type: ResponseType(PlayerProfileType),
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
        accountType: { type: GraphQLString },
      },
      resolve: profile.getProfile,
    },
    newProfile: {
      type: ResponseType(NewPlayerProfileType, 'NewProfile'),
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: profile.getProfileNew,
    },
    tradingAccount: {
      type: new GraphQLList(TradingAccountType),
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        accountType: { type: GraphQLString },
      },
      resolve: getTradingAccounts,
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
    paymentMethods: {
      type: ResponseType(new GraphQLList(GraphQLString), 'PaymentMethods'),
      resolve: getPaymentMethods,
    },
    manualPaymentMethods: {
      type: ResponseType(new GraphQLList(GraphQLString), 'ManualPaymentMethods'),
      resolve: getManualPaymentMethods,
    },
    operatorPaymentMethods: {
      type: ResponseType(new GraphQLList(PaymentMethodType), 'OperatorPaymentMethods'),
      resolve: getOperatorPaymentMethods,
    },
    clientPayments: {
      type: ResponseType(PageableType(PaymentType, {}, 'ClientPayments')),
      resolve: getClientPayments,
      args: {
        limit: { type: GraphQLInt },
        page: { type: GraphQLInt },
        searchParam: { type: GraphQLString },
        countries: { type: new GraphQLList(GraphQLString) },
        type: { type: GraphQLString },
        statuses: { type: new GraphQLList(GraphQLString) },
        paymentTypes: { type: new GraphQLList(GraphQLString) },
        paymentAggregator: { type: GraphQLString },
        paymentMethods: { type: new GraphQLList(GraphQLString) },
        creationTimeFrom: { type: GraphQLString },
        creationTimeTo: { type: GraphQLString },
        modificationTimeFrom: { type: GraphQLString },
        modificationTimeTo: { type: GraphQLString },
        amountFrom: { type: GraphQLFloat },
        amountTo: { type: GraphQLFloat },
        currency: { type: GraphQLString },
        agentIds: { type: new GraphQLList(GraphQLString) },
        accountType: { type: GraphQLString },
        firstTimeDeposit: { type: GraphQLBoolean },
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
        paymentMethods: { type: new GraphQLList(GraphQLString) },
        creationTimeFrom: { type: GraphQLString },
        creationTimeTo: { type: GraphQLString },
        modificationTimeFrom: { type: GraphQLString },
        modificationTimeTo: { type: GraphQLString },
        amountFrom: { type: GraphQLFloat },
        amountTo: { type: GraphQLFloat },
        agentIds: { type: new GraphQLList(GraphQLString) },
        accountType: { type: GraphQLString },
        firstTimeDeposit: { type: GraphQLBoolean },
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
        profileUUID: { type: GraphQLString },
        tradeId: { type: GraphQLInt },
        tradeType: { type: GraphQLString },
        openTimeStart: { type: GraphQLString },
        openTimeEnd: { type: GraphQLString },
        closeTimeStart: { type: GraphQLString },
        closeTimeEnd: { type: GraphQLString },
        cmd: { type: CommandsEnum },
        symbol: { type: GraphQLString },
        volumeFrom: { type: GraphQLFloat },
        volumeTo: { type: GraphQLFloat },
        status: { type: StatusesEnum },
        sortColumn: { type: GraphQLString },
        sortDirection: { type: GraphQLString },
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        loginIds: { type: new GraphQLList(GraphQLInt) },
        agentIds: { type: new GraphQLList(GraphQLString) },
      },
      resolve: getTradingActivities,
    },
    profiles: {
      type: ResponseType(PageableType(ProfileViewType)),
      args: {
        args: { type: ClientSearchInputType },
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
        uuids: { type: new GraphQLList(GraphQLString) },
        searchKeyword: { type: GraphQLString },
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        countries: { type: new GraphQLList(GraphQLString) },
        registrationDateStart: { type: GraphQLString },
        registrationDateEnd: { type: GraphQLString },
        status: { type: GraphQLString },
        salesStatuses: { type: new GraphQLList(TradingSalesStatuses) },
        salesAgents: { type: new GraphQLList(GraphQLString) },
        migrationId: { type: GraphQLString },
      },
      resolve: getTradingLeads,
    },
    // #
    filesByUuid: {
      type: ResponseType(GraphQLList(FileByUuidType), 'FilesByUuid'),
      resolve: getFilesByProfileUUID,
      args: {
        size: { type: GraphQLInt },
        page: { type: GraphQLInt },
        clientUUID: { type: new GraphQLNonNull(GraphQLString) },
        searchBy: { type: GraphQLString },
        fileCategory: { type: GraphQLString },
        uploadDateFrom: { type: GraphQLString },
        uploadDateTo: { type: GraphQLString },
      },
    },
    // #
    fileList: {
      type: ResponseType(PageableType(FileType, {}, 'FileList')),
      resolve: getFiles,
      args: {
        size: { type: GraphQLInt },
        page: { type: GraphQLInt },
        searchBy: { type: GraphQLString },
        uploadedDateFrom: { type: GraphQLString },
        uploadedDateTo: { type: GraphQLString },
        targetUuid: { type: GraphQLString },
        verificationType: { type: GraphQLString },
        documentType: { type: GraphQLString },
      },
    },
    filesCategoriesList: {
      type: ResponseType(
        new GraphQLObjectType({
          name: 'filesCategoriesType',
          fields: () => ({
            DOCUMENT_VERIFICATION: { type: new GraphQLList(GraphQLString) },
            ADDRESS_VERIFICATION: { type: new GraphQLList(GraphQLString) },
            OTHER: { type: new GraphQLList(GraphQLString) },
          }),
        }),
        'filesCategoriesListType'
      ),
      resolve: getFileCategoriesList,
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
      },
      resolve: getOperators,
    },
    operator: {
      type: ResponseType(OperatorType),
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getOperatorByUUID,
    },
    partners: {
      type: ResponseType(PageableType(PartnerType)),
      args: {
        searchBy: { type: GraphQLString },
        country: { type: GraphQLString },
        status: { type: GraphQLString },
        registrationDateFrom: { type: GraphQLString },
        registrationDateTo: { type: GraphQLString },
      },
      resolve: getPartners,
    },
    partner: {
      type: ResponseType(PartnerType),
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getPartnerByUUID,
    },
    feeds: {
      type: ResponseType(PageableType(FeedType)),
      args: {
        searchBy: { type: GraphQLString },
        auditLogType: { type: GraphQLString },
        creationDateFrom: { type: GraphQLString },
        creationDateTo: { type: GraphQLString },
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        sortColumn: { type: GraphQLString },
        sortDirection: { type: GraphQLString },
        targetUUID: { type: GraphQLString },
      },
      resolve: getFeeds,
    },
    feedTypes: {
      type: ResponseType(FeedTypes, 'feedTypes'),
      args: {
        playerUUID: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getFeedTypes,
    },
    checkMigration: {
      type: ResponseType(
        new GraphQLObjectType({
          name: 'CheckMigrationType',
          fields: () => ({ migrated: { type: GraphQLBoolean } }),
        }),
        'checkMigration'
      ),
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        brandId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: checkMigrationQuery,
    },
    getMetabaseToken: {
      type: new GraphQLObjectType({
        name: 'MetabaseTokenType',
        fields: () => ({ token: { type: new GraphQLNonNull(GraphQLString) } }),
      }),
      args: {
        agent_id: { type: GraphQLString },
      },
      resolve: getMetabaseToken,
    },
    questionnaire: {
      type: QuestionnaireQueryType,
      resolve: () => ({}),
    },
    filterSets: {
      type: ResponseType(FilterSetType, 'FilterSetQueryType'),
      args: {
        type: { type: new GraphQLNonNull(FilterSetTypeEnum) },
      },
      resolve: getFilterSets,
    },
    filterSet: {
      type: ResponseType(GraphQLJSONObject, 'FilterSetFieldsType'),
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getFilterSetById,
    },
  }),
});

module.exports = QueryType;
