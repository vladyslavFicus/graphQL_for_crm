const { gql } = require('apollo-server-express');

module.exports = gql`  
  type NotificationCenterConfiguration {
    showNotificationsPopUp: Boolean
  }
`;
