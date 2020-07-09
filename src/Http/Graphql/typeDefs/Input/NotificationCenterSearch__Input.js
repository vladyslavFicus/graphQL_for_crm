const { gql } = require('apollo-server-express');

module.exports = gql`
  input NotificationCenterSearch__DateRange__Input {
    from: String
    to: String
  }

  input NotificationCenterSearch__Input {
    creationDateRange: NotificationCenterSearch__DateRange__Input
    hierarchical: Boolean
    notificationSubtypes: [String]
    notificationTypes: [String]
    operatorDesks: [String]
    operatorTeams: [String]
    operators: [String]
    page: Page__Input
    priorities: [String]
    searchKeyword: String
  }
`;
