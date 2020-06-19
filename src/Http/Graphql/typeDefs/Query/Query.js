const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    # Affiliate API
    partner(uuid: String!): Partner @response
    partners(
      page: PageInputType
      searchBy: String
      country: String
      status: String
      registrationDateFrom: String
      registrationDateTo: String
    ): Partner @pageable @response

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
    ): Feed @pageable @response
    feedTypes(uuid: String!): Object @response

    # Auth2 API
    authoritiesOptions: AuthorityOptions @response
    permission: [String] @response
    loginLock(uuid: String!): LoginLock

    # BrandConfig API
    brandConfig(brandId: String!): Object @response

    # Callback API
    callbacks(
      id: String
      statuses: [Callback__StatusEnum]
      userId: String
      page: Int
      limit: Int
      callbackTimeFrom: String
      callbackTimeTo: String
    ): Callback @pageable @response
    callback(id: String!): Callback

    # Email API
    emailTemplate(id: ID!): Email @response
    emailTemplates: [Email] @response

    # FilterSet API
    filterSet(uuid: String!): Object @response
    filterSets(type: FilterSet__Types): FilterSet @response

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
      salesStatuses: [SalesStatus__Types]
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
    notificationCenter(args: NotificationCenterInputType): NotificationCenter @pageable @response
    notificationCenterTypes: [String] @response
    notificationCenterSubtypes: [String] @response
    notificationCenterUnread: Int @response

    # Payment API
    payments(args: PaymentInputType): Payment @pageable @response
    clientPayments(args: PaymentInputType): Payment @pageable @response
    paymentMethods: [String] @response
    manualPaymentMethods: [String] @response

    # Operator API
    operator(uuid: String!): Operator @response
    operators(
      country: String
      page: PageInputType
      phone: String
      registrationDateFrom: String
      registrationDateTo: String
      searchBy: String
      status: String
    ): Operator @pageable @response

    # Profile API
    profile(playerUUID: String!): Profile @response
    profiles(args: ClientSearchParams): ProfileView @pageable @response

    # TradingAccount API && AccountView API
    tradingAccounts(
      searchKeyword: String
      accountType: String
      archived: Boolean
      page: Int
      size: Int
    ): TradingAccount @pageable @response
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
      operationType: TradingActivity__OperationTypes
      page: Int
      profileUUID: String
      sortDirection: String
      sortColumn: String
      status: TradingActivity__Statuses
      symbol: String
      tradeId: Int
      tradeType: String
      volumeFrom: Float
      volumeTo: Float
    ): TradingActivity @pageable @response
  }
`;
