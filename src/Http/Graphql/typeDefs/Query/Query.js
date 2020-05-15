const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    emailTemplate(id: ID!): Email @response
    emailTemplates: [Email] @response
    notificationCenter(args: NotificationCenterInputType): NotificationCenter @pageable @response
    notificationCenterTypes: [String] @response(type: "NotificationCenterTypes")
    notificationCenterSubtypes: [String] @response(type: "NotificationCenterSubtypes")
    notificationCenterUnread: Int @response(type: "NotificationCenterUnread")
  }
`;
