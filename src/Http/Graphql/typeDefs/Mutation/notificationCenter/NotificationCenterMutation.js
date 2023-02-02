const { gql } = require('apollo-server-express');

module.exports = gql`
  type NotificationCenterMutation {
    update(
      incUuids: [String!]!
      selectAll: Boolean!
      totalElements: Int!
      searchParams: NotificationCenterSearch__Input!
    ): Boolean

    updateConfiguration(
      showNotificationsPopUp: Boolean
    ): Boolean
  }
`;
