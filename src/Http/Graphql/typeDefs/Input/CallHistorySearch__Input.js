const { gql } = require('apollo-server-express');

module.exports = gql`
  input CallHistorySearch__Input {
    operatorUuid: String
    callSystems: [String]
    callDateRange: CallHistory__Call__DateRange__Input
    page: Page__Input
  }

  input CallHistory__Call__DateRange__Input {
    from: String
    to: String
  }
`;
