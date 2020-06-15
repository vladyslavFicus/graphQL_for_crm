const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    # Auth2API
    authoritiesOptions: AuthorityOptions @response
    permission: [String] @response
    loginLock(uuid: String!): LoginLock

    # BrandConfigAPI
    brandConfig(brandId: String!): JSONObject @response

    # EmailAPI
    emailTemplate(id: ID!): Email @response
    emailTemplates: [Email] @response

    # FilterSetAPI
    filterSet(uuid: String!): JSONObject @response
    filterSets(type: FilterSet__Types): FilterSet @response

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
