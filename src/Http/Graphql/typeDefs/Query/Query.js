const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    emailTemplate(id: ID!): Email @response
    emailTemplates: [Email] @response

    notificationCenter(args: NotificationCenterInputType): NotificationCenter @pageable @response
    notificationCenterTypes: [String] @response
    notificationCenterSubtypes: [String] @response
    notificationCenterUnread: Int @response

    partner(uuid: String!): Partner @response
    partners(
      page: PageInputType
      searchBy: String
      country: String
      status: String
      registrationDateFrom: String
      registrationDateTo: String
    ): Partner @pageable @response
  }
`;
