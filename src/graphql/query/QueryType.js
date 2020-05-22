const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = require('graphql');
const { GraphQLJSONObject } = require('graphql-type-json');
const ResponseType = require('../common/types/ResponseType');
const {
  profile,
  files: { getFiles, getFilesByProfileUUID, getFileCategoriesList },
  auth: {
    credentials: { getAuthorities, getLoginLock, getPermissions, getAuthoritiesOptions },
  },
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
  rules: { getRules, getRulesRetention },
  callbacks: { getCallbacks, getCallback },
  operators: { getOperators, getOperatorByUUID },
  partners: { getPartners, getPartnerByUUID },
  audit: { getFeeds, getFeedTypes },
  metabase: { getMetabaseToken },
  filterSet: { getFilterSets, getFilterSetById },
  tradingAccount: { getTradingAccounts, getTradingAccountsList },
  brandConfig: { getBrandConfig },
  emailTemplates: { getEmailTemplates, getEmailTemplate },
  socialTrading: { socialTradingResolver },
  notificationCenter: {
    getNotificationCenter,
    getNotificationCenterTypes,
    getNotificationCenterUnread,
    getNotificationCenterSubtypes,
  },
} = require('../common/resolvers');
const PageableType = require('../common/types/PageableType');
const ClientSearchInputType = require('../input/ClientSearchInputType');
const { FileType, FileByUuidType } = require('./FileType/FileType');
const { AuthorityType, AuthorityOptionsType } = require('./AuthType');
const NewPlayerProfileType = require('./NewPlayerProfileType');
const OptionsType = require('./OptionsType');
const ProfileViewType = require('./ProfileViewType');
const TradingAccountType = require('./TradingAccountType');
const TradingAccountsListType = require('./TradingAccountsListType');
const {
  PaymentType: { PaymentMethodType, PaymentType },
  PaymentStatusType,
} = require('./PaymentTypes');
const {
  TradingActivityType,
  TradingActivityEnums: { operationTypesEnum, StatusesEnum },
} = require('./TradingActivityType');
const { NoteType } = require('./NoteType');
const StatisticsType = require('./StatisticsType');
const LeadType = require('./LeadType');
const { FeedType, FeedTypes } = require('./AuditType/FeedType');
const { SalesStatusesEnum: TradingSalesStatuses } = require('./TradingProfileType/TradingProfileEnums');
const HierarchyQueryType = require('./HierarchyQueryType');
const QuestionnaireQueryType = require('./QuestionnaireQueryType');
const RuleType = require('./RuleType');
const { RuleTypeEnum } = require('./RuleType/RuleEnums');
const { CallbackType, CallbackStatusEnum } = require('./CallbackType');
const OperatorType = require('./OperatorType');
const PartnerType = require('./PartnerType');
const SocialTradingType = require('./SocialTradingType');
const FilterSetType = require('./FilterSetType');
const { FilterSetTypeEnum } = require('./FilterSetType');
const { checkMigrationQuery } = require('../../utils/profile');
const PaymentsInputType = require('../input/PaymentsInputType');
const PaymentsByUuidInputType = require('../input/PaymentsByUuidInputType');
const EmailType = require('./EmailType');
const NotificationCenterType = require('./NotificationCenterType');
const NotificationCenterInputType = require('../input/NotificationCenterInputType');
const PageInputType = require('../input/PageInputType');

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
    tradingAccount: {
      type: new GraphQLList(TradingAccountType),
      args: {
        uuid: { type: new GraphQLNonNull(GraphQLString) },
        accountType: { type: GraphQLString },
      },
      resolve: getTradingAccounts,
    },
    tradingAccountsList: {
      type: ResponseType(PageableType(TradingAccountsListType)),
      args: {
        searchKeyword: { type: GraphQLString },
        accountType: { type: GraphQLString },
        affiliateType: { type: GraphQLString },
        archived: { type: GraphQLBoolean },
        page: { type: GraphQLInt },
        size: { type: GraphQLInt },
      },
      resolve: getTradingAccountsList,
    },
    notes: {
      type: ResponseType(PageableType(NoteType, {}, 'NoteType')),
      resolve: getNotes,
      args: {
        targetUUID: { type: new GraphQLNonNull(GraphQLString) },
        pinned: { type: GraphQLBoolean },
        size: { type: GraphQLInt },
        page: { type: GraphQLInt },
        department: { type: GraphQLString },
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
      args: {
        args: { type: PaymentsInputType },
      },
      resolve: (_, { args }, ctx) => getClientPayments(_, args, ctx),
    },
    clientPaymentsByUuid: {
      type: ResponseType(PageableType(PaymentType, {}, 'ClientPaymentByUuid')),
      args: {
        args: { type: PaymentsByUuidInputType },
      },
      resolve: (_, { args }, ctx) => getClientPaymentsByUuid(_, args, ctx),
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
        operationType: { type: operationTypesEnum },
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
        branchUuid: { type: GraphQLString },
        affiliateId: { type: GraphQLString },
        operatorUuids: { type: new GraphQLList(GraphQLString) },
        uuids: { type: new GraphQLList(GraphQLString) },
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
        page: { type: PageInputType },
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
        page: { type: PageInputType },
        searchBy: { type: GraphQLString },
        country: { type: GraphQLString },
        status: { type: GraphQLString },
        affiliateType: { type: GraphQLString },
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
    brandConfig: {
      type: ResponseType(GraphQLJSONObject, 'BrandConfigQueryType'),
      args: {
        brandId: { type: GraphQLString },
      },
      resolve: getBrandConfig,
    },
    emailTemplate: {
      type: ResponseType(EmailType, 'EmailTemplate'),
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: getEmailTemplate,
    },
    emailTemplates: {
      type: ResponseType(GraphQLList(EmailType), 'EmailTemplates'),
      resolve: getEmailTemplates,
    },
    socialTrading: {
      type: SocialTradingType,
      resolve: socialTradingResolver,
    },
    notificationCenter: {
      type: ResponseType(PageableType(NotificationCenterType)),
      args: {
        args: { type: NotificationCenterInputType },
      },
      resolve: getNotificationCenter,
    },
    notificationCenterTypes: {
      type: ResponseType(new GraphQLList(GraphQLString), 'NotificationCenterTypes'),
      resolve: getNotificationCenterTypes,
    },
    notificationCenterSubtypes: {
      type: ResponseType(new GraphQLList(GraphQLString), 'NotificationCenterSubtypes'),
      resolve: getNotificationCenterSubtypes,
    },
    notificationCenterUnread: {
      type: ResponseType(GraphQLInt, 'NotificationCenterUnread'),
      resolve: getNotificationCenterUnread,
    },
  }),
});

module.exports = QueryType;
