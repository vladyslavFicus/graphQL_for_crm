const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    notificationCenterUnread: Int @response(type: "NotificationCenterUnread")
  }
`;
