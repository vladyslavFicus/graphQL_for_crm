const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    # Affiliate API
    partner(uuid: String!): Partner
    partners(
      page: Page__Input
      searchBy: String
      country: String
      status: String
      registrationDateFrom: String
      registrationDateTo: String
    ): Partner @pageable

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
    authoritiesOptions: AuthorityOptions @response
    permission: [String] @response
    loginLock(uuid: String!): LoginLock

    # BrandConfig API
    brandConfig(brandId: String!): BrandConfig

    # Callback API
    callbacks(
      id: String
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
    filterSet(uuid: String!): Object @response
    filterSets(type: FilterSet__Types__Enum): FilterSet @response

    # Hierarchy API
    branch(
      branchType: String!
      keyword: String
      officeUuid: String
      deskUuid: String
      deskType: Desk__Types__Enum
      country: String
    ): [HierarchyBranch]
    branchTree(branchUuid: String!): HierarchyBranchTree
    branchInfo(branchId: String!): HierarchyBranch
    branchChildren(uuid: String!): [HierarchyBranch]
    userBranches(withoutBrandFilter: Boolean): HierarchyUserBranches
    userHierarchy: HierarchyUser
    userHierarchyById(uuid: String!): HierarchyUser
    usersByBranch(uuids: [String]!, onlyActive: Boolean): [HierarchyUser]
    usersByType(userTypes: [String]!, onlyActive: Boolean): HierarchyUserByType

    # Lead API
    lead(uuid: String!): Lead @response
    leads(
      uuids: [String]
      searchKeyword: String
      page: Int
      limit: Int
      countries: [String]
      registrationDateStart: String
      registrationDateEnd: String
      status: String
      salesStatuses: [SalesStatus__Enum]
      salesAgents: [String]
      migrationId: String
      lastNoteDateFrom: String
      lastNoteDateTo: String
    ): Lead @pageable @response

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
    ): Note @pageable @response

    # NotificationCenter API
    notificationCenter(args: NotificationCenterSearch__Input): NotificationCenter @pageable @response
    notificationCenterTypes: [String] @response
    notificationCenterSubtypes: [String] @response
    notificationCenterUnread: Int @response

    # Operator API
    operator(uuid: String!): Operator @response
    operators(
      country: String
      page: Page__Input
      phone: String
      registrationDateFrom: String
      registrationDateTo: String
      searchBy: String
      status: String
    ): Operator @pageable @response

    # Payment API
    payments(args: PaymentSearch__Input): Payment @pageable @response
    clientPayments(args: PaymentSearch__Input): Payment @pageable @response
    paymentMethods: [String] @response
    manualPaymentMethods: [String] @response
    paymentsStatistic(
      dateFrom: String
      dateTo: String
      profileId: String
      detalization: StatisticDetalization__Enum
      paymentStatus: String
      paymentType: String
      additionalStatistics: [PaymentStatisticDateRange__Input]
    ): PaymentStatistic @response

    # Profile API && ProfileView API
    profile(playerUUID: String!): Profile @response
    profiles(args: ClientSearch__Input): ProfileView @pageable @response
    registrationStatistic(
      dateTo: String
      dateFrom: String
      detalization: StatisticDetalization__Enum
      additionalStatistics: [RegistrationStatisticDateRange__Input]
    ): RegistrationStatistic @response

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
    ): [Rule] @response
    rulesRetention(
      uuid: [String]
      createdByOrUuid: String
      country: String
      language: String
      name: String
      parentId: String
    ): [Rule] @response

    # TradingAccount API && AccountView API
    tradingAccounts(
      searchKeyword: String
      accountType: String
      archived: Boolean
      page: Int
      size: Int
    ): TradingAccount @pageable
    clientTradingAccounts(profileUUID: String!, accountType: String): [TradingAccount]

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
      volumeFrom: Float
      volumeTo: Float
    ): TradingActivity @pageable @response
  }
`;
