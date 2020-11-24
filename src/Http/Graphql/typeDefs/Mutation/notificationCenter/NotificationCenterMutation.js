const { gql } = require('apollo-server-express');

module.exports = gql`
  type NotificationCenterMutation {
    update(
      excUuids: [String]
      incUuids: [String]
      totalElements: Int!
      searchParams: NotificationCenterSearch__Input
    ): Boolean

    updateConfiguration(
      showNotificationsPopUp: Boolean
    ): Boolean
  }
`;
