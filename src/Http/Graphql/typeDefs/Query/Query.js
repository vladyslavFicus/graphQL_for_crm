const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    # AuditAPI
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

    # Auth2API
    authoritiesOptions: AuthorityOptions @response
    permission: [String] @response
    loginLock(uuid: String!): LoginLock

    # BrandConfigAPI
    brandConfig(brandId: String!): Object @response

    # CallbackAPI
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

    # EmailAPI
    emailTemplate(id: ID!): Email @response
    emailTemplates: [Email] @response

    # FilterSetAPI
    filterSet(uuid: String!): Object @response
    filterSets(type: FilterSet__Types): FilterSet @response

    # LeadAPI
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
    leadProfile(leadId: String!): Lead @response

    # NotesAPI
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

    # NotificationCenterAPI
    notificationCenter(args: NotificationCenterInputType): NotificationCenter @pageable @response
    notificationCenterTypes: [String] @response
    notificationCenterSubtypes: [String] @response
    notificationCenterUnread: Int @response

    # AffiliateAPI
    partner(uuid: String!): Partner @response
    partners(
      page: PageInputType
      searchBy: String
      country: String
      status: String
      registrationDateFrom: String
      registrationDateTo: String
    ): Partner @pageable @response

    # PaymentAPI
    payments(args: PaymentInputType): Payment @pageable @response
    clientPayments(args: PaymentInputType): Payment @pageable @response
    paymentMethods: [String] @response
    manualPaymentMethods: [String] @response
  }
`;
