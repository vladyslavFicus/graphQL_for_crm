const { gql } = require('apollo-server-express');

module.exports = gql`
  input NotificationCenterDateRange {
    from: String
    to: String
  }

  input NotificationCenterInputType {
    creationDateRange: NotificationCenterDateRange
    hierarchical: Boolean
    notificationSubtypes: [String]
    notificationTypes: [String]
    operatorDesks: [String]
    operatorTeams: [String]
    operators: [String]
    page: PageInputType
    priorities: [String]
    searchKeyword: String
  }
`;
