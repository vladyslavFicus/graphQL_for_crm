const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    # Affiliate API
    partner(uuid: String!): Partner
    partners(
      brandId: String
      page: Page__Input
      searchBy: String
      country: String
      status: String
      registrationDateFrom: String
      registrationDateTo: String
    ): Partner @pageable
    cdePartners: [Partner]

    # Attachments API
    files(
      page: Int
      size: Int
      searchBy: String
      targetUuid: String
      documentType: String
      uploadedDateFrom: String
      uploadedDateTo: String
      verificationType: String
    ): File @pageable
    clientFiles(
      size: Int
      page: Int
      searchBy: String
      clientUuid: String!
      fileCategory: String
      uploadDateFrom: String
      uploadDateTo: String
    ): [ClientFile]
    filesCategories: FilesCategories

    # Audit API
    feeds(
      searchBy: String
      auditLogType: String
      creationDateFrom: String
      creationDateTo: String
      page: Int
      limit: Int
      sortColumn: String
      sortDirection: String
      targetUUID: String
    ): Feed @pageable
    feedTypes(uuid: String!): Object

    # Auth2 API
    allActions: [String]
    authoritiesOptions: Object
    authorityActions(department: String!, role: String!): [String]
    permission: [String]
    loginLock(uuid: String!): LoginLock
    brandToAuthorities: Object
    isDefaultAuthority(department: String!, role: String!): Boolean

    # BrandConfig API
    brandConfig(brandId: String!): BrandConfig
    brands: [BrandConfig]

    # Callback API
    callbacks(
      searchKeyword: String
      statuses: [Callback__Status__Enum]
      userId: String
      page: Int
      limit: Int
      callbackTimeFrom: String
      callbackTimeTo: String
    ): Callback @pageable
    callback(id: String!): Callback

    # Email API
    emailTemplate(id: ID!): Email
    emailTemplates: [Email]

    # FilterSet API
    filterSet(uuid: String!): Object
    filterSets(type: FilterSet__Types__Enum): FilterSet

    # Hierarchy API
    branch(
      branchType: String!
      keyword: String
      officeUuid: String
      deskUuid: String
      deskType: Desk__Types__Enum
      country: String
    ): [HierarchyBranch]
    branchInfo(branchId: String!): HierarchyBranch
    branchChildren(uuid: String!): [HierarchyBranch]
    branchUsers(branchUuid: String!): [HierarchyBranchUser]
    userBranches(
      withoutBrandFilter: Boolean
      brandId: String
    ): HierarchyUserBranches
    userHierarchy: HierarchyUser
    userHierarchyById(uuid: String!): HierarchyUser
    userBranchesTreeUp(userUUID: String!): [HierarchyUserBranchesTreeUp]
    treeTop: [HierarchyTreeBranch]
    treeBranch(uuid: String!): HierarchyTreeBranchResponse

    # Lead API
    lead(uuid: String!): Lead
    leads(args: LeadSearch__Input): Lead @pageable

    # Notes API
    notes(
      changedAtFrom: String
      changedAtTo: String
      department: String
      targetType: String
      targetUUID: String!
      size: Int
      page: Int
      pinned: Boolean
    ): Note @pageable

    # NotificationCenter API
    notificationCenter(args: NotificationCenterSearch__Input): NotificationCenter @pageable
    notificationCenterTypes: Object
    notificationCenterUnread: Int
    notificationCenterConfiguration: NotificationCenterConfiguration

    # Operator API
    operator(uuid: String!): Operator
    operators(
      country: String
      page: Page__Input
      phone: String
      registrationDateFrom: String
      registrationDateTo: String
      searchBy: String
      status: String
    ): Operator @pageable
    operatorsByBrand(brandId: String!, hierarchyTypeGroup: Desk__Types__Enum!): [Operator]
    operatorsSubordinates(hierarchyTypeGroup: String, onlyActive: Boolean): [Operator]
    operatorRelationsCount(uuid: String!): OperatorRelationsCount

    # Payment API
    payments(args: PaymentSearch__Input): Payment @pageable
    clientPayments(args: PaymentSearch__Input): Payment @pageable
    paymentMethods: [String]
    manualPaymentMethods: [String] @auth_filter_values(action: "payment.field.manual-methods.values.*")
    paymentsStatistic(
      dateFrom: String
      dateTo: String
      profileId: String
      detalization: StatisticDetalization__Enum
      paymentStatus: String
      paymentType: String
      additionalStatistics: [PaymentStatisticDateRange__Input]
    ): PaymentStatistic

    # Profile API && ProfileView API
    profile(playerUUID: String!): Profile
    profileContacts(playerUUID: String!): Profile__Phone__Contacts
    profiles(args: ClientSearch__Input): ProfileView @pageable
    registrationStatistic(
      dateTo: String
      dateFrom: String
      detalization: StatisticDetalization__Enum
      additionalStatistics: [RegistrationStatisticDateRange__Input]
    ): RegistrationStatistic

    # Rules API
    rules(
      uuid: [String]
      uuids: [String]
      affiliateId: String
      branchUuid: String
      country: String
      createdByOrUuid: String
      language: String
      name: String
      operatorUuids: [String]
      parentId: String
      type: Rule__Type__Enum
    ): [Rule]

    # Distribution Rules API
    distributionRules(args: DistributionRuleSearch__Input): DistributionRule @pageable
    distributionRule(uuid: String!): DistributionRule
    distributionRuleClientsAmount(
      salesStatuses: [String]!
      countries: [String]!
      languages: [String]!
      sourceBrand: String!
      targetBrand: String
      affiliateUuids: [String]
      firstTimeDeposit: Boolean
      registrationPeriodInHours: Int
      registrationDateRange: DistributionRule__DateRange__Input
      lastNotePeriodInHours: Int
      lastNoteDateRange: DistributionRule__DateRange__Input
      executionPeriodInHours: Int
      desks: [String]
      teams: [String]
    ): Int
    distributionClientsAmount(uuid: String): Int

    # TradingAccount API && AccountView API
    tradingAccounts(
      searchKeyword: String
      accountType: String
      platformType: String
      archived: Boolean
      page: Page__Input
    ): TradingAccount @pageable
    clientTradingAccounts(
      profileUUID: String!
      accountType: String
      platformType: String
    ): [TradingAccount]
    
    # TradingEngine API
    tradingEngineAccounts(args: TradingEngineSearch__Input): TradingEngineAccount @pageable
    tradingEngineAccount(identifier: String): TradingEngineAccount
    tradingEngineSymbols(args: TradingEngineSymbols__Input): TradingEngineSymbol @pageable
    tradingEngineSecurities: [TradingEngineSecurity]
    tradingEngineAdminSymbolsSources: [TradingEngineSource]
    tradingEngineSecurity(securityName: String!): TradingEngineSecurity
    tradingEngineSymbol(symbol: String!): TradingEngineSymbol
    tradingEngineGroups: [TradingEngineGroup]
    tradingEngineOrders(args: TradingEngineSearch__Input): TradingEngineOrder @pageable
    tradingEngineOrder(orderId: Int!): TradingEngineOrder
    tradingEngineTransactions(args: TradingEngineTransactionSearch__Input): TradingEngineTransaction @pageable
    tradingEngineHistory(args: TradingEngineHistorySearch__Input): TradingEngineHistory @pageable
    tradingEngineSymbolPrices(symbol: String! size: Int): [TradingEngineSymbolPrice]
    tradingEngineAccountSymbols(accountUuid: String!): [TradingEngineAccountSymbol]
    tradingEngineAccountStatistic(accountUuid: String!): TradingEngineAccountStatistic

    # TradingActivity API
    tradingActivity(
      agentIds: [String]
      closeTimeEnd: String
      closeTimeStart: String
      limit: Int
      loginIds: [Int]
      openTimeEnd: String
      openTimeStart: String
      operationType: TradingActivity__OperationTypes__Enum
      page: Int
      profileUUID: String
      sortDirection: String
      sortColumn: String
      status: TradingActivity__Statuses__Enum
      symbol: String
      tradeId: Int
      tradeType: String
      platformType: String
      volumeFrom: Float
      volumeTo: Float
    ): TradingActivity @pageable

    # Referral API
    referrerStatistics(uuid: String!): ReferrerStatistics
    referrals(uuid: String!): [Referral]
    config(brandId: String!): BrandConfigProvider
    
    # SMS Api
    sms: SmsQuery @nested
  }
`;
